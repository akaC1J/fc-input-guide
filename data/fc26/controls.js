(function () {
  const move = (title, input, note) => ({ title, input, ...(note ? { note } : {}) });

  const categories = [
    {
      id: "movement", title: "Перемещение",
      items: [
        move("Перемещение", "LS"),
        move("Рывок", "tap RT + text направление", "Зажать."),
        move("Укрывание / Активная оборона", "tap LT + text направление", "Зажать."),
        move("Первое касание / Проброс на ход", "tap RT + RS direction + 2x ", "Зажать."),
        move("Управляемое первое касание / Касание с усилением", "tap RB + RS"),
        move("Остановка и разворот к воротам", "LS + text без направления + tap LB"),
        move("Дриблинг в сторону", "tap LB + LS"),
        move("Управляемый рывок", "tap RB"),
        move("Остановка мяча", "LS + text без направления + tap RT"),
        move("Толчок (мяч в воздухе)", "tap LT"),
        move("Особые приемы", "RS")
      ]
    },
    {
      id: "attack-basic", title: "Атака: основы",
      items: [
        move("Пас низом / Удар головой", "tap A"),
        move("Пас верхом / Навес / Удар головой", "tap X"),
        move("Пас вразрез", "tap Y"),
        move("Удар / Удар с лета / Удар головой", "tap B"),
        move("Мощный удар низом", "tap B + tap B", "после получения усиления."),
        move("«Парашют»", "tap LB + tap B"),
        move("Прицельный удар", "tap RB + tap B"),
        move("Мощный прицельный удар низом", "tap RB + tap B + tap B", "после получения усиления."),
        move("Пушечный удар", "tap LB + tap RB + tap B"),
        move("Мощный пушечный удар низом", "tap LB + tap RB + tap B + tap B", "после получения усиления."),
        move("Ложный удар", "tap B then tap A + text направление"),
        move("Ложный пас", "tap X then tap A + text направление"),
        move("Удар после ложного удара", "tap X + tap A then LS + text без направления / tap B + tap A then LS + text без направления"),
        move("Мощный пас вразрез", "tap LB + tap RB + tap Y"),
        move("Отмотать назад (Только быстрый матч)", "tap LT + tap RT + tap Menu")
      ]
    },
    {
      id: "attack-advanced", title: "Атака: дополнительно",
      items: [
        move("Укрывание мяча", "tap LT", "Зажать."),
        move("Мощный пас низом", "tap RB + tap A"),
        move("Пас низом с подбросом", "tap A + tap A"),
        move("Пас вразрез с подбросом", "tap Y + tap Y"),
        move("Пас верхом вразрез", "tap LB + tap Y"),
        move("Мощный пас верхом / Мощный навес", "tap LB + tap RB + tap X"),
        move("Высокий пас верхом", "tap LB + tap X"),
        move("Прострел низом", "tap X + tap X"),
        move("Мощный пас низом", "tap LB + tap RB + tap X + tap X"),
        move("Забегание игрока", "tap LB"),
        move("Запросить поддержку", "tap RB"),
        move("Поддержка двумя партнерами", "tap RB + tap RB"),
        move("Пропустить пас", "LS + text без направления + tap RB", "Зажать."),
        move("Изящный пас / Подкрутка", "tap LT + tap A"),
        move("Изящный удар / Удар шведой", "tap LT + tap B"),
        move("Изящный пас верхом / Навес", "tap LT + tap X"),
        move("Изящный пас вразрез / Подкрутка", "tap LT + tap Y"),
        move("Пропустить мяч", "tap RB + LS", "от мяча. Зажать. От мяча."),
        move("Подброс мяча", "RS + text направление", "зажать. Зажать."),
        move("Скрытое первое касание", "tap LB + tap RB + LS", "к мячу. Зажать. К мячу."),
        move("Пас и рывок", "tap LB + tap A"),
        move("Пас и бег", "tap A + RS + text направление / tap Y + RS + text направление / tap X + RS + text направление", "зажать. Зажать."),
        move("Направленные забегания", "tap LB + RS / tap RB + RS", "сдвинуть."),
        move("Фиксированное управление игроком", "LS + RS"),
        move("Переключение (фиксированное управление игроком), ...", "RS", "сдвинуть."),
        move("Жесткая суперотмена", "tap LB + tap RB + tap LT + tap RT"),
        move("Отменить преимущество при нарушении", "tap LT + tap RT"),
        move("Укрывание — подойти / Оттолкнуть", "tap LT"),
        move("Филигранная передача", "tap RB + tap Y"),
        move("Филигранная передача низом с подкруткой", "tap LT + tap RB + tap Y"),
        move("Филигранная передача верхом", "tap RB + tap X")
      ]
    },
    {
      id: "defense", title: "Защита",
      items: [
        move("Смена игрока", "tap LB"),
        move("Смена игрока (вручную)", "RS + text направление"),
        move("Значки переключения на игроков", "RS", "Судя по всему инди-студия забыла удалить из настроек"),
        move("Отбор мяча/ Толкнуть, потянуть (догоняя)", "tap B"),
        move("Жесткий отбор", "tap RB + tap B"),
        move("Фол последней надежды", "tap RB + tap A"),
        move("Подкат", "tap X"),
        move("Жесткий подкат", "tap RB + tap X"),
        move("Вынос мяча", "tap B"),
        move("Техничный вынос", "tap RB + tap B"),
        move("Плечо в плечо / Блокирование игрока", "tap B"),
        move("Удерживание (только техничная и стандартная защита)", "tap A", "Зажать."),
        move("Оттеснить корпусом (только продвинутая защита)", "tap A", "Зажать."),
        move("Сдерживание партнером", "tap RB", "Зажать."),
        move("Частичный командный прессинг", "tap RB + tap RB", "Зажать."),
        move("Активная оборона в рывке", "tap LT + tap RT", "Зажать."),
        move("Быстро встать (после подката)", "tap X"),
        move("Начать борьбу с игроком, укрывающим мяч", "tap LT + LS", "К игроку, укрывающему мяч."),
        move("Выход вратаря", "tap Y", "Зажать."),
        move("Выход вратаря для сдерживания", "tap Y + tap Y", "Зажать."),
        move("Выход вратаря к центру", "tap Y + tap Y"),
        move("Отмена выхода вратаря в центр", "tap Y")
      ]
    },
    {
      id: "tactics", title: "Тактика",
      items: [
        move("Быстрые тактики", "tap D-Pad ↑"),
        move("Искусственный офсайд", "tap D-Pad ↑ then tap D-Pad ↑"),
        move("Командный прессинг", "tap D-Pad ↑ then tap D-Pad ←"),
        move("Дополнительный форвард", "tap D-Pad ↑ then tap D-Pad →"),
        move("В штрафную", "tap D-Pad ↑ then tap D-Pad ↓"),
        move("Тактический акцент", "tap D-Pad →"),
        move("По умолчанию", "tap D-Pad → then tap D-Pad ↑"),
        move("Защита", "tap D-Pad → then tap D-Pad ←"),
        move("Атака", "tap D-Pad → then tap D-Pad →"),
        move("Мои тактики", "tap D-Pad ←"),
        move("Своя тактика 1", "tap D-Pad ← then tap D-Pad ↑"),
        move("Своя тактика 2", "tap D-Pad ← then tap D-Pad ←"),
        move("Своя тактика 3", "tap D-Pad ← then tap D-Pad →"),
        move("Своя тактика 4", "tap D-Pad ← then tap D-Pad ↓"),
        move("Тактические советы", "tap D-Pad ↓"),
        move("Тактический совет 1", "tap D-Pad ↓ then tap D-Pad ↑"),
        move("Тактический совет 2", "tap D-Pad ↓ then tap D-Pad ←"),
        move("Советы по тактике / акценту", "tap D-Pad ↓ then tap D-Pad →"),
        move("Замена", "tap D-Pad ↓ then tap D-Pad ↓")
      ]
    },
    {
      id: "goalkeeper", title: "Вратарь",
      items: [
        move("Удар с полулета", "tap B / tap X"),
        move("Вбрасывание / Пас", "tap A"),
        move("Бросить мяч", "tap Y"),
        move("Поднять мяч", "tap RB"),
        move("Мощное вбрасывание", "tap RB + tap A"),
        move("Мощный ввод мяча", "tap RB + tap X"),
        move("Перемещение вратаря", "RS press + RS", "Удерживать."),
        move("ВРТ закрывает дальнюю штангу", "RS press", "Удерживать."),
        move("Переключить камеру (вратарь)", "tap View")
      ]
    },
    {
      id: "free-kicks", title: "Стандартные положения: штрафные",
      items: [
        move("Наведение", "LS"),
        move("Перекрестье", "RS"),
        move("Пас", "tap A"),
        move("Пас верхом / Навес", "tap X"),
        move("Прыжок стенки", "tap Y"),
        move("Выбежать из стенки", "tap A"),
        move("Двигать стенку", "tap LT / tap RT"),
        move("Выбор исп. ударов", "tap RT"),
        move("Добавить исполнителя", "tap RB / tap LT"),
        move("Перемещение вратаря", "tap X / tap B")
      ]
    },
    {
      id: "free-kicks-advanced", title: "Штрафные — дополнительно",
      items: [
        move("Подозвать 2-го игрока", "tap LT"),
        move("Удар 2-м игроком", "tap LT + tap B"),
        move("Пас под удар 2-го игрока", "tap LT + tap A"),
        move("Пас верхом 2-м игроком", "tap LT + tap X"),
        move("2-й игрок пробегает мимо", "tap LT + tap B then tap A"),
        move("Подозвать 3-го игрока", "tap RB"),
        move("Удар 3-м игроком", "tap RB + tap B"),
        move("3-й игрок пробегает мимо", "tap RB + tap B then tap A"),
        move("Смена исполнителя стандартов в кооп.", "LS + RS")
      ]
    },
    {
      id: "corners-throw-ins", title: "Угловые и вбрасывания",
      items: [
        move("Угловые (Навес верхом)", "tap X"),
        move("Угловые (Пас)", "tap A"),
        move("Наведение на цель", "LS"),
        move("Перекрестье", "RS"),
        move("Отобразить тактику на угловых", "tap D-Pad ↑"),
        move("Рывок к дальней штанге", "tap D-Pad ↑ then tap D-Pad ↑"),
        move("Рывок к границе штрафной", "tap D-Pad ↑ then tap D-Pad ←"),
        move("Закрыть вратаря", "tap D-Pad ↑ then tap D-Pad →"),
        move("Рывок к ближней штанге", "tap D-Pad ↑ then tap D-Pad ↓"),
        move("Двигаться по линии (вбрасывание)", "LS"),
        move("Короткое вбрасывание", "tap A"),
        move("Короткое вбрасывание (вручную)", "tap Y"),
        move("Дальнее вбрасывание", "tap X / tap A", "Зажать."),
        move("Ложный вброс мяча", "tap X + tap A / tap A + tap X")
      ]
    },
    {
      id: "penalties", title: "Пенальти",
      items: [
        move("Удар", "tap B"),
        move("Прицельный удар", "tap RB + tap B"),
        move("«Парашют»", "tap LB + tap B"),
        move("Выбор исполнителя ударов", "tap RT"),
        move("Перемещение вратаря по линии ворот", "LS + text направление"),
        move("Нырок вратаря", "RS + text направление"),
        move("Жесты вратаря", "tap A / tap B / tap X / tap Y")
      ]
    },
    {
      id: "pro-player-off-ball-attack", title: "Профи: игрок (атака без мяча)",
      items: [
        move("Запрос паса", "tap A"),
        move("Запросить или предложить пас вразрез", "tap Y"),
        move("Предложить удар", "tap B"),
        move("Запрос мощного паса низом", "tap RB + tap A"),
        move("Запрос ювелирного паса вразрез", "tap RB + tap Y"),
        move("Запрос паса верхом вразрез", "tap LB + tap Y"),
        move("Запрос дальнего паса верхом вразрез", "tap LB + tap RB + tap Y"),
        move("Запрос навеса", "tap X"),
        move("Запрос прострела низом", "tap RB + tap X"),
        move("Запрос высокого навеса", "tap LB + tap X")
      ]
    },
    {
      id: "pro-goalkeeper-off-ball-attack", title: "Профи: вратарь (атака без мяча)",
      items: [
        move("Запросить или предложить передачу", "tap A"),
        move("Предложить пас вразрез", "tap Y"),
        move("Предложить сделать навес", "tap X"),
        move("Предложить удар", "tap B"),
        move("Управление в поле", "tap LB + tap D-Pad"),
        move("Автопозиц.", "tap LB", "Зажать."),
        move("Выбор игрока", "RS")
      ]
    },
    {
      id: "pro-goalkeeper-own-box-defense", title: "Профи: вратарь (защита своей штрафной)",
      items: [
        move("Нырок", "RS + text направление", "удерживать. Удерживать."),
        move("Автопозиц.", "tap LB", "Зажать."),
        move("Удерживание вторым защитником", "tap RB", "Зажать."),
        move("Выбор игрока", "RS"),
        move("Активная оборона", "tap LT", "Зажать."),
        move("Выход из ворот", "tap Y", "Зажать."),
        move("Рывок", "tap RT", "Зажать."),
        move("Вынос кулаком / Сейв на реакции", "tap B", "нажать."),
        move("Схватить мяч", "tap X", "нажать."),
        move("Нырок на реакции по запросу", "tap RB + RS + text направление", "удерживать. Зажать. Удерживать."),
        move("Сдвиг камеры", "tap LB + LS", "Зажать.")
      ]
    }
  ];

  window.EA_FC_SECTIONS = window.EA_FC_SECTIONS || {};
  window.EA_FC_SECTIONS.fc26 = window.EA_FC_SECTIONS.fc26 || {};
  window.EA_FC_SECTIONS.fc26.controls = { title: "Основы управления", categories };
})();
