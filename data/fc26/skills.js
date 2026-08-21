(function () {
  const move = (title, input, note = "", effective = false, changeSkillRatingTo = 0) => ({
    title,
    input,
    ...(note ? { note } : {}),
    ...(effective ? { effective: true } : {}),
    ...(changeSkillRatingTo ? { changeStarRatingTo: changeSkillRatingTo } : {})
  });
  //   ↑ → ↓ ← ↑ → ↓ ↑ ← ↓ → ↑
  const categories = [
    {
      id: "1-star", title: "1 звезда", defaultSkillRating: 1,
      items: [
        move("Ball Juggling", "hold LT + tap RB", "standing"),
        move("Body Feint", "RS flick ↓ / RS flick ↑"),
        move("Ball Roll", "RS hold ↓ / RS hold ↑"),
        move("Fake Shot", "tap B then tap A + LS direction / Fake Shot + LS direction"),
        move("Scoop Flick", "RS press"),
        move("Directional Nutmeg", "hold LB + hold RB + RS direction"),
      ]
    },
    {
      id: "2-star", title: "2 звезды", defaultSkillRating: 2,
      items: [
        move("Step Over", "RS rotate → ↑ / RS rotate → ↓", ),
        move("Reverse Step Over", "RS rotate ↑ →  / RS rotate ↓ → "),
        move("Big Feint", "hold LT + RS flick ↓ / hold LT + RS flick ↑", "control exit direction with LS"),
        move("Body Feint Exit", "RS flick ↓ then LS direction / RS flick ↑ then LS direction"),
        move("Scissors Feint", "RS rotate → ↑ then LS direction / RS rotate → ↓ then LS direction"),
        move("Step Over Feint", "RS rotate ↑ → then LS direction / RS rotate ↓ → then LS direction"),
        move("Drag Back", "tap RB + tap LB + LS flick ← then LS direction"),
        move("Quick Ball Rolls", "RS hold ←"),
        move("Feint Forward & Turn", "RS flick ← ←"),
        move("Stop & Go", "hold LT + RS flick ← →", "control exit direction with LS"),
      ]
    },
    {   //   ↑ → ↓ ← ↑ → ↓ ↑ ← ↓ → ↑ ↖  ↗  ↘  ↙
      id: "3-star", title: "3 звезды", defaultSkillRating: 3,
      items: [
        move("Heel Flick", "RS flick → ←"),
        move("Heel To Heel Variation", "hold LT + LS flick → + Fake Shot"),
        move("Roulette", "RS rotate ← ↓ → / RS rotate ← ↑ →"),
        move("Fake & Exit", "RS rotate ↓ ← ↑ / RS rotate ↑ ← ↓"),
        move("Lateral Heel to Heel", "hold RB + RS flick ↓ ↑ / hold RB + RS rotate ↑ ↓"),
        move("Heel Chop", "hold LT + LS hold ↓ / hold LT + LS hold ↑ / hold LT + LS hold ↖ / hold LT + LS hold ↗ / hold LT + LS hold ↘ / hold LT + LS hold ↙"),
        move("Explosive Step Over", "hold LB + RS rotate ← ↑ / hold LB + RS rotate → ↑"),
        move("Berba Spin", "RS rotate → ↓ / RS rotate → ↑")
      ]
    },
    { //   ↑ → ↓ ← ↑ → ↓ ↑ ← ↓ → ↑ ↖  ↗  ↘  ↙
      id: "4-star", title: "4 звезды", defaultSkillRating: 4,
      items: [
        move("Ball Hop", "hold LB + RS press", "standing"),
        move("Feint & Exit", "RS rotate ↓ ← ↑ / RS rotate ↑ ← ↓", "while running at speed"),
        move("Heel To Heel Flick", "RS flick → ←"),
        move("Simple Rainbow", " RS flick ← →"),
        move("Skilled Bridge", "hold LT + RS flick → ←"),
        move("Heel To Ball Roll", "hold LB + RS flick → ←", "control exit direction with LS"),
        move("Advanced Heel Flick", "RS flick → ← + LS hold ↗ / RS flick → ← + LS hold ↘ / RS flick → ← + LS hold →"),
        move("Skilled Roulette", "RS rotate ← ↓ → / RS rotate ← ↑ →"),
        move("Flair Roulette", "hold LB + RS rotate ← ↓ → / hold LB + RS rotate ← ↑ →"),
        move("Spin", "hold LT + hold RB + RS rotate ← ↓ → / hold LT + hold RB + RS rotate ← ↑ →"),
        move("1 Foot Spin", "hold LT + RS flick → ↓ / hold LT +  RS flick → ↑"),
        move("3 Touch Roulette", "hold LT + RS flick ← ↓ / hold LT + RS flick ← ↑"),
        move("4 Touch Spin", "hold LT + RS flick ← ←"),
        move("La Croqueta", "hold LB + RS hold ↓ / hold LB + RS hold ↑"),
        move("In & Out", "hold LT + RS hold ↓ / hold LT + RS hold ↑"),
        move("Drag to Heel", "hold LB + RS flick ← ↓ / hold LB + RS flick ← ↑"),
        move("Drag Turn", "RS flick ← ↓ / RS flick ← ↑"),
        move("Ball Roll Drag", "RS flick ← ↓ / RS flick ← ↑","while running at speed"),
        move("Step Over Ball", "hold LB + RS flick → ↓ / hold LB + RS flick ← ↑"),
        move("Scoop Turn", "LS hold ← + Fake Shot / LS hold ↑ + Fake Shot / LS hold ↓ + Fake Shot", "while standing"),
        move("Fake Pass", "hold RT + Fake Shot", "while standing"),
        move("V Drag", "hold RT + Fake Shot + LS hold ↗ / hold RT + Fake Shot + LS hold ↘", "while standing"),
        move("Drag To Chop", "hold LT + RS rotate ↓ ← ↑ / hold LT + RS rotate ↑ ← ↓", "while standing"),
        move("Drag To Drag", "LS then hold LT + Fake Shot"),
        move("Scoop Turn Fake", "Fake Shot then LS flick ↗ ↘", "LS in opposite direction, only two example in move from standing,"),
        move("Heel Chop Trun", "hold LT + LS hold ↓ then hold LS backwards / hold LT + LS hold ↑ then hold LS backwards / hold LT + LS hold ↖ then hold LS backwards / hold LT + LS hold ↗ then hold LS backwards / hold LT + LS hold ↘ then hold LS backwards / hold LT + LS hold ↙ then hold LS backwards"),
        move("Ball Roll Chop", "RS hold ↓ then RS flick ↑ / RS hold ↑ then RS flick ↓"),
        move("Ball Roll Cut", "RS hold ↓ then LS flick ↑ / RS hold ↑ then LS flick ↓", "while standing. mb"),
        move("Ball Roll Cut Turn", "hold LB + RS flick ← ←"),
        move("Drag Back Turn", "hold LT + RS hold ←"),
        move("Double Touch Spin", "RS flick ↓ + LS flick ↖ / RS flick ↑ + LS flick ↙", "while standing"),
        move("Flair Nutmeg", "hold LB + hold RB + RS flick any direction")
      ]

    },
    {
      id: "5-star", title: "5 звезд", defaultSkillRating: 5,
      items: [
        move("Running Scoop Turn", "LS hold ↗ + Fake Shot / LS hold ↘ + Fake Shot"),
        move("Heel Flick Turn", "hold RB + hold LT + RS flick → ←", "control exit direction with LS"),
        move("Advanced Rainbow", " RS flick ← then RS hold → then RS flick →"),
        move("Flair Rainbow", "hold LB + RS flick ← →"),
        move("Elastico", "RS rotate ↓ ← ↑ + right footers / RS rotate ↑ ← ↓ + left footers"),
        move("Reverse Elastico", "RS rotate ↓ ← ↑ + left footers / RS rotate ↑ ← ↓ + right footers"),
        move("Elastico Variation", "hold LT + RS rotate ↓ ← ↑ / hold LT + RS rotate ↑ ← ↓"),
        move("Hocus Pocus", "RS rotate ← ↑ then RS rotate ↑ ← ↓ + right footers / RS rotate ← ↓ then RS rotate ↓ ← ↑ + left footers"),
        move("Triple Elastico", "RS rotate ← ↓ then RS rotate ↓ ← ↑ + right footers / RS rotate ← ↑ then RS rotate ↑ ← ↓ + left footers"),
        move("Ronaldo Fenomeno", "RS hold ↑ then RS flick → / RS hold ↓ then RS flick →"),
        move("Double Touch Exit", "RS rotate → ↓ + LS hold ↗ / RS rotate → ↑ + LS hold ↘", "while standing"),
        move("Reverse Double Touch Exit", "RS rotate ↑ → + LS hold ↗ / RS rotate ↓ → + LS hold ↘", "while standing"),
        move("Toe Drag Step Over", "hold LB + RS rotate ↑ ← ↓ / Hold LB + RS rotate ↓ ← ↑"),
        move("Sombrero Flick", "RS flick → → ←"),
        move("MCGeady Spin", "RS flick → ↑ / RS flick → ↓"),
        move("Bolasie Flick", "hold RB + hold LT + RS flick → ↓"),
        move("El Tornado", "hold RB + hold LT + RS flick → ↑"),
        move("Heel Fake", "hold LB + hold LT + RS flick ↑ ↓ / hold LB + hold LT + RS flick ↓ ↑", "while standing"),
        move("Ball Roll Fake", "RS hold ↑ + RS flick ↓ / RS hold ↓ + RS flick ↑"),
        move("Ball Roll Sombrero", "RS hold ↑ then RS press / RS hold ↓ then RS press" ),
        move("Drag Back Sombrero", "hold LB + hold RB + LS flick ← then RS press" ),
        move("Rabona Fake", "hold LT + LS hold ← then Fake Shot" ),
        move("Elastico Chop", "hold RB + hold LT + RS rotate ↓ ← ↑ / hold RB + hold LT + RS rotate ↑ ← ↓" ),
        move("Alternate Elastico Chop", "hold RB + hold LT + RS flick ← ↓ / hold RB + hold LT + RS flick ← ↑" ),
        move("Drag Back Fake", "hold RB + hold RB + LS rotate ← ↑ then LS rotate ↑ ← ↓ / hold RB + hold RB + LS rotate ← ↓ then LS rotate ↓ ← ↑" ),
        move("Fancy Drag Back", "hold LT + LS hold ← + Fake Shot" ),
        move("Waka Waka", "RS rotate ↑ → + LS hold ↓ / RS rotate ↓ ← + LS hold ↑" ),
        move("Okocha Flick", "hold LB + RS hold →")
      ]
    },
    {
      id: "juggling", title: "Жонглирование", defaultSkillRating: 5,
      items: [
        move("Ramp Flick Up", "RS press", "while standing", false, 4),
        move("Malouda Flick", "hold LT + tap RB + tap RB"),
        move("Laces Flick Up", "hold LT + RS press"),
        move("Juggling Sombrero", "LS hold ←", "while juggling the ball"),
        move("Arround The world", "RS rotate ← ↑ → ↓ ← / RS rotate ← ↓ → ↑ ←", "while juggling the ball"),
        move("Hop The world", "LS press + RS rotate ← ↓ → ↑ ←", "while juggling the ball"),
        move("T. Arround The world", "RS rotate ← ↓ → ↑ ← then RS flick →", "while juggling the ball"),
        move("In Air Elastico", "RS flick ↓ ↑", "while juggling the ball"),
        move("Reverse In Air Elastico", "RS flick ↑ ↓", "while juggling the ball"),
        move("Juggling Rainbow", "RS flick ← → →", "while juggling the ball"),
        move("Chest Flick", "hold LT + RS press then RS press"),
        move("Reverse Toe Bounce", "RS hold ↑ / RS hold ↓", "while juggling the ball"),
        move("Juggling Flick", "LS hold ↑ / LS hold ↓ / LS hold ←", "while juggling the ball", false, 1),
        move("Flick Up For Volley", "LS towards the facing direction", "while juggling the ball", false, 1),

      ]
    },
    {
      id: "trikster-playstyle", title: "Trikster Playstyle", defaultSkillRating: 1,
      items: []
    },
    {
      id: "trikster-plus", title: "Trikster+", defaultSkillRating: 1,
      items: []
    },
    {
      id: "fake-shot-variations", title: "Вариации ложного удара", defaultSkillRating: 1,
      items: []
    },
    {
      id: "first-touch-moves", title: "Приемы с первым касанием", defaultSkillRating: 1,
      items: []
    },
    {
      id: "uncategorized", title: "Без категории(изысканные приемы, рабона, и другие)", defaultSkillRating: 1,
      items: []
    }
  ];

  window.EA_FC_SECTIONS = window.EA_FC_SECTIONS || {};
  window.EA_FC_SECTIONS.fc26 = window.EA_FC_SECTIONS.fc26 || {};
  window.EA_FC_SECTIONS.fc26.skills = { title: "Финты", categories };
})();
