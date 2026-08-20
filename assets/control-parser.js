(function () {
  const directionNames = {
    "↑": "up",
    "↗": "up-right",
    "→": "right",
    "↘": "down-right",
    "↓": "down",
    "↙": "down-left",
    "←": "left",
    "↖": "up-left",
    any: "any"
  };
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
  const buttons = new Set([
    "A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Menu", "View",
    "D-Pad", "D-Pad ↑", "D-Pad →", "D-Pad ↓", "D-Pad ←"
  ]);

  function parseDirections(value) {
    return value.trim().split(/\s+/).map((direction) => directionNames[direction]).filter(Boolean);
  }

  function buttonTokens(value, action) {
    return buttons.has(value) ? [{ type: "button", value, action }] : null;
  }

  function signedShortestSweep(from, to) {
    let sweep = ((to - from + 540) % 360) - 180;
    if (sweep === -180) sweep = 180;
    return sweep;
  }

  function mergeAdjacentSweeps(sweeps) {
    return sweeps.reduce((merged, sweep) => {
      const previous = merged.at(-1);
      if (previous !== undefined && Math.sign(previous) === Math.sign(sweep)) {
        merged[merged.length - 1] += sweep;
      } else {
        merged.push(sweep);
      }
      return merged;
    }, []);
  }

  function parseAtom(atom, warnings) {
    let match = atom.match(/^(hold|tap) (.+)$/);
    if (match) {
      const tokens = buttonTokens(match[2], match[1]);
      if (tokens) return tokens;
    }

    match = atom.match(/^(LS|RS)$/);
    if (match) {
      return [{ type: "stick", value: match[1] }];
    }

    match = atom.match(/^text (.+)$/);
    if (match) {
      return [{ type: "text", value: match[1] }];
    }

    match = atom.match(/^(LS|RS) press$/);
    if (match) {
      return [{ type: "stickMotion", stick: match[1], action: "press", directions: [] }];
    }

    match = atom.match(/^(LS|RS) direction$/);
    if (match) {
      return [{
        type: "stickMotion",
        stick: match[1],
        action: "flick",
        directions: ["any"],
        label: "направление"
      }];
    }

    match = atom.match(/^(LS|RS) (flick|hold) (.+)$/);
    if (match) {
      const directions = parseDirections(match[3]);
      if (directions.length) {
        return [{ type: "stickMotion", stick: match[1], action: match[2], directions }];
      }
    }

    match = atom.match(/^(LS|RS) rotate any$/);
    if (match) {
      return [{
        type: "stickMotion",
        stick: match[1],
        action: "circle",
        directions: [],
        startAngle: -90,
        sweepAngle: 360,
        label: "любое направление"
      }];
    }

    match = atom.match(/^(LS|RS) rotate (.+)$/);
    if (match) {
      const directions = parseDirections(match[2]);
      const angles = directions.map((direction) => directionAngles[direction]);
      if (angles.length > 1 && angles.every((angle) => angle !== undefined)) {
        const sweeps = mergeAdjacentSweeps(
          angles.slice(1).map((angle, index) => signedShortestSweep(angles[index], angle))
        );
        const isCircle = sweeps.length === 1 && Math.abs(sweeps[0]) === 360;
        return [{
          type: "stickMotion",
          stick: match[1],
          action: isCircle ? "circle" : sweeps.length === 1 ? "arc" : "compoundArc",
          directions: [],
          startAngle: angles[0],
          ...(sweeps.length === 1 ? { sweepAngle: sweeps[0] } : { sweeps })
        }];
      }
    }

    warnings.push(`Не удалось разобрать действие: ${atom}`);
    return [{ type: "text", value: atom }];
  }

  function parseVariant(value, warnings) {
    const tokens = [];

    value.split(" then ").forEach((phase, phaseIndex) => {
      if (phaseIndex) tokens.push({ type: "then" });
      phase.split(" + ").forEach((atom, atomIndex) => {
        if (atomIndex) tokens.push({ type: "separator", value: "+" });
        tokens.push(...parseAtom(atom.trim(), warnings));
      });
    });

    return tokens;
  }

  function parse(input) {
    const warnings = [];
    const variants = input
      .split(" / ")
      .map((variant) => parseVariant(variant.trim(), warnings));
    return { variants, warnings };
  }

  window.EA_FC_CONTROL_PARSER = { parse };
})();
