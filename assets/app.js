(function () {
  const storageKeys = {
    game: "fc-input-guide:last-game",
    section: "fc-input-guide:last-section",
    category: "fc-input-guide:last-category",
    attackDirection: "fc-input-guide:attack-direction"
  };

  const games = window.EA_FC_GAMES || [];
  const controlParser = window.EA_FC_CONTROL_PARSER;
  const parsedInputs = new Map();
  const svgNamespace = "http://www.w3.org/2000/svg";
  const directionAngles = {
    up: -90,
    "up-right": -45,
    right: 0,
    "down-right": 45,
    down: 90,
    "down-left": 135,
    left: 180,
    "up-left": 225
  };
  const directionSymbols = {
    up: "↑",
    "up-right": "↗",
    right: "→",
    "down-right": "↘",
    down: "↓",
    "down-left": "↙",
    left: "←",
    "up-left": "↖",
    any: "любое"
  };
  const attackDirections = [
    { id: "up", title: "север" },
    { id: "up-right", title: "северо-восток" },
    { id: "right", title: "восток" },
    { id: "down-right", title: "юго-восток" },
    { id: "down", title: "юг" },
    { id: "down-left", title: "юго-запад" },
    { id: "left", title: "запад" },
    { id: "up-left", title: "северо-запад" }
  ];
  const BASE_ATTACK_DIRECTION = "right";
  const iconPaths = {
    A: "assets/icons/a-filled-green.svg",
    B: "assets/icons/b-filled red.svg",
    X: "assets/icons/x-filled-blue.svg",
    Y: "assets/icons/y-filled-yellow.svg",
    LB: "assets/icons/left-bumper.svg",
    RB: "assets/icons/right-bumper.svg",
    LT: "assets/icons/left-trigger.svg",
    RT: "assets/icons/right-trigger.svg",
    LS: "assets/icons/left-joystick.svg",
    RS: "assets/icons/right-joystick.svg",
    "LS Press": "assets/icons/left-joystick-press.svg",
    "RS Press": "assets/icons/right-joystick-press.svg",
    "D-Pad": "assets/icons/dpad.svg",
    "D-Pad ↑": "assets/icons/dpad-up.svg",
    "D-Pad ↓": "assets/icons/dpad-down.svg",
    "D-Pad ←": "assets/icons/dpad-left.svg",
    "D-Pad →": "assets/icons/dpad-right.svg",
    Menu: "assets/icons/menu.svg",
    View: "assets/icons/view.svg"
  };
  const state = {
    gameId: localStorage.getItem(storageKeys.game) || games[0]?.id,
    sectionId: localStorage.getItem(storageKeys.section) || "",
    categoryId: "",
    query: "",
    attackDirection: localStorage.getItem(storageKeys.attackDirection) || BASE_ATTACK_DIRECTION
  };

  if (!games.some((game) => game.id === state.gameId)) {
    state.gameId = games[0]?.id;
  }

  if (!attackDirections.some((direction) => direction.id === state.attackDirection)) {
    state.attackDirection = BASE_ATTACK_DIRECTION;
  }

  const els = {
    gameSelect: document.querySelector("[data-game-select]"),
    context: document.querySelector("[data-current-context]"),
    quickStart: document.querySelector("[data-quick-start]"),
    cheatsheet: document.querySelector("[data-cheatsheet]"),
    sectionLabel: document.querySelector("[data-section-label]"),
    categoryTitle: document.querySelector("[data-category-title]"),
    categoryTabs: document.querySelector("[data-category-tabs]"),
    cards: document.querySelector("[data-cards]"),
    empty: document.querySelector("[data-empty-state]"),
    search: document.querySelector("[data-search]"),
    attackDirection: document.querySelector("[data-attack-direction]")
  };

  function currentGame() {
    return games.find((game) => game.id === state.gameId) || games[0];
  }

  function currentSection() {
    const game = currentGame();
    return game?.sections[state.sectionId];
  }

  function categoriesForSection(section) {
    if (!section || state.sectionId !== "skills") return section?.categories || [];

    const effectiveItems = section.categories.flatMap((category) => category.items
      .filter((item) => item.effective)
      .map((item) => ({ ...item, skillRating: category.defaultSkillRating })));

    return [...section.categories, { id: "effective", title: "Эффективные финты", items: effectiveItems }];
  }

  function currentCategory() {
    const section = currentSection();
    const categories = categoriesForSection(section);
    return categories.find((category) => category.id === state.categoryId) || categories[0];
  }

  function saveState() {
    localStorage.setItem(storageKeys.game, state.gameId);
    localStorage.setItem(storageKeys.attackDirection, state.attackDirection);
    if (state.sectionId) {
      localStorage.setItem(storageKeys.section, state.sectionId);
    }
    if (state.categoryId) {
      localStorage.setItem(storageKeys.category, `${state.gameId}:${state.sectionId}:${state.categoryId}`);
    }
  }

  function rotateDirection(direction, rotationSteps) {
    if (direction === "any") return direction;
    const currentIndex = attackDirections.findIndex((item) => item.id === direction);
    if (currentIndex < 0) return direction;
    const normalizedIndex = (currentIndex + rotationSteps) % attackDirections.length;
    return attackDirections[(normalizedIndex + attackDirections.length) % attackDirections.length].id;
  }

  function orientStickMotion(token) {
    if (state.sectionId !== "skills" || state.attackDirection === BASE_ATTACK_DIRECTION) return token;
    if (token.action === "circle") return token;

    const baseIndex = attackDirections.findIndex((direction) => direction.id === BASE_ATTACK_DIRECTION);
    const attackIndex = attackDirections.findIndex((direction) => direction.id === state.attackDirection);
    const rotationSteps = attackIndex - baseIndex;
    const rotationAngle = rotationSteps * 45;
    const oriented = { ...token };

    if (token.directions) {
      oriented.directions = token.directions.map((direction) => rotateDirection(direction, rotationSteps));
    }
    if (token.steps) {
      oriented.steps = token.steps.map((step) => ({
        ...step,
        direction: rotateDirection(step.direction, rotationSteps)
      }));
    }
    if (typeof token.startAngle === "number") {
      oriented.startAngle = token.startAngle + rotationAngle;
    }

    return oriented;
  }

  function restoreCategory() {
    const section = currentSection();
    const saved = localStorage.getItem(storageKeys.category);
    const [, savedSection, savedCategory] = saved?.split(":") || [];
    const shouldRestore = saved?.startsWith(`${state.gameId}:`) && savedSection === state.sectionId;
    state.categoryId = shouldRestore && categoriesForSection(section).some((category) => category.id === savedCategory)
      ? savedCategory
      : section?.categories[0]?.id || "";
  }

  function createToken(token) {
    if (token.type === "then") {
      return el("span", "combo__then", "→");
    }

    if (token.type === "separator") {
      return el("span", "combo__separator", token.value);
    }

    if (token.type === "stickMotion") {
      return createStickMotion(orientStickMotion(token));
    }

    const node = el("span", `combo-token combo-token--${token.type}`);
    node.dataset.iconToken = token.value;

    if (token.type === "button") {
      const action = token.action === "hold" ? "удерживать" : "нажать";
      node.dataset.action = token.action || "tap";
      node.setAttribute("aria-label", `${action} кнопку ${token.value}`);
    }

    if (token.type === "stick") {
      node.setAttribute("aria-label", `Стик ${token.value}`);
    }

    if (iconPaths[token.value]) {
      const icon = document.createElement("img");
      node.classList.add("combo-token--icon");
      icon.className = "combo-token__icon";
      icon.src = iconPaths[token.value];
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      node.append(icon, el("span", "sr-only", token.value));
      return node;
    }

    node.textContent = token.value;
    return node;
  }

  function svgEl(tag, attributes = {}) {
    const node = document.createElementNS(svgNamespace, tag);
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    return node;
  }

  function polarPoint(angle, radius = 27) {
    const radians = angle * Math.PI / 180;
    return {
      x: 36 + radius * Math.cos(radians),
      y: 36 + radius * Math.sin(radians)
    };
  }

  function arcPath(startAngle, sweepAngle) {
    const parts = [];
    const direction = Math.sign(sweepAngle) || 1;
    let remaining = Math.abs(sweepAngle);
    let currentAngle = startAngle;
    const start = polarPoint(currentAngle);
    parts.push(`M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`);

    while (remaining > 0.01) {
      const segment = Math.min(remaining, 179.9);
      currentAngle += direction * segment;
      const end = polarPoint(currentAngle);
      parts.push(`A 27 27 0 0 ${direction > 0 ? 1 : 0} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`);
      remaining -= segment;
    }

    return { path: parts.join(" "), endAngle: currentAngle };
  }

  function appendArrowHead(svg, angle, direction) {
    const point = polarPoint(angle);
    const tangent = angle + (direction > 0 ? 90 : -90);
    svg.append(svgEl("path", {
      class: "stick-motion__arrowhead",
      d: "M 0 0 L -7 -4 L -7 4 Z",
      transform: `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)}) rotate(${tangent})`
    }));
  }

  function appendArc(svg, startAngle, sweepAngle) {
    const arc = arcPath(startAngle, sweepAngle);
    const start = polarPoint(startAngle);
    svg.append(svgEl("circle", {
      class: "stick-motion__start",
      cx: start.x.toFixed(2),
      cy: start.y.toFixed(2),
      r: "2.8"
    }));
    svg.append(svgEl("path", { class: "stick-motion__path", d: arc.path }));
    appendArrowHead(svg, arc.endAngle, Math.sign(sweepAngle) || 1);
    return arc.endAngle;
  }

  function appendRadialArrow(svg, direction, index = 0) {
    if (direction === "any") {
      ["up", "right", "down", "left"].forEach((value, directionIndex) => {
        appendRadialArrow(svg, value, directionIndex);
      });
      return;
    }

    const angle = directionAngles[direction];
    if (angle === undefined) return;
    const start = polarPoint(angle, 20 + Math.min(index, 2));
    const end = polarPoint(angle, 30);
    const tangent = angle;
    svg.append(svgEl("path", {
      class: "stick-motion__path stick-motion__path--radial",
      d: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
    }));
    svg.append(svgEl("circle", {
      class: "stick-motion__start",
      cx: start.x.toFixed(2),
      cy: start.y.toFixed(2),
      r: "2.4"
    }));
    svg.append(svgEl("path", {
      class: "stick-motion__arrowhead",
      d: "M 0 0 L -6 -3.5 L -6 3.5 Z",
      transform: `translate(${end.x.toFixed(2)} ${end.y.toFixed(2)}) rotate(${tangent})`
    }));
  }

  function motionSteps(token, directions = token.directions) {
    if (directions === token.directions && token.steps) return token.steps;
    return (directions || []).map((direction) => ({ action: token.action, direction }));
  }

  function stepsCaption(steps) {
    return steps.map((step) => {
      const prefixes = {
        flick: "щелк. ",
        hold: "держ. "
      };
      const prefix = prefixes[step.action] || "";
      return `${prefix}${directionSymbols[step.direction] || step.direction}`;
    }).join(" · ");
  }

  function motionCaption(token) {
    if (token.label) return token.label;
    if (token.action === "press") return "нажать";
    if (["arc", "circle"].includes(token.action)) {
      const sweep = token.sweepAngle || 360;
      return `${Math.abs(sweep)}° ${sweep > 0 ? "↻" : "↺"}`;
    }
    if (token.action === "compoundArc") {
      return token.sweeps.map((sweep) => sweep > 0 ? "↻" : "↺").join(" · ");
    }

    return stepsCaption(motionSteps(token));
  }

  function motionAriaLabel(token) {
    const stick = token.stick === "LS" ? "левый стик" : "правый стик";
    const captions = {
      press: "нажать",
      hold: "удерживать",
      flick: "отклонить",
      arc: "повернуть по дуге",
      circle: "сделать полный оборот",
      sequence: "выполнить последовательность",
      compoundArc: "выполнить составное движение"
    };
    return `${captions[token.action] || "двигать"} ${stick}: ${motionCaption(token)}`;
  }

  function createSingleStickMotion(token, hiddenFromAccessibility = false) {
    const node = el("span", "stick-motion");
    const visual = el("span", "stick-motion__visual");
    const icon = document.createElement("img");
    const svg = svgEl("svg", { viewBox: "0 0 72 72", "aria-hidden": "true" });

    if (hiddenFromAccessibility) {
      node.setAttribute("aria-hidden", "true");
    } else {
      node.setAttribute("role", "img");
      node.setAttribute("aria-label", motionAriaLabel(token));
    }
    icon.className = "stick-motion__stick";
    icon.src = iconPaths[token.action === "press" ? `${token.stick} Press` : token.stick];
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");

    if (token.action === "arc" || token.action === "circle") {
      appendArc(svg, token.startAngle ?? -90, token.sweepAngle || 360);
    } else if (token.action === "compoundArc") {
      let startAngle = token.startAngle ?? 90;
      token.sweeps.forEach((sweep) => {
        startAngle = appendArc(svg, startAngle, sweep);
      });
    } else if (token.action !== "press") {
      const steps = motionSteps(token);
      steps.forEach((step, index) => appendRadialArrow(svg, step.direction, index));
    }

    visual.append(icon, svg);
    node.append(visual, el("span", "stick-motion__caption", motionCaption(token)));
    return node;
  }

  function createMotionSequence(token, steps, hiddenFromAccessibility = false) {
    const sequence = el("span", "stick-sequence");

    if (hiddenFromAccessibility) {
      sequence.setAttribute("aria-hidden", "true");
    } else {
      sequence.setAttribute("role", "img");
      sequence.setAttribute("aria-label", motionAriaLabel(token));
    }

    steps.forEach((step, index) => {
      if (index) sequence.append(el("span", "combo__then", "→"));
      sequence.append(createSingleStickMotion({
        type: "stickMotion",
        stick: token.stick,
        action: step.action,
        directions: [step.direction]
      }, true));
    });

    return sequence;
  }

  function createStickMotion(token) {
    const steps = motionSteps(token);
    const isSequence = token.action === "sequence" || steps.length > 1;
    if (isSequence) {
      return createMotionSequence(token, steps);
    }

    return createSingleStickMotion(token);
  }

  function createCombo(tokens) {
    const combo = el("div", "combo");
    tokens.forEach((token) => combo.append(createToken(token)));
    return combo;
  }

  function parsedInput(input) {
    if (!parsedInputs.has(input)) {
      const result = controlParser.parse(input);
      result.warnings.forEach((warning) => console.warn(`[control-parser] ${warning}`, input));
      parsedInputs.set(input, result);
    }
    return parsedInputs.get(input);
  }

  function createComboVariants(input) {
    const variants = parsedInput(input).variants;
    if (variants.length === 1) return createCombo(variants[0]);

    const alternatives = el("div", "combo-variants");
    const viewport = el("div", "combo-variants__viewport");
    const pagination = el("div", "combo-variants__pagination");
    const descriptions = input.split(" / ");
    const slides = [];
    const dots = [];

    alternatives.setAttribute("role", "group");
    alternatives.setAttribute("aria-roledescription", "переключатель вариантов");

    variants.forEach((tokens, index) => {
      const slide = el("div", "combo-variants__slide");
      const dot = el("button", "combo-variants__dot");
      const variantNumber = index + 1;

      slide.append(createCombo(tokens));
      dot.type = "button";
      dot.title = `Вариант ${variantNumber}: ${descriptions[index]}`;
      dot.setAttribute("aria-label", `Показать вариант ${variantNumber} из ${variants.length}`);
      dot.addEventListener("click", () => selectVariant(index));
      viewport.append(slide);
      pagination.append(dot);
      slides.push(slide);
      dots.push(dot);
    });

    function selectVariant(activeIndex) {
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", String(isActive));
      });
      alternatives.setAttribute("aria-label", `Вариант ${activeIndex + 1} из ${variants.length}`);
    }

    alternatives.append(viewport, pagination);
    selectVariant(0);
    return alternatives;
  }

  function createCard(item, category) {
    const card = el("article", "move-card");
    const title = el("h3", "move-card__title", item.title);
    const meta = el("div", "move-card__meta");

    if (item.effective) {
      const marker = el("span", "effective-marker", "♥");
      marker.setAttribute("aria-label", "Эффективный финт");
      marker.title = "Эффективный финт";
      card.append(marker);
    }

    const skillRating = item.changeStarRatingTo || item.skillRating || category.defaultSkillRating;
    if (skillRating) {
      meta.append(el("span", "rating", "★".repeat(skillRating)));
    }

    card.append(title, item.input ? createComboVariants(item.input) : createCombo(item.combo || []));

    if (item.note) {
      card.append(el("p", "move-card__note", item.note));
    }

    if (meta.childElementCount) {
      card.append(meta);
    }

    return card;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderGameOptions() {
    els.gameSelect.replaceChildren();
    games.forEach((game) => {
      const option = document.createElement("option");
      option.value = game.id;
      option.textContent = game.title;
      option.selected = game.id === state.gameId;
      els.gameSelect.append(option);
    });
  }

  function renderSectionTabs() {
    document.querySelectorAll("[data-section]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.section === state.sectionId);
    });
  }

  function renderAttackDirection() {
    const isVisible = state.sectionId === "skills";
    els.attackDirection.hidden = !isVisible;
    if (!isVisible) return;

    els.attackDirection.querySelectorAll("[data-attack-heading]").forEach((button) => {
      const isActive = button.dataset.attackHeading === state.attackDirection;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderCategoryTabs() {
    const section = currentSection();
    const hasQuery = Boolean(state.query.trim());
    els.categoryTabs.replaceChildren();

    categoriesForSection(section).forEach((category) => {
      const button = el("button", "category-chip", category.title);
      button.type = "button";
      button.dataset.category = category.id;
      button.classList.toggle("is-active", !hasQuery && category.id === state.categoryId);
      els.categoryTabs.append(button);
    });
  }

  function renderCards() {
    const section = currentSection();
    const category = currentCategory();
    const query = state.query.trim().toLowerCase();
    const sourceCategories = query ? categoriesForSection(section) : category ? [category] : [];
    const items = sourceCategories.flatMap((sourceCategory) => sourceCategory.items
      .filter((item) => !query || [item.title, item.input, item.note]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query))
      .map((item) => ({ item, category: sourceCategory })));

    els.cards.replaceChildren();
    items.forEach(({ item, category: sourceCategory }) => {
      els.cards.append(createCard(item, sourceCategory));
    });
    els.empty.hidden = items.length > 0;
  }

  function render() {
    const game = currentGame();
    const section = currentSection();
    const category = currentCategory();

    renderGameOptions();
    renderSectionTabs();
    renderAttackDirection();

    els.context.textContent = state.sectionId
      ? `${game.title} · ${section.title} · ${category?.title || ""}`
      : game.title;

    els.quickStart.hidden = Boolean(state.sectionId);
    els.cheatsheet.hidden = !state.sectionId;

    if (!state.sectionId) return;

    els.sectionLabel.textContent = `${game.title} · ${section.title}`;
    els.categoryTitle.textContent = category?.title || "";
    els.search.value = state.query;

    renderCategoryTabs();
    renderCards();
  }

  function chooseSection(sectionId) {
    state.sectionId = sectionId;
    state.query = "";
    restoreCategory();
    saveState();
    render();
  }

  document.addEventListener("click", (event) => {
    const sectionButton = event.target.closest("[data-section]");
    if (sectionButton) {
      chooseSection(sectionButton.dataset.section);
      return;
    }

    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.categoryId = categoryButton.dataset.category;
      saveState();
      render();
      return;
    }

    const directionButton = event.target.closest("[data-attack-heading]");
    if (directionButton) {
      state.attackDirection = directionButton.dataset.attackHeading;
      saveState();
      renderAttackDirection();
      renderCards();
      return;
    }

    if (event.target.closest("[data-action='home']")) {
      state.sectionId = "";
      saveState();
      render();
    }
  });

  els.gameSelect.addEventListener("change", (event) => {
    state.gameId = event.target.value;
    if (state.sectionId && !currentSection()) {
      state.sectionId = "";
    }
    if (state.sectionId) {
      restoreCategory();
    }
    saveState();
    render();
  });

  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCategoryTabs();
    renderCards();
  });

  if (state.sectionId && currentSection()) {
    restoreCategory();
  } else {
    state.sectionId = "";
  }

  render();
})();
