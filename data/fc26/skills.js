(function () {
  const move = (title, input, note) => ({ title, input, ...(note ? { note } : {}) });

  const categories = [
    {
      id: "1-star", title: "1 звезда", minSkillRating: 1,
      items: [
        move("Направленный проброс мяча", "hold LB + hold RB + RS direction"),
        move("Жонглирование мячом на месте", "hold LT + tap RB"),
        move("Ложный удар с уходом влево", "hold LB + tap X then tap Y + LS hold ↖ / hold LB + tap B then tap Y + LS hold ↖"),
        move("Ложный удар с уходом вправо", "hold LB + tap X then tap Y + LS hold ↗ / hold LB + tap B then tap Y + LS hold ↗"),
        move("Подброс мяча", "RS press"),
        move("Финт с разворотом в касание", "hold LB + hold RB + LS flick ↓"),
        move("Радуга Trickster", "RS flick ↓ ↑", "New Trickster Rainbow. Выполняется из положения стоя или во время лёгкого бега.")
      ]
    },
    {
      id: "2-star", title: "2 звезды", minSkillRating: 2,
      items: [
        move("Финт вперёд и поворот", "RS flick ↓ ↓"),
        move("Финт корпусом вправо", "RS flick →"),
        move("Финт корпусом влево", "RS flick ←"),
        move("Переступание вправо", "RS rotate ↑ →"),
        move("Переступание влево", "RS rotate ↑ ←"),
        move("Обратное переступание вправо", "RS rotate → ↑"),
        move("Обратное переступание влево", "RS rotate ← ↑"),
        move("Прокатывание мяча влево", "RS hold ←"),
        move("Прокатывание мяча вправо", "RS hold →"),
        move("Откат мяча", "hold LT + hold RT + LS flick ↓")
      ]
    },
    {
      id: "3-star", title: "3 звезды", minSkillRating: 3,
      items: [
        move("Проброс мяча пяткой", "RS flick ↑ ↓"),
        move("Разворот на 360 градусов вправо", "RS rotate ↓ ← ↑ →"),
        move("Разворот на 360 градусов влево", "RS rotate ↓ → ↑ ←"),
        move("Финт влево и уход вправо", "RS rotate ← ↓ →"),
        move("Финт вправо и уход влево", "RS rotate → ↓ ←"),
        move("Проброс пяткой влево во время бега", "hold LT + tap X then tap Y + LS hold ← / hold LT + tap B then tap Y + LS hold ←"),
        move("Проброс пяткой вправо во время бега", "hold LT + tap X then tap Y + LS hold → / hold LT + tap B then tap Y + LS hold →"),
        move("Финт влево и выход вправо", "RS rotate ← ↓ →"),
        move("Финт вправо и выход влево", "RS rotate → ↓ ←"),
        move("Финт с заминкой", "hold LT + tap X then RS flick ← → / hold LT + tap B then RS flick ← → / hold LT + tap X then RS flick → ← / hold LT + tap B then RS flick → ←"),
        move("Взрывное переступание", "hold LB + RS rotate ↑ ← + LS direction / hold LB + RS rotate ↑ → + LS direction", "Explosive Stepover. Выполняется из положения стоя или во время лёгкого бега; LS задаёт направление выхода.")
      ]
    },
    {
      id: "4-star", title: "4 звезды", minSkillRating: 4,
      items: [
        move("Подбрасывание мяча на месте", "hold LB + RS press"),
        move("Прокатывание мяча с откатом", "hold LB + RS flick ↑ ← / hold LB + RS flick ↑ →"),
        move("Откат мяча с поворотом", "hold LT + RS hold ↓"),
        move("С пятки на пятку", "RS flick ↑ ↓"),
        move("Простая радуга", "RS flick ↓ ↑"),
        move("Вращение влево", "hold RT + hold RB + RS rotate ↓ → ↑ ←"),
        move("Вращение вправо", "hold RT + hold RB + RS rotate ↓ ← ↑ →"),
        move("Поворот влево во время бега", "RS flick ↑ ←"),
        move("Поворот вправо во время бега", "RS flick ↑ →"),
        move("Прокатывание с прерыванием вправо", "RS hold ← + LS hold →"),
        move("Прокатывание с прерыванием влево", "RS hold → + LS hold ←"),
        move("Ложный пас на месте", "hold RT + tap X then tap Y / hold RT + tap B then tap Y"),
        move("Ложный пас с выходом влево", "hold RT + tap X then tap Y + LS hold ↖ / hold RT + tap B then tap Y + LS hold ↖"),
        move("Ложный пас с выходом вправо", "hold RT + tap X then tap Y + LS hold ↗ / hold RT + tap B then tap Y + LS hold ↗"),
        move("Быстрое прокатывание мяча", "RS hold ↓"),
        move("Уход влево", "hold LB + RS hold ←"),
        move("Уход вправо", "hold LB + RS hold →"),
        move("Поворот на 360 градусов в три касания влево", "hold LT + RS flick ↓ ←"),
        move("Поворот на 360 градусов в три касания вправо", "hold LT + RS flick ↓ →"),
        move("Откат мяча с разворотом влево", "RS flick ↓ ←"),
        move("Откат мяча с разворотом вправо", "RS flick ↓ →"),
        move("Игра пяткой", "hold LB + RS flick ↓ ← / hold LB + RS flick ↓ →"),
        move("Пяткой к прокатыванию мяча", "hold LB + RS flick ↑ ↓"),
        move("Прокатывание мяча с прерыванием", "hold LB + RS flick ↓ ↓"),
        move("Улучшенный проброс пяткой", "RS flick ↑ ↓ + LS hold ↖ / RS flick ↑ ↓ + LS hold ↗ / RS flick ↑ ↓ + LS hold ↑", "Advanced Heel Flick. Выполняется во время лёгкого бега."),
        move("Откат с резким уходом", "hold LT + RS rotate ← ↓ → / hold LT + RS rotate → ↓ ←", "Drag To Chop. Выполняется из положения стоя.")
      ]
    },
    {
      id: "5-star", title: "5 звезд", minSkillRating: 5,
      items: [
        move("Эластико", "RS rotate → ↓ ←"),
        move("Обратное эластико", "RS rotate ← ↓ →"),
        move("Улучшенная радуга", "RS flick ↓ then RS hold ↑ then RS flick ↑"),
        move("Фокус-покус", "RS rotate ↓ ← then RS rotate ← ↓ →"),
        move("Тройное эластико", "RS rotate ↓ → then RS rotate → ↓ ←"),
        move("Прокатывание и проброс влево", "RS hold → then RS flick ↑"),
        move("Прокатывание и проброс вправо", "RS hold ← then RS flick ↑"),
        move("Проброс мяча пяткой с поворотом", "hold RB + RS flick ↑ ↓"),
        move("Удар через себя на месте", "RS flick ↑ ↑ ↓"),
        move("Поворот с разворотом влево", "RS flick ↑ ←"),
        move("Поворот с разворотом вправо", "RS flick ↑ →"),
        move("Ложный уход влево", "RS hold ← then RS flick ←"),
        move("Ложный уход вправо", "RS hold → then RS flick →"),
        move("Прокатывание мяча с ложным поворотом", "hold LT + RS flick ↑ ← / hold LT + RS flick ↑ →"),
        move("Рабона", "hold LT + tap X then tap A + LS hold ↓ / hold LT + tap B then tap A + LS hold ↓"),
        move("Эластико с уходом влево", "RS flick ↓ ←"),
        move("Эластико с уходом вправо", "RS flick ↓ →"),
        move("Проброс с разворотом влево", "hold RB + RS flick ↑ ←"),
        move("Проброс с разворотом вправо", "hold RB + RS flick ↑ →"),
        move("Переброс", "RS hold ↑"),
        move("Разворот Торнадо", "hold LB + RS flick ↑ ← / hold LB + RS flick ↑ →"),
        move("Ложная игра пяткой", "hold LT + RS flick ← → / hold LT + RS flick → ←"),
        move("Зрелищная радуга", "hold LT + RS flick ↑ ↓"),
        move("Вариация эластико", "hold LT + RS rotate → ↓ ← / hold LT + RS rotate ← ↓ →", "Elastico Variation. Выполняется во время лёгкого бега.")
      ]
    },
    {
      id: "juggling", title: "Жонглирование", minSkillRating: 5,
      items: [
        move("Удар через себя назад", "hold LT + hold RB + LS hold ↓"),
        move("Удар через себя влево", "hold LT + hold RB + LS hold ←"),
        move("Удар через себя вправо", "hold LT + hold RB + LS hold →"),
        move("Вокруг света", "hold LT + RS rotate any"),
        move("Воздушное эластико", "hold LT + RS flick → ←"),
        move("Обратное воздушное эластико", "hold LT + RS flick ← →"),
        move("Проброс под удар с лёта", "LS hold ↑"),
        move("Подброс грудью", "hold LT + LS press then LS press"),
        move("Тройной «Вокруг света»", "hold LT + RS rotate ↑ → ↓ ← ↑ then RS flick ↑")
      ]
    }
  ];

  window.EA_FC_SECTIONS = window.EA_FC_SECTIONS || {};
  window.EA_FC_SECTIONS.fc26 = window.EA_FC_SECTIONS.fc26 || {};
  window.EA_FC_SECTIONS.fc26.skills = { title: "Финты", categories };
})();
