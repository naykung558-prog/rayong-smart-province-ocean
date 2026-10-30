// Cartoon sea creatures for the page background.
// Every drawing faces LEFT; app.js mirrors it when the creature swims right.
// Parts with class "tail", "fin" or "tentacle" are animated from site.css.
(() => {
  const OUT = 'stroke="#21333f" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  const eye = (x, y, r = 7) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${OUT}/>` +
    `<circle class="pupil" cx="${x - r * 0.25}" cy="${y + r * 0.05}" r="${r * 0.5}" fill="#21333f"/>` +
    `<circle cx="${x - r * 0.42}" cy="${y - r * 0.28}" r="${r * 0.2}" fill="#fff"/>`;
  const blush = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.4" fill="#ff7b8a" opacity=".55"/>`;
  const smile = (x, y, w = 6) => `<path d="M${x} ${y} q${w / 2} ${w * 0.6} ${w} 0" fill="none" ${OUT}/>`;

  window.SEA_TOONS = {
    clownfish: {
      w: 96, h: 56,
      svg: `<svg viewBox="0 0 112 64">
        <defs><clipPath id="toon-clown-body"><ellipse cx="48" cy="32" rx="38" ry="21"/></clipPath></defs>
        <path class="tail" d="M82 32 L106 12 Q99 32 106 52Z" fill="#ff8a1f" ${OUT}/>
        <path d="M38 13 Q50 -2 66 13" fill="#ff8a1f" ${OUT}/>
        <path class="fin" d="M44 50 Q50 62 60 52" fill="#ff8a1f" ${OUT}/>
        <ellipse cx="48" cy="32" rx="38" ry="21" fill="#ff8a1f"/>
        <g clip-path="url(#toon-clown-body)">
          <path d="M26 0 Q20 32 26 64 L38 64 Q32 32 38 0Z" fill="#fff" stroke="#21333f" stroke-width="2.4"/>
          <path d="M56 0 Q50 32 56 64 L68 64 Q62 32 68 0Z" fill="#fff" stroke="#21333f" stroke-width="2.4"/>
          <path d="M78 0 Q74 32 78 64 L90 64Z" fill="#fff" stroke="#21333f" stroke-width="2.4"/>
          <ellipse cx="46" cy="44" rx="30" ry="8" fill="#ffb15c" opacity=".55"/>
        </g>
        <ellipse cx="48" cy="32" rx="38" ry="21" fill="none" ${OUT}/>
        <path class="fin" d="M46 34 Q54 40 50 46" fill="#ff8a1f" ${OUT}/>
        ${eye(20, 26)}${blush(24, 38)}${smile(10, 37)}
      </svg>`,
    },
    tang: {
      w: 100, h: 62,
      svg: `<svg viewBox="0 0 112 68">
        <path class="tail" d="M84 34 L106 14 L102 34 L106 54Z" fill="#ffd23f" ${OUT}/>
        <path d="M20 16 Q50 -2 84 22 L84 46 Q50 70 20 52Z" fill="#2f7fe0"/>
        <path d="M30 12 Q52 4 78 16" fill="none" stroke="#1d2e5a" stroke-width="6"/>
        <path d="M44 28 Q60 18 80 30 Q66 30 62 42 Q54 30 44 28Z" fill="#1d2e5a"/>
        <path d="M24 46 Q48 58 80 44" fill="none" stroke="#1d2e5a" stroke-width="4" opacity=".7"/>
        <path d="M20 16 Q50 -2 84 22 L84 46 Q50 70 20 52 Q8 34 20 16Z" fill="none" ${OUT}/>
        <path class="fin" d="M40 38 Q50 44 44 52" fill="#ffd23f" ${OUT}/>
        ${eye(22, 30, 7.5)}${smile(9, 41)}
      </svg>`,
    },
    puffer: {
      w: 74, h: 66,
      svg: `<svg viewBox="0 0 84 76">
        <path class="tail" d="M66 38 L82 26 Q78 38 82 50Z" fill="#f7c948" ${OUT}/>
        <g fill="#e09f1f" ${OUT}>
          <path d="M34 6 L38 -2 L42 6"/><path d="M52 10 L60 4 L58 14"/><path d="M16 14 L10 6 L22 10"/>
          <path d="M64 30 L74 30 L66 36"/><path d="M52 66 L58 74 L48 68"/><path d="M20 62 L14 70 L26 66"/>
        </g>
        <circle cx="38" cy="38" r="30" fill="#f7c948" ${OUT}/>
        <ellipse cx="38" cy="52" rx="22" ry="12" fill="#fff4c9"/>
        <g fill="#c98a12"><circle cx="46" cy="22" r="2.2"/><circle cx="56" cy="30" r="2"/><circle cx="30" cy="16" r="2"/><circle cx="58" cy="44" r="2"/></g>
        <path class="fin" d="M48 40 Q60 38 58 50 Q52 46 48 40Z" fill="#ffe08a" ${OUT}/>
        ${eye(22, 32, 8)}${blush(24, 46)}
        <ellipse cx="11" cy="44" rx="3.6" ry="3" fill="#ff7b8a" ${OUT}/>
      </svg>`,
    },
    angelfish: {
      w: 70, h: 86,
      svg: `<svg viewBox="0 0 80 100">
        <path class="tail" d="M58 50 L76 36 L72 50 L76 64Z" fill="#7dd3fc" ${OUT}/>
        <path d="M30 26 Q40 -4 56 2 Q48 20 52 34Z" fill="#facc15" ${OUT}/>
        <path d="M30 74 Q40 104 56 98 Q48 80 52 66Z" fill="#facc15" ${OUT}/>
        <path d="M8 50 Q24 18 58 30 L58 70 Q24 82 8 50Z" fill="#facc15"/>
        <path d="M28 26 Q24 50 28 76 M40 26 Q36 50 40 76 M52 28 Q48 50 52 72" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
        <path d="M8 50 Q24 18 58 30 L58 70 Q24 82 8 50Z" fill="none" ${OUT}/>
        ${eye(20, 46, 6.5)}${smile(9, 55, 5)}
      </svg>`,
    },
    goldfish: {
      w: 92, h: 60,
      svg: `<svg viewBox="0 0 112 70">
        <g class="tail"><path d="M72 34 Q96 8 110 18 Q96 30 104 34 Q96 40 110 52 Q96 62 72 36Z" fill="#ff6b3d" ${OUT}/>
          <path d="M84 26 Q96 22 102 22 M84 42 Q96 46 102 48" fill="none" stroke="#ffb199" stroke-width="2"/></g>
        <path d="M36 16 Q48 2 60 14" fill="#ff6b3d" ${OUT}/>
        <ellipse cx="44" cy="35" rx="32" ry="21" fill="#ff7a45" ${OUT}/>
        <path d="M40 18 Q56 22 64 34 M44 52 Q56 48 62 40" fill="none" stroke="#ffa27a" stroke-width="2"/>
        <path class="fin" d="M40 46 Q46 60 56 52" fill="#ff6b3d" ${OUT}/>
        ${eye(22, 30, 7.5)}${blush(26, 42)}
        <circle cx="12" cy="40" r="2.6" fill="#21333f"/>
      </svg>`,
    },
    whale: {
      w: 160, h: 96,
      svg: `<svg viewBox="0 0 170 100">
        <g class="tail"><path d="M132 52 Q150 40 156 22 Q162 36 168 30 Q160 52 140 62Z" fill="#4f8fd6" ${OUT}/></g>
        <path d="M10 56 Q8 22 56 18 Q110 14 138 50 Q120 82 60 84 Q14 84 10 56Z" fill="#4f8fd6" ${OUT}/>
        <path d="M14 62 Q50 86 112 70 Q86 82 52 80 Q24 78 14 62Z" fill="#dbeafe" ${OUT}/>
        <path d="M24 70 L28 76 M34 74 L37 80 M46 76 L48 82 M58 77 L59 82" stroke="#21333f" stroke-width="1.8"/>
        <path class="fin" d="M66 66 Q74 84 88 78 Q80 70 76 64Z" fill="#3b78c2" ${OUT}/>
        <g class="spout" fill="#9fd8ff" opacity=".85"><circle cx="48" cy="8" r="4"/><circle cx="42" cy="2" r="3"/><circle cx="54" cy="2" r="3"/></g>
        ${eye(34, 46, 6.5)}${blush(40, 58)}${smile(16, 58, 9)}
      </svg>`,
    },
    turtle: {
      w: 110, h: 72,
      svg: `<svg viewBox="0 0 120 80">
        <g class="fin" fill="#7bcf7b" ${OUT}>
          <path d="M44 18 Q34 0 20 4 Q28 16 42 26Z"/><path d="M44 62 Q34 80 20 76 Q28 64 42 54Z"/>
          <path d="M84 24 Q98 14 104 20 Q96 28 84 32Z"/><path d="M84 56 Q98 66 104 60 Q96 52 84 48Z"/>
        </g>
        <ellipse cx="62" cy="40" rx="30" ry="22" fill="#2e9e6a" ${OUT}/>
        <path d="M48 30 L62 24 L76 30 L76 50 L62 56 L48 50Z" fill="#46b37f" stroke="#1f6e4a" stroke-width="2"/>
        <path d="M62 24 V18 M48 30 L38 26 M76 30 L86 26 M48 50 L38 54 M76 50 L86 54 M62 56 V62" stroke="#1f6e4a" stroke-width="2"/>
        <ellipse cx="24" cy="40" rx="14" ry="11" fill="#7bcf7b" ${OUT}/>
        ${eye(20, 36, 5.5)}${blush(24, 45)}${smile(12, 44, 6)}
      </svg>`,
    },
    octopus: {
      w: 76, h: 92,
      svg: `<svg viewBox="0 0 80 100">
        <g class="tentacle" fill="none" stroke="#e45d9b" stroke-width="7" stroke-linecap="round">
          <path d="M18 56 Q8 72 16 84 Q22 92 14 98"/><path d="M30 60 Q26 78 34 92"/>
          <path d="M50 60 Q54 78 46 92"/><path d="M62 56 Q72 72 64 84 Q58 92 66 98"/>
        </g>
        <path d="M10 46 Q8 6 40 6 Q72 6 70 46 Q70 64 40 64 Q10 64 10 46Z" fill="#f472b6" ${OUT}/>
        <g fill="#fbcfe8"><circle cx="28" cy="20" r="3.5"/><circle cx="54" cy="16" r="2.6"/><circle cx="58" cy="30" r="2"/></g>
        ${eye(28, 40, 7)}${eye(52, 40, 7)}${blush(20, 52)}${blush(60, 52)}${smile(36, 52, 8)}
      </svg>`,
    },
    seahorse: {
      w: 46, h: 92,
      svg: `<svg viewBox="0 0 50 100">
        <path d="M30 18 Q44 22 40 40 Q34 54 40 66 Q46 82 34 94 Q26 100 22 92 Q30 90 30 82 Q30 72 22 62 Q14 50 22 38 Q12 34 6 28 Q4 22 10 22 Q16 24 22 18 Q24 10 30 18Z" fill="#fbbf24" ${OUT}/>
        <path d="M24 44 h12 M24 52 h12 M26 60 h12 M30 70 h10" stroke="#e59e0b" stroke-width="2.4" stroke-linecap="round"/>
        <path class="fin" d="M38 46 Q48 50 42 58" fill="#fde68a" ${OUT}/>
        <path d="M28 14 L30 6 L34 14 L38 8 L38 18" fill="#f59e0b" ${OUT}/>
        ${eye(22, 25, 5)}
      </svg>`,
    },
    crab: {
      w: 70, h: 50,
      svg: `<svg viewBox="0 0 80 56">
        <g class="fin" fill="none" stroke="#e8573c" stroke-width="4" stroke-linecap="round">
          <path d="M18 36 L6 44 M20 40 L10 52 M62 36 L74 44 M60 40 L70 52"/>
        </g>
        <g class="tentacle" fill="#ff7a5c" ${OUT}>
          <path d="M14 26 Q2 18 6 8 Q14 4 16 12 Q10 12 12 18 Q16 20 20 26Z"/>
          <path d="M66 26 Q78 18 74 8 Q66 4 64 12 Q70 12 68 18 Q64 20 60 26Z"/>
        </g>
        <ellipse cx="40" cy="34" rx="24" ry="16" fill="#ff7a5c" ${OUT}/>
        <path d="M32 18 V10 M48 18 V10" stroke="#21333f" stroke-width="2.4"/>
        ${eye(32, 10, 5)}${eye(48, 10, 5)}${blush(28, 38)}${blush(52, 38)}${smile(36, 38, 8)}
      </svg>`,
    },
  };
})();
