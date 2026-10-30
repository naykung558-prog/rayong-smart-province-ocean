/* Rayong Smart Province — page behaviour (vanilla JS) */
(() => {
  "use strict";

  const D = window.SITE_DATA;
  const DICT = window.I18N;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const icon = (name, cls = "", attrs = "") => `<i data-lucide="${name}" class="${cls}" ${attrs}></i>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fmt = (n, min = 0, max = min) => n.toLocaleString("th-TH", { minimumFractionDigits: min, maximumFractionDigits: max });
  const refreshIcons = () => window.lucide && window.lucide.createIcons();
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };

  // Seeded PRNG (mulberry32) — keeps star field and charts identical on every load
  function seeded(seed) {
    let t = seed;
    return () => {
      t |= 0; t = (t + 0x6d2b79f5) | 0;
      let e = Math.imul(t ^ (t >>> 15), 1 | t);
      e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e;
      return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
    };
  }
  window.RSP = { seeded };

  /* ------------------------------------------------------------------ */
  /* Settings: language + font scale                                     */
  /* ------------------------------------------------------------------ */
  const settings = {
    lang: ["th", "en"].includes(store.get("rsp-lang")) ? store.get("rsp-lang") : "th",
    font: ["sm", "base", "lg"].includes(store.get("rsp-fontscale")) ? store.get("rsp-fontscale") : "base",
  };
  const t = (key, fallback) => (DICT[key] && DICT[key][settings.lang]) ?? fallback ?? key;
  const langListeners = [];

  function applyLang() {
    document.documentElement.lang = settings.lang;
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n, el.textContent)));
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-i18n-placeholder]").forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
    renderSectionHeads();
    langListeners.forEach((fn) => fn());
    updateHeader(true);
    refreshIcons();
  }
  function applyFont() {
    document.documentElement.style.fontSize = { sm: "15px", base: "16px", lg: "18px" }[settings.font];
  }

  /* ------------------------------------------------------------------ */
  /* Section headings                                                    */
  /* ------------------------------------------------------------------ */
  const WAVE_GLYPH = `<svg class="eyebrow-wave" viewBox="0 0 28 8" aria-hidden="true"><path d="M0 4 Q3.5 0 7 4 T14 4 T21 4 T28 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></svg>`;

  // Rolling wave seam at the top of a section whose colour differs from the one above it
  function initWaveDividers() {
    const sections = $$("main > section");
    const tone = (s) => (s.classList.contains("bg-abyss") ? "#e8f4f0" : "#faf6ee");
    sections.forEach((s, i) => {
      if (i < 2) return; // hero has its own waves; about sits on the same sand
      const prev = tone(sections[i - 1]);
      if (prev === tone(s)) return;
      const d = document.createElement("div");
      d.className = "wave-divider";
      d.innerHTML = `<svg viewBox="0 0 2880 56" preserveAspectRatio="none"><path d="M0 0 H2880 V24 C2700 46 2520 8 2340 24 S1980 46 1800 24 S1440 8 1260 24 S900 46 720 24 S360 8 180 24 S0 40 0 24 Z" fill="${prev}"/></svg>`;
      s.prepend(d);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Living sea background                                               */
  /* ------------------------------------------------------------------ */
  const SEA_ART = {
    fish: `<svg viewBox="0 0 40 20"><g class="fin-wiggle"><path d="M2 10 Q14 0 28 10 Q14 20 2 10Z" fill="currentColor"/><path d="M27 10 L38 3 L36 10 L38 17Z" fill="currentColor"/></g><circle cx="8" cy="9" r="1.3" fill="#faf6ee"/></svg>`,
    stripe: `<svg viewBox="0 0 48 24"><g class="fin-wiggle"><path d="M2 12 Q16 0 34 12 Q16 24 2 12Z" fill="currentColor"/><path d="M33 12 L46 4 L43 12 L46 20Z" fill="currentColor"/><path d="M14 5 Q12 12 14 19 M21 4 Q19 12 21 20" stroke="#faf6ee" stroke-opacity=".55" stroke-width="2" fill="none"/></g><circle cx="7" cy="11" r="1.4" fill="#faf6ee"/></svg>`,
    turtle: `<svg viewBox="0 0 80 50"><g class="fin-wiggle"><path d="M22 14 Q10 2 4 8 Q12 14 24 20Z M22 36 Q10 48 4 42 Q12 36 24 30Z M54 16 Q66 8 70 12 Q62 18 52 21Z M54 34 Q66 42 70 38 Q62 32 52 29Z" fill="currentColor" opacity=".8"/></g><ellipse cx="38" cy="25" rx="20" ry="14" fill="currentColor"/><path d="M28 18 L38 14 L48 18 L48 32 L38 36 L28 32Z M38 14 V36 M28 25 H48" fill="none" stroke="#faf6ee" stroke-opacity=".35" stroke-width="1.4"/><ellipse cx="62" cy="25" rx="8" ry="6" fill="currentColor"/><circle cx="65" cy="23" r="1.2" fill="#faf6ee"/></svg>`,
    jelly: `<svg viewBox="0 0 40 70"><path class="bell" d="M4 22 Q4 2 20 2 Q36 2 36 22 Q30 19 26 23 Q20 19 14 23 Q10 19 4 22Z" fill="currentColor" fill-opacity=".55"/><g fill="none" stroke="currentColor" stroke-opacity=".45" stroke-width="1.4" stroke-linecap="round"><path d="M10 23 Q6 36 11 48 T9 66"/><path d="M17 24 Q21 38 16 50 T19 68"/><path d="M24 24 Q20 36 25 48 T22 64"/><path d="M31 23 Q35 34 30 46 T33 60"/></g></svg>`,
    ray: `<svg viewBox="0 0 90 50"><path d="M45 8 Q60 10 86 26 Q62 30 50 40 L46 49 L44 49 L40 40 Q28 30 4 26 Q30 10 45 8Z" fill="currentColor"/><path d="M45 40 Q47 46 52 49" stroke="currentColor" fill="none" stroke-width="1.5"/></svg>`,
    weed: `<svg viewBox="0 0 60 160"><g fill="none" stroke="currentColor" stroke-linecap="round"><path class="sway" style="animation-duration:4.2s" d="M14 160 Q4 130 16 104 T12 54 T20 8" stroke-width="5"/><path class="sway" style="animation-duration:5.1s" d="M32 160 Q42 128 30 98 T36 46 T30 20" stroke-width="6" opacity=".8"/><path class="sway" style="animation-duration:3.6s" d="M48 160 Q40 140 50 118 T46 76" stroke-width="4" opacity=".65"/></g></svg>`,
    coral: `<svg viewBox="0 0 90 90"><g class="sway" style="animation-duration:7s" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M45 90 V54 M45 62 Q30 52 28 30 M28 42 Q16 36 14 20 M45 56 Q62 46 62 24 M62 36 Q74 30 76 14 M45 54 V20"/></g><g fill="currentColor"><circle cx="28" cy="28" r="4.5"/><circle cx="14" cy="18" r="4"/><circle cx="62" cy="22" r="4.5"/><circle cx="76" cy="12" r="4"/><circle cx="45" cy="18" r="5"/></g></svg>`,
    star: `<svg viewBox="0 0 40 40"><path d="M20 2 L25 15 L38 15 L27.5 23 L31.5 37 L20 29 L8.5 37 L12.5 23 L2 15 L15 15Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><g fill="#faf6ee" opacity=".5"><circle cx="20" cy="12" r="1"/><circle cx="26" cy="18" r="1"/><circle cx="14" cy="18" r="1"/><circle cx="20" cy="22" r="1"/></g></svg>`,
    shell: `<svg viewBox="0 0 40 36"><path d="M20 34 L4 18 Q4 2 20 2 Q36 2 36 18Z" fill="currentColor"/><path d="M20 34 L10 6 M20 34 L20 3 M20 34 L30 6 M20 34 L5 15 M20 34 L35 15" stroke="#faf6ee" stroke-opacity=".45" stroke-width="1.3"/></svg>`,
  };

  function initSeaBackground() {
    const bg = document.createElement("div");
    bg.id = "sea-bg";
    bg.setAttribute("aria-hidden", "true");
    const rnd = seeded(404);
    // Faint far-away silhouettes give depth behind the cartoon cast
    const critters = [
      { art: "fish", n: 5, w: [18, 26], op: [0.08, 0.12], dur: [50, 70], color: "#0b8199" },
      { art: "ray", n: 2, w: [110, 150], op: [0.05, 0.07], dur: [80, 110], color: "#06303f", sm: true },
    ];
    let html = `<div class="depth"></div><div class="caustics"></div><div class="caustics b"></div><div class="beams"></div>`;
    const span = ([a, b]) => a + (b - a) * rnd();
    critters.forEach((c) => {
      for (let i = 0; i < c.n; i++) {
        const w = span(c.w), dir = rnd() < 0.5 ? "swim-r" : "swim-l", dur = span(c.dur);
        html += `<div class="critter ${dir} ${c.sm ? "hide-sm" : ""}" style="top:${(6 + 88 * rnd()).toFixed(1)}%;left:0;width:${w.toFixed(0)}px;height:${(w / 2).toFixed(0)}px;` +
          `color:${c.color};opacity:${span(c.op).toFixed(2)};animation-duration:${dur.toFixed(0)}s;animation-delay:${(-dur * rnd()).toFixed(1)}s">${SEA_ART[c.art]}</div>`;
      }
    });
    // Cartoon cast: [species, how many, seconds to cross the screen, extra class]
    const TOONS = window.SEA_TOONS || {};
    const cast = [
      ["clownfish", 3, [26, 38]], ["tang", 2, [30, 42]], ["puffer", 2, [44, 60]], ["angelfish", 2, [36, 50]],
      ["goldfish", 2, [28, 40]], ["turtle", 1, [70, 90]], ["whale", 1, [110, 140], "hide-sm"],
      ["octopus", 1, [60, 80], "drift"], ["seahorse", 1, [80, 100], "drift"],
    ];
    const lanes = cast.reduce((n, c) => n + c[1], 0);
    let lane = 0;
    cast.forEach(([kind, n, dur, extra = ""]) => {
      const t = TOONS[kind];
      if (!t) return;
      for (let i = 0; i < n; i++, lane++) {
        // Spread creatures over evenly spaced lanes (shuffled a little) so they don't pile up
        const top = 8 + (80 * ((lane * 7) % lanes)) / lanes + 4 * rnd();
        const d = span(dur), scale = 0.8 + 0.35 * rnd();
        // Every other creature sits out on phones so small screens stay readable
        html += `<div class="toon ${rnd() < 0.5 ? "swim-r" : "swim-l"} ${extra} ${lane % 2 ? "hide-sm" : ""}" style="top:${top.toFixed(1)}%;width:${(t.w * scale).toFixed(0)}px;height:${(t.h * scale).toFixed(0)}px;` +
          `opacity:.5;animation-duration:${d.toFixed(0)}s;animation-delay:${(-d * rnd()).toFixed(1)}s">` +
          `<div class="bob" style="animation-duration:${(1.6 + 1.4 * rnd()).toFixed(2)}s">${t.svg}</div></div>`;
      }
    });
    if (TOONS.crab) {
      html += `<div class="toon crab" style="width:${TOONS.crab.w}px;height:${TOONS.crab.h}px;opacity:.85"><div class="bob">${TOONS.crab.svg}</div></div>`;
    }

    // A school: a tight cluster of small fish travelling together
    const schoolTop = 30 + 30 * rnd();
    for (let i = 0; i < 9; i++) {
      html += `<div class="critter swim-r hide-sm" style="top:calc(${schoolTop}% + ${(Math.sin(i * 1.7) * 26).toFixed(0)}px);left:${(i % 3) * 18}px;width:16px;height:8px;color:#0aa2c0;opacity:.18;animation-duration:52s;animation-delay:${(-8 - i * 0.35).toFixed(2)}s">${SEA_ART.fish}</div>`;
    }
    for (let i = 0; i < 3; i++) {
      const w = 34 + 22 * rnd();
      html += `<div class="critter jelly hide-sm" style="top:${(15 + 60 * rnd()).toFixed(0)}%;left:${(8 + 84 * rnd()).toFixed(0)}%;width:${w.toFixed(0)}px;height:${(w * 1.75).toFixed(0)}px;color:#c084fc;opacity:.16;animation-duration:${(7 + 5 * rnd()).toFixed(1)}s">${SEA_ART.jelly}</div>`;
    }
    for (let i = 0; i < 18; i++) {
      const s = 3 + 9 * rnd();
      html += `<span class="bg-bubble" style="left:${(100 * rnd()).toFixed(1)}%;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;animation-duration:${(16 + 18 * rnd()).toFixed(1)}s;animation-delay:${(-30 * rnd()).toFixed(1)}s;--drift:${(-24 + 48 * rnd()).toFixed(0)}px"></span>`;
    }
    bg.innerHTML = html;
    document.body.prepend(bg);
  }

  // Seaweed, coral, starfish and shells resting at the bottom of sand-coloured sections
  const SEABED = {
    about: [["weed", "left-[1%] bottom-0 h-40 w-16", "#0f9a84", 0.22], ["coral", "right-[3%] bottom-0 h-24 w-24", "#e2674f", 0.2], ["star", "right-[12%] bottom-4 h-8 w-8", "#e8a33c", 0.35]],
    governor: [["shell", "left-[2%] bottom-6 h-7 w-8", "#e2674f", 0.3], ["weed", "right-[1%] bottom-0 h-36 w-14", "#0aa2c0", 0.2]],
    twin: [["coral", "left-[1%] bottom-0 h-20 w-20 hide-sm", "#c084fc", 0.2], ["star", "right-[4%] bottom-8 h-7 w-7", "#e2674f", 0.35]],
    announcements: [["weed", "right-[1%] bottom-0 h-44 w-16", "#0f9a84", 0.2], ["shell", "left-[3%] bottom-6 h-8 w-9", "#e8a33c", 0.32]],
    map: [["coral", "right-[2%] bottom-0 h-24 w-24 hide-sm", "#e2674f", 0.18]],
    explore: [["weed", "left-[1%] bottom-0 h-40 w-16", "#0aa2c0", 0.22], ["star", "left-[7%] bottom-5 h-8 w-8", "#e8a33c", 0.4], ["coral", "right-[2%] bottom-0 h-28 w-28", "#0f9a84", 0.18]],
    services: [["shell", "right-[4%] bottom-6 h-7 w-8", "#e2674f", 0.3], ["weed", "left-[1%] bottom-0 h-36 w-14", "#0f9a84", 0.2]],
    poll: [["coral", "left-[3%] bottom-0 h-28 w-28", "#e2674f", 0.2], ["weed", "right-[3%] bottom-0 h-44 w-16", "#0aa2c0", 0.22], ["star", "right-[10%] bottom-6 h-7 w-7", "#e8a33c", 0.4]],
  };
  function initSeabed() {
    Object.entries(SEABED).forEach(([id, items]) => {
      const sec = document.getElementById(id);
      items.forEach(([art, cls, color, op]) => {
        const d = document.createElement("div");
        d.className = `seabed ${cls}`;
        d.style.color = color;
        d.style.opacity = op;
        d.setAttribute("aria-hidden", "true");
        d.innerHTML = SEA_ART[art];
        sec.appendChild(d);
      });
    });
  }

  function renderSectionHeads() {
    $$(".section-head").forEach((el) => {
      const key = el.dataset.key;
      const center = el.dataset.align === "center";
      if (!el.dataset.ready) {
        el.classList.add("flex", "flex-col", "gap-3", center ? "items-center" : "items-start");
        if (center) el.classList.add("text-center");
        if (!el.classList.contains("mb-0")) el.classList.add("mb-12");
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--ry", "32px");
        el.dataset.ready = "1";
      }
      const eyebrow = t(`${key}.eyebrow`, "");
      const desc = t(`${key}.description`, "");
      el.innerHTML =
        (eyebrow ? `<span class="font-display inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-azure uppercase">${WAVE_GLYPH}${esc(eyebrow)}</span>` : "") +
        `<h2 class="font-display max-w-3xl text-3xl font-bold leading-snug text-navy sm:text-4xl">${esc(t(`${key}.title`))}</h2>` +
        (desc && desc !== `${key}.description` ? `<p class="max-w-2xl text-base leading-relaxed text-slate-600">${esc(desc)}</p>` : "");
    });
  }

  /* ------------------------------------------------------------------ */
  /* Header                                                              */
  /* ------------------------------------------------------------------ */
  const NAV = [
    { id: "about", items: ["about", "governor"] },
    { id: "smart", items: ["twin", "data", "calendar"] },
    { id: "travel", items: ["map", "explore"] },
    { id: "services", items: ["services", "eservice", "announcements"] },
    { id: "info", items: ["resources", "poll", "agencies", "news"] },
  ];

  function renderNav() {
    $("#desktop-nav").innerHTML = NAV.map((g) => `
      <div class="group relative">
        <button class="nav-btn font-display flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors" aria-haspopup="true">
          ${esc(t(`nav.g.${g.id}`))}${icon("chevron-down", "h-3.5 w-3.5 transition-transform group-hover:rotate-180")}
        </button>
        <div class="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
          <div class="glass-strong min-w-52 rounded-2xl p-2">
            ${g.items.map((i) => `<a href="#${i}" class="font-display block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-azure/10 hover:text-azure">${esc(t(`nav.${i}`))}</a>`).join("")}
          </div>
        </div>
      </div>`).join("");
    $("#mobile-nav").innerHTML = NAV.map((g) => `
      <div class="mb-1.5">
        <p class="font-display px-4 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-azure uppercase">${esc(t(`nav.g.${g.id}`))}</p>
        ${g.items.map((i) => `<a href="#${i}" class="block rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-azure/10 hover:text-azure">${esc(t(`nav.${i}`))}</a>`).join("")}
      </div>`).join("");
  }
  langListeners.push(renderNav);

  let headerScrolled = null;
  function updateHeader(force) {
    const scrolled = window.scrollY > 60;
    if (scrolled === headerScrolled && !force) return;
    headerScrolled = scrolled;
    const header = $("#site-header");
    header.classList.toggle("glass-strong", scrolled);
    header.classList.toggle("py-1.5", scrolled);
    header.classList.toggle("bg-transparent", !scrolled);
    header.classList.toggle("py-2.5", !scrolled);
    $("#util-bar").classList.toggle("border-navy/8", scrolled);
    $("#util-bar").classList.toggle("border-white/12", !scrolled);

    const idle = scrolled ? "text-slate-600 hover:bg-azure/10 hover:text-azure" : "text-white/80 hover:bg-white/15 hover:text-white";
    const active = scrolled ? "bg-azure text-white" : "bg-white text-[#06303f]";
    $$(".util-btn").forEach((b) => {
      b.dataset.base ??= b.className;
      const on = b.dataset.font ? b.dataset.font === settings.font : b.dataset.lang === settings.lang;
      b.className = `${b.dataset.base} ${on ? active : idle}`;
      b.setAttribute("aria-pressed", on);
    });
    $$(".util-plain").forEach((b) => { b.dataset.base ??= b.className; b.className = `${b.dataset.base} ${idle}`; });
    $$(".util-sep").forEach((s) => { s.dataset.base ??= s.className; s.className = `${s.dataset.base} ${scrolled ? "bg-navy/15" : "bg-white/25"}`; });
    $$(".util-kbd").forEach((k) => { k.dataset.base ??= k.className; k.className = `${k.dataset.base} ${scrolled ? "border-navy/15 text-slate-500" : "border-white/30 text-white/60"}`; });
    $$(".nav-btn").forEach((b) => {
      b.dataset.base ??= b.className;
      b.className = `${b.dataset.base} ${scrolled ? "text-slate-600 hover:bg-azure/10 hover:text-azure" : "text-white/85 hover:bg-white/10 hover:text-white"}`;
    });
    const seal = $("#brand-seal");
    seal.classList.toggle("border-azure/30", scrolled);
    seal.classList.toggle("border-white/40", !scrolled);
    $("#brand-name").classList.toggle("text-navy", scrolled);
    $("#brand-name").classList.toggle("text-white", !scrolled);
    $("#brand-sub").classList.toggle("text-azure/80", scrolled);
    $("#brand-sub").classList.toggle("text-white/70", !scrolled);
    const mt = $("#menu-toggle");
    mt.className = `flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden ${scrolled ? "border-navy/10 bg-white text-navy" : "border-white/30 bg-white/10 text-white"}`;
  }

  function initHeader() {
    $$(".util-btn[data-font]").forEach((b) => b.addEventListener("click", () => {
      settings.font = b.dataset.font; store.set("rsp-fontscale", settings.font); applyFont(); updateHeader(true);
    }));
    $$(".util-btn[data-lang]").forEach((b) => b.addEventListener("click", () => {
      settings.lang = b.dataset.lang; store.set("rsp-lang", settings.lang); applyLang();
    }));
    const menu = $("#mobile-menu");
    $("#menu-toggle").addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      $("#menu-toggle").setAttribute("aria-expanded", open);
      $("#menu-toggle").innerHTML = icon(open ? "x" : "menu", "h-5 w-5");
      refreshIcons();
    });
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) { menu.hidden = true; $("#menu-toggle").innerHTML = icon("menu", "h-5 w-5"); refreshIcons(); }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smooth scrolling + scroll-linked motion                             */
  /* ------------------------------------------------------------------ */
  let lenis = null;
  function initSmoothScroll() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.Lenis && !reduce) {
      lenis = new window.Lenis({ lerp: 0.1 });
      window.RSP.lenis = lenis;
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      scrollToSection(el);
    });
  }
  function scrollToSection(el) {
    const offset = el.id === "hero" ? 0 : -112;
    if (lenis) lenis.scrollTo(el, { offset });
    else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + offset, behavior: "smooth" });
  }

  function initOrbs() {
    $$(".orb").forEach((o) => {
      const size = +o.dataset.size;
      o.classList.add("pointer-events-none", "absolute");
      o.dataset.parallax = o.dataset.speed;
      o.innerHTML = `<div class="rounded-full blur-3xl" style="width:${size}px;height:${size}px;background:${o.dataset.color}1a"></div>`;
    });
  }

  // Reveal-on-scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      en.target.dispatchEvent(new CustomEvent("reveal"));
      revealObserver.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px -60px 0px" });
  const observeReveals = (root = document) => $$("[data-reveal]:not(.is-in)", root).forEach((el) => revealObserver.observe(el));

  // Card tilt on hover
  function bindTilt(root = document) {
    $$("[data-tilt]:not([data-tilt-bound])", root).forEach((el) => {
      el.dataset.tiltBound = "1";
      const lift = +(el.dataset.lift || 0);
      const set = (rx, ry, y) => (el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${y}px)`);
      set(0, 0, 0);
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        set(-8 * y, 10 * x, -lift);
      });
      el.addEventListener("mouseleave", () => set(0, 0, 0));
    });
  }

  // Scroll-linked parallax, tilt-in panels and hero
  const hero = { mx: 0, my: 0, sx: 0, sy: 0 };
  function scrollFrame() {
    const vh = innerHeight;
    $$("[data-parallax]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const base = parseFloat(el.dataset.offset || 0);
      const top = r.top - base;
      const p = Math.min(Math.max((vh - top) / (vh + r.height), 0), 1);
      const speed = +el.dataset.parallax;
      const y = speed - 2 * speed * p;
      el.dataset.offset = y;
      el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
    });
    $$("[data-tilt-in]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = Math.min(Math.max((vh - r.top) / (vh / 2 + r.height / 2), 0), 1);
      $(".tilt-target", el).style.transform = `rotateX(${(+el.dataset.tiltIn * (1 - p)).toFixed(2)}deg)`;
    });

    // Hero: mouse spring + scroll parallax
    const heroEl = $("#hero");
    const h = heroEl.offsetHeight;
    const sp = Math.min(Math.max(scrollY / h, 0), 1);
    hero.sx += (hero.mx - hero.sx) * 0.06;
    hero.sy += (hero.my - hero.sy) * 0.06;
    if (sp < 1) {
      $("#hero-video-wrap").style.transform = `translate3d(${(-22 * hero.sx).toFixed(2)}px,${(-14 * hero.sy + 110 * sp).toFixed(2)}px,0)`;
      $("#hero-content").style.transform = `translate3d(0,${(-160 * sp).toFixed(1)}px,0)`;
      $("#hero-content").style.opacity = Math.max(1 - sp / 0.55, 0);
      $("#hero-stars").style.transform = `translate3d(0,${(90 * sp).toFixed(1)}px,0)`;
      $("#hero-glow").style.transform = `translate3d(0,${(220 * sp).toFixed(1)}px,0)`;
    }
    // Diving deeper: background tint grows and sunbeams fade with page depth
    const depth = Math.min(scrollY / Math.max(document.body.scrollHeight - vh, 1), 1);
    const sea = $("#sea-bg");
    if (sea) {
      $(".depth", sea).style.opacity = (0.75 * depth).toFixed(3);
      $(".beams", sea).style.opacity = (1 - 0.8 * depth).toFixed(3);
    }
    updateHeader();
    requestAnimationFrame(scrollFrame);
  }

  function initHero() {
    const rnd = seeded(2035);
    $("#hero-stars").innerHTML = Array.from({ length: 50 }, () => {
      const x = 100 * rnd(), y = 38 * rnd(), s = 1 + 1.5 * rnd(), d = 4 * rnd();
      return `<span class="hero-star absolute rounded-full bg-white" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-delay:${d.toFixed(2)}s"></span>`;
    }).join("");
    // Bubbles drifting up through the hero
    const brnd = seeded(71);
    $("#hero-bubbles").innerHTML = Array.from({ length: 26 }, () => {
      const size = 4 + 14 * brnd();
      return `<span class="bubble" style="left:${(100 * brnd()).toFixed(1)}%;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;` +
        `animation-duration:${(9 + 10 * brnd()).toFixed(1)}s;animation-delay:${(-18 * brnd()).toFixed(1)}s;--drift:${(-20 + 40 * brnd()).toFixed(0)}px"></span>`;
    }).join("");
    $("#hero").addEventListener("mousemove", (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      hero.mx = (e.clientX - r.left) / r.width - 0.5;
      hero.my = (e.clientY - r.top) / r.height - 0.5;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Shared bits                                                         */
  /* ------------------------------------------------------------------ */
  const chip = (text, color, extra = "px-2.5 py-0.5 text-[10px]") =>
    `<span class="font-display rounded-full ${extra} font-semibold text-white" style="background:${color}">${esc(text)}</span>`;

  function sparkPath(data, w, h, padTop, padBottom) {
    const max = Math.max(...data), min = Math.min(...data), span = max - min || 1;
    const pts = data.map((v, i) => ({ x: (i / (data.length - 1)) * w, y: h - padBottom - ((v - min) / span) * (h - padTop - padBottom) }));
    return { pts, line: pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") };
  }

  // Tabs with a sliding active pill
  function tabs(container, items, active, onChange) {
    container.classList.add("relative");
    container.innerHTML = `<span class="tab-pill absolute rounded-xl bg-azure shadow-[0_4px_14px_#0b819944] transition-all duration-500 ease-[cubic-bezier(.34,1.3,.64,1)]"></span>` +
      items.map((it) => `<button data-id="${it.id}" class="font-display relative flex items-center gap-2 rounded-xl ${it.pad || "px-5"} py-2.5 text-sm font-semibold transition-colors">${icon(it.icon, "relative z-10 h-4 w-4")}<span class="relative z-10">${esc(it.label())}</span></button>`).join("");
    const pill = $(".tab-pill", container);
    let current = active;
    const select = (id, first) => {
      current = id;
      $$("button", container).forEach((b) => {
        const on = b.dataset.id === id;
        b.setAttribute("aria-pressed", on);
        b.classList.toggle("text-white", on);
        b.classList.toggle("text-slate-500", !on);
        b.classList.toggle("hover:text-navy", !on);
        if (on) {
          if (first) pill.style.transition = "none";
          pill.style.left = `${b.offsetLeft}px`; pill.style.top = `${b.offsetTop}px`;
          pill.style.width = `${b.offsetWidth}px`; pill.style.height = `${b.offsetHeight}px`;
          if (first) requestAnimationFrame(() => (pill.style.transition = ""));
        }
      });
      if (!first) onChange(id);
    };
    // Assigned (not added) so re-rendering on language change doesn't stack handlers
    container.onclick = (e) => { const b = e.target.closest("button"); if (b) select(b.dataset.id); };
    refreshIcons();
    requestAnimationFrame(() => select(active, true));
    if (container._onResize) removeEventListener("resize", container._onResize);
    container._onResize = () => select(current, true);
    addEventListener("resize", container._onResize);
  }

  function mount(el, html) {
    el.innerHTML = html;
    refreshIcons();
    observeReveals(el);
    bindTilt(el);
  }

  /* ------------------------------------------------------------------ */
  /* About                                                               */
  /* ------------------------------------------------------------------ */
  const KPI_MAIN = ["ประชากร", "เศรษฐกิจ (GPP)", "นักท่องเที่ยว", "พลังงานสะอาด"];
  const KPI_ICONS = { "อุตสาหกรรม": "factory", "การศึกษา": "graduation-cap", "นวัตกรรม": "lightbulb", "บริการอัจฉริยะ": "monitor-smartphone" };

  function renderAbout() {
    const main = D.kpis.filter((k) => KPI_MAIN.includes(k.label));
    $("#about-kpis").innerHTML = main.map((k, i) => {
      const { pts, line } = sparkPath(k.trend, 100, 26, 4, 4);
      const last = pts[pts.length - 1];
      return `<div class="border-l-2 pl-5" style="border-color:${k.color}55;--rd:${0.1 * i}s" data-reveal data-count="${k.value}" data-decimals="${k.decimals || 0}">
        <p class="text-sm text-slate-500">${esc(k.label)}</p>
        <p class="font-display text-glow-cyan mt-1 text-3xl font-bold text-navy sm:text-4xl"><span class="count">${fmt(0, k.decimals || 0)}</span><span class="ml-1 text-sm font-semibold" style="color:${k.color}">${esc(k.suffix)}</span></p>
        <div class="mt-2"><svg width="100" height="26" viewBox="0 0 100 26" class="overflow-visible" aria-hidden="true">
          <path d="${line} L100,26 L0,26 Z" fill="${k.color}" fill-opacity="0.12"></path>
          <path class="draw-line" d="${line}" fill="none" stroke="${k.color}" stroke-width="2" stroke-linecap="round" pathLength="1" style="animation-duration:1.4s"></path>
          <circle cx="${last.x}" cy="${last.y}" r="3" fill="${k.color}" class="animate-blink"></circle></svg></div>
      </div>`;
    }).join("");
    $$("#about-kpis [data-count]").forEach((el) => el.addEventListener("reveal", () => countUp(el)));

    $("#about-chips").innerHTML = D.kpis.filter((k) => !KPI_MAIN.includes(k.label)).map((k) =>
      `<span class="glass flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-slate-600">${icon(KPI_ICONS[k.label] || "circle", "h-4 w-4", `style="color:${k.color}"`)}<span class="font-display font-semibold text-navy">${fmt(k.value)}${esc(k.suffix)}</span>${esc(k.label)}</span>`
    ).join("");
  }
  function countUp(el) {
    const target = +el.dataset.count, dec = +el.dataset.decimals, out = $(".count", el), t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / 1800, 1);
      out.textContent = fmt(+(target * (1 - Math.pow(1 - p, 3))).toFixed(dec), dec);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------ */
  /* Governor activities                                                 */
  /* ------------------------------------------------------------------ */
  function renderGovernor() {
    mount($("#gov-activities"), D.activities.map((a, i) => `
      <div data-reveal style="--ry:20px;--rd:${0.08 * i}s"><div class="rounded-2xl glass holo-border p-4 h-full" data-tilt data-lift="3">
        <div class="mb-2 flex items-center justify-between gap-2">${chip(a.tag, a.color)}
          <span class="flex items-center gap-1 text-[11px] text-slate-500">${icon("calendar-days", "h-3 w-3")}${esc(a.date)}</span></div>
        <p class="font-display text-sm leading-snug font-semibold text-navy">${esc(a.title)}</p>
        <p class="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">${icon("map-pin", "h-3 w-3 shrink-0 text-azure")}${esc(a.location)}</p>
      </div></div>`).join(""));
  }

  /* ------------------------------------------------------------------ */
  /* Digital twin legend + zone panel (3D scene lives in scene-twin.js)  */
  /* ------------------------------------------------------------------ */
  const twin = {
    selected: null,
    listeners: [],
    select(id) { this.selected = id; this.listeners.forEach((fn) => fn(id)); },
  };
  window.RSP.twin = twin;
  window.RSP.zones = D.zones;

  function renderTwinUI() {
    const legend = $("#twin-legend");
    const drawLegend = () => {
      legend.innerHTML = D.zones.map((z) => {
        const on = twin.selected === z.id;
        return `<button data-zone="${z.id}" class="pointer-events-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs backdrop-blur transition-all ${on ? "bg-white opacity-100 shadow-[0_4px_14px_#0b819933] ring-1 ring-azure/30" : "bg-white/85 opacity-85 hover:bg-white hover:opacity-100"}">
          <span class="h-2 w-2 rounded-full" style="background:${z.color}"></span><span class="font-display text-navy">${esc(z.name)}</span></button>`;
      }).join("");
    };
    legend.addEventListener("click", (e) => {
      const b = e.target.closest("[data-zone]");
      if (b) twin.select(twin.selected === b.dataset.zone ? null : b.dataset.zone);
    });
    const panel = $("#twin-panel");
    const drawPanel = () => {
      const z = D.zones.find((x) => x.id === twin.selected);
      if (!z) { panel.innerHTML = ""; return; }
      panel.innerHTML = `<div class="glass-strong holo-border animate-panel-in mt-6 rounded-2xl p-6 sm:p-8">
        <div class="mb-4 flex items-start justify-between">
          <div><span class="font-display text-xs tracking-[0.25em] uppercase" style="color:${z.color}">Smart Zone</span>
            <h3 class="font-display mt-1 text-2xl font-bold text-navy">${esc(z.name)}</h3>
            <p class="mt-1 text-sm text-slate-600">${esc(z.tagline)}</p></div>
          <button data-close class="glass rounded-lg p-2 text-slate-600 hover:text-navy" aria-label="ปิดแผงข้อมูล">${icon("x", "h-4 w-4")}</button>
        </div>
        <div class="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3">${z.stats.map((s) => `
          <div class="flex items-center justify-between rounded-xl border border-navy/10 bg-navy/5 px-4 py-3 sm:flex-col sm:items-start sm:gap-1.5">
            <span class="flex items-center gap-2 text-xs text-slate-500">${icon("chart-column", "h-3.5 w-3.5")}${esc(s.label)}</span>
            <span class="font-display text-sm font-semibold text-navy sm:text-lg">${esc(s.value)}</span></div>`).join("")}</div>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div><h4 class="font-display mb-2 flex items-center gap-2 text-sm font-semibold text-navy">${icon("folder-kanban", "h-4 w-4")}โครงการเด่น</h4>
            <ul class="space-y-2">${z.projects.map((p) => `<li class="flex gap-2 text-xs leading-relaxed text-slate-600"><span class="mt-1.5 h-1 w-1 shrink-0 rounded-full" style="background:${z.color}"></span>${esc(p)}</li>`).join("")}</ul></div>
          <div><h4 class="font-display mb-2 flex items-center gap-2 text-sm font-semibold text-navy">${icon("layers", "h-4 w-4")}บริการที่เกี่ยวข้อง</h4>
            <div class="flex flex-wrap gap-2">${z.services.map((s) => `<span class="rounded-full border px-3 py-1 text-[11px]" style="border-color:${z.color}44;color:${z.color};background:${z.color}0d">${esc(s)}</span>`).join("")}</div></div>
        </div></div>`;
      refreshIcons();
    };
    panel.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) twin.select(null); });
    twin.listeners.push(drawLegend, drawPanel);
    drawLegend();
  }

  /* ------------------------------------------------------------------ */
  /* Live data                                                           */
  /* ------------------------------------------------------------------ */
  const LIVE_IDS = ["weather", "pm25", "tourists", "energy"];
  const LIVE_ICONS = { weather: "thermometer", pm25: "wind", tourists: "users", energy: "zap" };
  const STATUS = { good: { label: "ดีมาก", color: "#0f9a84" }, normal: { label: "ปกติ", color: "#0b8199" }, warning: { label: "เฝ้าระวัง", color: "#e2674f" } };
  const TREND_IDS = ["visitors", "ev", "air", "economy"];
  const MONTHS = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

  function renderLiveData() {
    const metrics = D.liveMetrics.filter((m) => LIVE_IDS.includes(m.id));
    mount($("#live-metrics"), metrics.map((m) => {
      const st = STATUS[m.status];
      return `<div class="rounded-2xl glass holo-border p-5" data-tilt>
        <div class="flex items-center justify-between">
          <span class="flex items-center gap-2 text-xs text-slate-500">${icon(LIVE_ICONS[m.id], "h-4 w-4 text-azure")}${esc(m.label)}</span>
          <span class="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold" style="color:${st.color};background:${st.color}14"><span class="h-1.5 w-1.5 rounded-full animate-blink" style="background:${st.color}"></span>${st.label}</span>
        </div>
        <p class="font-display text-glow-cyan mt-3 text-3xl font-bold text-navy tabular-nums"><span data-live="${m.id}">${fmt(m.base, m.decimals)}</span><span class="ml-1 text-sm font-medium text-slate-500">${esc(m.unit)}</span></p>
      </div>`;
    }).join(""));
    // Values drift around their baseline like a live feed
    metrics.forEach((m) => {
      let v = m.base;
      setInterval(() => {
        v += (Math.random() - 0.5) * m.jitter * 2;
        v += (m.base - v) * 0.15;
        $(`[data-live="${m.id}"]`).textContent = fmt(v, m.decimals);
      }, 2400);
    });
    const clock = () => ($("#live-clock").textContent = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    clock(); setInterval(clock, 1000);

    const trends = D.trends.filter((m) => TREND_IDS.includes(m.id));
    mount($("#live-trends"), trends.map((m) => {
      const up = m.change >= 0, good = m.id === "air" ? !up : up;
      const max = Math.max(...m.series), min = Math.min(...m.series), span = max - min || 1;
      const pts = m.series.map((v, i) => ({ x: 8 + (i / (m.series.length - 1)) * 304, y: 104 - ((v - min) / span) * 84 }));
      const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
      const w = 304 / m.series.length;
      return `<div data-reveal style="--ry:28px"><div class="rounded-2xl glass holo-border p-5 h-full" data-tilt>
        <div class="mb-1 flex items-start justify-between gap-2"><p class="text-sm text-slate-500">${esc(m.label)}</p>
          <span class="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${good ? "bg-mint/10 text-mint" : "bg-amber/10 text-amber"}">${icon(up ? "trending-up" : "trending-down", "h-3 w-3")}${up ? "+" : ""}${m.change}%</span></div>
        <p class="font-display mb-3 text-2xl font-bold text-navy tabular-nums">${fmt(m.current, 0, m.decimals)}<span class="ml-1.5 text-xs font-medium text-slate-500">${esc(m.unit)}</span></p>
        <div class="chart relative" data-id="${m.id}">
          <svg viewBox="0 0 320 120" class="w-full">
            ${[0.25, 0.5, 0.75].map((f) => `<line x1="8" x2="312" y1="${104 - 84 * f}" y2="${104 - 84 * f}" stroke="rgba(6,48,63,0.08)" stroke-dasharray="3 5"></line>`).join("")}
            <path d="${line} L312,112 L8,112 Z" fill="${m.color}" fill-opacity="0.1"></path>
            <path class="draw-line" d="${line}" fill="none" stroke="${m.color}" stroke-width="2.2" stroke-linecap="round" pathLength="1"></path>
            <g class="hover-mark" style="display:none"><line class="hl" y1="8" y2="112" stroke="${m.color}" stroke-opacity=".35" stroke-dasharray="2 3"></line><circle class="hc" r="4.5" fill="${m.color}"></circle><circle class="hr" r="8" fill="none" stroke="${m.color}" stroke-opacity=".4"></circle></g>
            ${pts.map((p, i) => `<rect data-i="${i}" x="${p.x - w / 2}" y="0" width="${w}" height="120" fill="transparent"></rect>`).join("")}
          </svg>
          <div class="tip glass-strong pointer-events-none absolute -top-2 z-10 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap" hidden></div>
        </div></div></div>`;
    }).join(""));
    $$("#live-trends .chart").forEach((c) => {
      const m = trends.find((x) => x.id === c.dataset.id);
      const max = Math.max(...m.series), min = Math.min(...m.series), span = max - min || 1;
      const mark = $(".hover-mark", c), tip = $(".tip", c);
      c.querySelector("svg").addEventListener("mouseleave", () => { mark.style.display = "none"; tip.hidden = true; });
      $$("rect", c).forEach((r) => r.addEventListener("mouseenter", () => {
        const i = +r.dataset.i, x = 8 + (i / (m.series.length - 1)) * 304, y = 104 - ((m.series[i] - min) / span) * 84;
        mark.style.display = "";
        $(".hl", c).setAttribute("x1", x); $(".hl", c).setAttribute("x2", x);
        ["hc", "hr"].forEach((k) => { $(`.${k}`, c).setAttribute("cx", x); $(`.${k}`, c).setAttribute("cy", y); });
        tip.hidden = false;
        tip.style.left = `${(x / 320) * 100}%`;
        tip.innerHTML = `<span class="text-slate-500">${MONTHS[i]} · </span><span class="font-display font-semibold" style="color:${m.color}">${fmt(m.series[i], 0, m.decimals)} ${esc(m.unit)}</span>`;
      }));
    });

    $("#live-ticker").innerHTML = [...D.ticker, ...D.ticker].map((s) =>
      `<span class="flex items-center gap-3 text-sm text-slate-600"><span class="h-1.5 w-1.5 rounded-full bg-azure"></span>${esc(s)}</span>`).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Calendar                                                            */
  /* ------------------------------------------------------------------ */
  let calDay = D.events[0].day;
  function renderCalendar() {
    const cal = D.calendar;
    const eventDays = new Set(D.events.map((e) => e.day));
    const heads = settings.lang === "th" ? ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"] : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    $("#cal-month").textContent = settings.lang === "th" ? cal.labelTh : cal.labelEn;
    const cells = [...Array(cal.firstWeekday).fill(null), ...Array.from({ length: cal.days }, (_, i) => i + 1)];
    $("#cal-grid").innerHTML = heads.map((d) => `<span class="font-display pb-2 text-center text-[11px] font-semibold tracking-wider text-slate-500">${d}</span>`).join("") +
      cells.map((d) => {
        if (!d) return "<span></span>";
        const sel = d === calDay, has = eventDays.has(d);
        const cls = sel ? "bg-azure text-white shadow-[0_6px_18px_#0b819955]" : has ? "bg-azure/8 text-navy hover:bg-azure/15" : "text-slate-500 hover:bg-navy/5";
        return `<button data-day="${d}" aria-pressed="${sel}" aria-label="กิจกรรมวันที่ ${d}" class="font-display relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-medium transition-all ${cls}">${d}${has ? `<span class="absolute bottom-1.5 h-1 w-1 rounded-full ${sel ? "bg-white" : "bg-azure"}"></span>` : ""}</button>`;
      }).join("");
    $("#cal-heading").textContent = `${t("sec.calendar.eventsOn")} ${calDay} ${settings.lang === "th" ? "มิ.ย. 2569" : "Jun 2026"}`;
    const list = D.events.filter((e) => e.day === calDay);
    mount($("#cal-events"), `<div class="tab-swap space-y-3">${list.length ? list.map((e) => `
      <div class="rounded-2xl glass holo-border p-5">${chip(e.category, e.color)}
        <h4 class="font-display mt-2.5 text-sm leading-snug font-semibold text-navy">${esc(e.title)}</h4>
        <div class="mt-3 space-y-1.5 text-xs text-slate-500">
          <p class="flex items-center gap-1.5">${icon("clock", "h-3 w-3 shrink-0 text-azure")}${esc(e.time)}</p>
          <p class="flex items-center gap-1.5">${icon("map-pin", "h-3 w-3 shrink-0 text-azure")}${esc(e.location)}</p>
        </div></div>`).join("") : `<div class="rounded-2xl glass holo-border p-6 text-center text-sm text-slate-500">${esc(t("sec.calendar.noEvents"))}</div>`}</div>`);
  }
  function initCalendar() {
    $("#cal-grid").addEventListener("click", (e) => {
      const b = e.target.closest("[data-day]");
      if (b) { calDay = +b.dataset.day; renderCalendar(); }
    });
    renderCalendar();
    langListeners.push(renderCalendar);
  }

  /* ------------------------------------------------------------------ */
  /* Announcements                                                       */
  /* ------------------------------------------------------------------ */
  const PROC_COLORS = { "ประกาศจัดซื้อจัดจ้าง": "#0b8199", "ประกาศผู้ชนะ": "#0f9d76", "ร่าง TOR": "#c2410c", "ราคากลาง": "#0aa2c0" };
  function renderAnnouncements(tab) {
    const body = $("#announce-body");
    if (tab === "pr") {
      mount(body, `<div class="tab-swap grid grid-cols-1 gap-5 sm:grid-cols-2">${D.pr.map((a, i) => `
        <div data-parallax="${i % 2 === 0 ? 20 : -16}"><div data-reveal style="--ry:24px;--rd:${0.06 * i}s" class="h-full">
          <div class="rounded-2xl glass holo-border group flex h-full cursor-pointer flex-col p-6" data-tilt data-lift="4">
            <div class="mb-3 flex items-center justify-between gap-3">${chip("ประชาสัมพันธ์", a.color, "px-3 py-1 text-[10px] tracking-wider")}
              <span class="flex items-center gap-1.5 text-[11px] text-slate-500">${icon("calendar-days", "h-3 w-3")}${esc(a.date)}</span></div>
            <h3 class="font-display text-base leading-snug font-semibold text-navy transition-colors group-hover:text-azure">${esc(a.title)}</h3>
            <p class="mt-2 flex-1 text-xs leading-relaxed text-slate-500">${esc(a.excerpt)}</p>
            <p class="mt-4 flex items-center gap-1.5 border-t border-navy/8 pt-3 text-[11px] text-slate-500">${icon("building-2", "h-3 w-3 shrink-0 text-azure")}${esc(a.unit)}</p>
          </div></div></div>`).join("")}</div>`);
    } else {
      mount(body, `<div class="tab-swap space-y-4">${D.procurement.map((p, i) => {
        const c = PROC_COLORS[p.type] || "#0b8199";
        return `<div data-reveal style="--ry:20px;--rd:${0.05 * i}s"><div class="rounded-2xl glass holo-border group cursor-pointer p-5 sm:p-6" data-tilt data-lift="3">
          <div class="flex items-start gap-4">
            <span class="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style="color:${c};border-color:${c}33;background:${c}0d">${icon("file-text", "h-5 w-5")}</span>
            <div class="min-w-0 flex-1">
              <div class="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                ${chip(p.type, c, "px-2.5 py-0.5 text-[10px] tracking-wide")}
                <span class="flex items-center gap-1 text-[11px] text-slate-500">${icon("calendar-days", "h-3 w-3")}ประกาศ ${esc(p.date)}</span>
                ${p.deadline ? `<span class="flex items-center gap-1 text-[11px] font-medium text-amber">${icon("clock", "h-3 w-3")}${esc(p.deadline)}</span>` : ""}
              </div>
              <h3 class="font-display text-sm leading-relaxed font-semibold text-navy transition-colors group-hover:text-azure sm:text-base">${esc(p.title)}</h3>
              ${p.budget ? `<p class="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">${icon("banknote", "h-3.5 w-3.5 text-mint")}วงเงินงบประมาณ <span class="font-display font-semibold text-navy">${esc(p.budget)}</span></p>` : ""}
            </div>
            <button class="glass hidden shrink-0 items-center gap-1.5 self-center rounded-xl px-3.5 py-2 text-xs font-medium text-azure transition-colors hover:text-navy sm:flex" aria-label="ดาวน์โหลดเอกสาร ${esc(p.title)}">${icon("download", "h-3.5 w-3.5")}เอกสาร</button>
          </div></div></div>`;
      }).join("")}</div>`);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Resources                                                           */
  /* ------------------------------------------------------------------ */
  const FORMAT = { PDF: ["file-text", "#c2410c"], XLSX: ["table-2", "#0f9a84"], CSV: ["table-2", "#0aa2c0"], GIS: ["map", "#6d28d9"] };
  const MEDIA_ICON = { video: "circle-play", infographic: "chart-pie", image: "image" };
  function renderResources(tab) {
    const body = $("#resources-body");
    if (tab === "data") {
      mount(body, `<div class="tab-swap space-y-3">${D.datasets.map((d, i) => {
        const [ic, c] = FORMAT[d.format] || ["file-text", "#0b8199"];
        return `<div class="rounded-2xl glass holo-border group flex items-center gap-4 p-4 sm:p-5" data-reveal style="--ry:18px;--rd:${0.05 * i}s">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border" style="color:${c};border-color:${c}33;background:${c}0d">${icon(ic, "h-5 w-5")}</span>
          <div class="min-w-0 flex-1"><h3 class="font-display truncate text-sm font-semibold text-navy sm:text-base">${esc(d.title)}</h3>
            <p class="mt-0.5 text-xs text-slate-500"><span class="font-display font-semibold" style="color:${c}">${d.format}</span> · ${esc(d.size)} · ${esc(t("sec.resources.updated"))} ${esc(d.updated)}</p></div>
          <a href="${d.url}" class="glass font-display flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-azure transition-colors hover:text-navy" aria-label="${esc(t("sec.resources.download"))} ${esc(d.title)}">${icon("download", "h-3.5 w-3.5")}<span class="hidden sm:inline">${esc(t("sec.resources.download"))}</span></a>
        </div>`;
      }).join("")}</div>`);
    } else {
      mount(body, `<div class="tab-swap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">${D.media.map((m, i) => `
        <div data-parallax="${i % 2 === 0 ? 20 : -14}"><div data-reveal style="--ry:22px;--rd:${0.07 * i}s" class="h-full">
          <div class="rounded-2xl glass holo-border group flex h-full cursor-pointer flex-col overflow-hidden" data-tilt data-lift="5">
            <div class="relative flex h-32 items-center justify-center overflow-hidden" style="background:${m.art}">
              <div class="grid-overlay absolute inset-0 opacity-40"></div>
              ${icon(MEDIA_ICON[m.type] || "image", "relative h-10 w-10 text-white/90 transition-transform group-hover:scale-110", 'stroke-width="1.4"')}
              ${m.duration ? `<span class="font-display absolute right-3 bottom-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">${m.duration}</span>` : ""}
            </div>
            <div class="flex flex-1 flex-col p-4"><h3 class="font-display flex-1 text-sm leading-snug font-semibold text-navy transition-colors group-hover:text-azure">${esc(m.title)}</h3>
              <p class="mt-2 text-[11px] text-slate-500">${esc(m.date)}</p></div>
          </div></div></div>`).join("")}</div>`);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Tourism map list + popups (3D map lives in scene-map.js)            */
  /* ------------------------------------------------------------------ */
  const mapState = { attraction: null, district: null, listeners: [] };
  mapState.emit = () => mapState.listeners.forEach((fn) => fn());
  mapState.setAttraction = (id) => { mapState.attraction = id; if (id) mapState.district = null; mapState.emit(); };
  mapState.setDistrict = (id) => { mapState.district = id; if (id) mapState.attraction = null; mapState.emit(); };
  window.RSP.map = mapState;
  window.RSP.districts = D.districts;
  window.RSP.attractions = D.attractions;

  function renderMapUI() {
    const list = $("#map-list"), popup = $("#map-popup");
    const draw = () => {
      list.innerHTML = D.attractions.map((a) => {
        const on = mapState.attraction === a.id, dim = mapState.attraction && !on;
        return `<button data-attr="${a.id}" class="group flex w-full items-center gap-4 py-3.5 text-left transition-opacity ${dim ? "opacity-50" : ""}">
          <span class="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all ${on ? "border-[#72e0d4]/70 ring-2 ring-[#72e0d4]/40" : "border-white/15"}">
            <img src="${a.photo}" alt="${esc(a.name)}" loading="lazy" class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" /></span>
          <span><span class="font-display block text-sm font-semibold text-white group-hover:text-[#a3efe6]">${esc(a.name)}</span>
            <span class="mt-0.5 block text-xs text-slate-400">${esc(a.district)}</span></span></button>`;
      }).join("");
      const a = D.attractions.find((x) => x.id === mapState.attraction);
      const d = D.districts.find((x) => x.id === mapState.district);
      if (a) {
        popup.innerHTML = `<div class="chat-in absolute right-5 bottom-5 z-20 w-52 overflow-hidden rounded-2xl border border-white/20 bg-[#04293a]/85 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur sm:w-64">
          <span class="relative block h-28 sm:h-36"><img src="${a.photo}" alt="${esc(a.name)}" class="absolute inset-0 h-full w-full object-cover" /></span>
          <span class="block px-4 py-3"><span class="font-display block text-sm font-semibold text-white">${esc(a.name)}</span><span class="mt-0.5 block text-[11px] text-slate-400">${esc(a.district)}</span></span></div>`;
      } else if (d) {
        popup.innerHTML = `<div class="chat-in absolute right-5 bottom-5 z-20 w-[calc(100%-2.5rem)] overflow-hidden rounded-2xl border border-white/20 bg-[#04293a]/90 p-5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur sm:w-80">
          <div class="flex items-start justify-between gap-3">
            <div><h4 class="font-display text-base font-bold text-white">${esc(d.name)}</h4><p class="mt-0.5 text-[11px] leading-relaxed text-[#a3efe6]">${esc(d.tagline)}</p></div>
            <button data-close class="shrink-0 rounded-lg border border-white/15 p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white" aria-label="ปิดรายละเอียดอำเภอ">${icon("x", "h-3.5 w-3.5")}</button>
          </div>
          <p class="mt-2.5 text-xs leading-relaxed text-slate-300/90">${esc(d.description)}</p>
          <div class="mt-3 flex flex-wrap gap-1.5">${d.highlights.map((h) => `<span class="flex items-center gap-1 rounded-full border border-[#ff7a5c]/35 bg-[#ff7a5c]/10 px-2.5 py-0.5 text-[10px] text-[#a3efe6]">${icon("sparkles", "h-2.5 w-2.5")}${esc(h)}</span>`).join("")}</div>
          <div class="mt-3.5 flex gap-5 border-t border-white/10 pt-3">${d.stats.map((s) => `<div><p class="font-display text-sm font-bold text-white">${esc(s.value)}</p><p class="text-[10px] text-slate-400">${esc(s.label)}</p></div>`).join("")}</div>
        </div>`;
      } else popup.innerHTML = "";
      refreshIcons();
    };
    list.addEventListener("click", (e) => {
      const b = e.target.closest("[data-attr]");
      if (b) mapState.setAttraction(mapState.attraction === b.dataset.attr ? null : b.dataset.attr);
    });
    popup.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) mapState.setDistrict(null); });
    mapState.listeners.push(draw);
    draw();
  }

  /* ------------------------------------------------------------------ */
  /* Explore                                                             */
  /* ------------------------------------------------------------------ */
  const EXPLORE_TABS = [
    { id: "stay", icon: "bed-double" }, { id: "eat", icon: "utensils-crossed" }, { id: "otop", icon: "shopping-bag" },
    { id: "culture", icon: "drama" }, { id: "goods", icon: "sparkles" },
  ];
  function exploreCards(tab) {
    const map = {
      stay: D.stay.map((e) => ({ art: e.art, artIcon: "bed-double", badge: e.type, title: e.name, lines: [["map-pin", e.area], ["star", `${fmt(e.rating, 1)} · ${e.priceRange}`]] })),
      eat: D.eat.map((e) => ({ art: e.art, artIcon: "utensils-crossed", badge: e.cuisine, badgeColor: "#c2410c", title: e.name, lines: [["map-pin", e.area], ["utensils-crossed", e.signature]] })),
      otop: D.otop.map((e) => ({ art: e.art, artIcon: "shopping-bag", badge: e.category, badgeColor: "#6d28d9", title: e.name, lines: [["shopping-bag", e.producer], [null, e.price]] })),
      culture: D.culture.map((e) => ({ art: e.art, artIcon: "drama", badge: e.type, badgeColor: "#e2674f", title: e.name, lines: [["drama", e.period], [null, e.description]] })),
      goods: D.goods.map((e) => ({ art: e.art, artIcon: "sparkles", badge: e.category, badgeColor: "#0f9a84", title: e.name, lines: [[null, e.description]] })),
    };
    return map[tab];
  }
  function renderExplore(tab) {
    mount($("#explore-body"), `<div class="tab-swap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">${exploreCards(tab).map((c, i) => `
      <div data-parallax="${i % 2 === 0 ? 22 : -14}"><div data-reveal style="--ry:24px;--rd:${0.07 * i}s" class="h-full">
        <div class="rounded-2xl glass holo-border group flex h-full cursor-pointer flex-col overflow-hidden" data-tilt data-lift="5">
          <div class="relative flex h-32 items-center justify-center overflow-hidden" style="background:${c.art}">
            <div class="grid-overlay absolute inset-0 opacity-40"></div>
            ${icon(c.artIcon, "relative h-12 w-12 text-white/55 transition-transform duration-300 group-hover:scale-110")}
            <span class="font-display absolute top-3.5 left-3.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white" style="background:${c.badgeColor || "#0b8199"}">${esc(c.badge)}</span>
            <span class="font-display absolute right-3 bottom-2.5 text-[9px] tracking-[0.2em] text-white/45 uppercase">${esc(t("util.sampleImage"))}</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <h3 class="font-display text-base leading-snug font-semibold text-navy transition-colors group-hover:text-azure">${esc(c.title)}</h3>
            <div class="mt-2.5 space-y-1.5">${c.lines.map(([ic, txt]) => `<p class="flex items-start gap-1.5 text-xs leading-relaxed text-slate-500">${ic ? icon(ic, "mt-0.5 h-3 w-3 shrink-0 text-azure") : ""}${esc(txt)}</p>`).join("")}</div>
          </div>
        </div></div></div>`).join("")}</div>`);
  }

  /* ------------------------------------------------------------------ */
  /* Services, economy, e-service                                        */
  /* ------------------------------------------------------------------ */
  const SERVICE_ICONS = { citizen: "user-check", business: "briefcase", tourism: "compass", government: "landmark", emergency: "siren", digital: "smartphone" };
  const ESERVICE_ICONS = { "es-1": "file-text", "es-2": "receipt", "es-3": "calendar-clock", "es-4": "message-square-warning", "es-5": "badge-check", "es-6": "building-2" };

  function renderServices() {
    mount($("#service-cards"), D.services.map((s, i) => `
      <div data-reveal style="--ry:24px;--rd:${(i % 6) * 0.06}s"><div class="rounded-2xl glass holo-border group h-full cursor-pointer p-5 text-center" data-tilt data-lift="5">
        <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110" style="border-color:${s.color}35;background:${s.color}10;color:${s.color}">${icon(SERVICE_ICONS[s.id], "h-5 w-5")}</span>
        <h3 class="font-display mt-3 text-sm font-bold text-navy">${esc(s.title)}</h3>
        <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">${esc(s.description)}</p>
      </div></div>`).join(""));

    mount($("#econ-cards"), D.econ.map((e, i) => `
      <div data-reveal style="--ry:20px;--rd:${0.07 * i}s"><div class="rounded-2xl glass holo-border h-full p-4" data-tilt>
        <p class="text-xs text-slate-500">${esc(e.label)}</p>
        <p class="font-display mt-1 text-xl font-bold text-gradient-holo">${esc(e.value)}</p>
        <p class="mt-0.5 text-[11px] text-azure/80">${esc(e.note)}</p>
      </div></div>`).join(""));

    mount($("#sector-bars"), D.sectors.slice(0, 4).map((s, i) => `
      <div class="glass rounded-2xl p-4" data-reveal data-share="${s.share}" style="--rx:-24px;--ry:0px;--rd:${0.07 * i}s">
        <div class="flex items-center justify-between gap-4"><p class="font-display text-sm font-semibold text-navy">${esc(s.title)}</p>
          <p class="font-display shrink-0 text-sm font-bold" style="color:${s.color}">${esc(s.value)}<span class="ml-2 text-xs font-medium text-mint">+${s.growth}%</span></p></div>
        <div class="mt-2.5 h-1.5 overflow-hidden rounded-full bg-navy/8"><div class="bar-fill h-full rounded-full" style="background:${s.color}"></div></div>
      </div>`).join(""));
    $$("#sector-bars [data-share]").forEach((el) => el.addEventListener("reveal", () => ($(".bar-fill", el).style.width = `${el.dataset.share}%`)));

    const shifts = [20, -12, 16];
    mount($("#eservice-cards"), D.eservices.map((s, i) => `
      <div data-parallax="${shifts[i % 3]}"><div data-reveal style="--ry:24px;--rd:${0.06 * i}s" class="h-full">
        <div class="rounded-2xl glass holo-border group h-full" data-tilt data-lift="5">
          <a href="${s.url}" class="flex h-full flex-col p-6">
            <div class="flex items-start justify-between">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110" style="color:${s.color};border-color:${s.color}35;background:${s.color}10">${icon(ESERVICE_ICONS[s.id], "h-5.5 w-5.5")}</span>
              ${icon("arrow-up-right", "h-4.5 w-4.5 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-azure")}
            </div>
            <h3 class="font-display mt-4 text-base font-bold text-navy transition-colors group-hover:text-azure">${esc(s.name)}</h3>
            <p class="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">${esc(s.description)}</p>
            <span class="font-display mt-4 text-xs font-semibold text-azure">${esc(t("sec.eservice.open"))} →</span>
          </a></div></div></div>`).join(""));
  }

  /* ------------------------------------------------------------------ */
  /* Poll                                                                */
  /* ------------------------------------------------------------------ */
  const POLL_KEY = `rsp-poll-${D.poll.id}`;
  let pollVote = D.poll.options.some((o) => o.id === store.get(POLL_KEY)) ? store.get(POLL_KEY) : null;
  function renderPoll(animate) {
    $("#poll-question").textContent = D.poll.question;
    const total = D.poll.options.reduce((s, o) => s + o.baseVotes, 0) + (pollVote ? 1 : 0);
    $("#poll-total").textContent = fmt(total);
    $("#poll-thanks").hidden = !pollVote;
    $("#poll-options").innerHTML = D.poll.options.map((o) => {
      const pct = Math.round(((o.baseVotes + (pollVote === o.id ? 1 : 0)) / total) * 100);
      const mine = pollVote === o.id;
      const state = pollVote ? "cursor-default border-navy/8" : "cursor-pointer border-navy/10 hover:border-azure/50 hover:shadow-[0_8px_24px_-12px_#0b819955]";
      return `<button data-opt="${o.id}" ${pollVote ? "disabled" : ""} aria-pressed="${mine}" class="relative w-full overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all ${state} ${mine ? "border-azure/60 ring-1 ring-azure/30" : ""}">
        ${pollVote ? `<span class="poll-bar absolute inset-y-0 left-0 ${mine ? "bg-azure/15" : "bg-navy/5"}" style="width:${animate ? 0 : pct}%;transition:width .9s cubic-bezier(.22,1,.36,1)" data-pct="${pct}"></span>` : ""}
        <span class="relative flex items-center justify-between gap-3">
          <span class="flex items-center gap-2.5">${mine ? icon("circle-check", "h-4.5 w-4.5 shrink-0 text-azure") : ""}<span class="font-display text-sm font-semibold sm:text-base ${mine ? "text-azure" : "text-navy"}">${esc(o.label)}</span></span>
          ${pollVote ? `<span class="font-display shrink-0 text-sm font-bold text-navy tabular-nums">${pct}%</span>` : ""}
        </span></button>`;
    }).join("");
    refreshIcons();
    if (animate) requestAnimationFrame(() => requestAnimationFrame(() => $$(".poll-bar").forEach((b) => (b.style.width = `${b.dataset.pct}%`))));
  }
  function initPoll() {
    $("#poll-options").addEventListener("click", (e) => {
      const b = e.target.closest("[data-opt]");
      if (!b || pollVote) return;
      pollVote = b.dataset.opt;
      store.set(POLL_KEY, pollVote);
      renderPoll(true);
    });
    renderPoll(false);
  }

  /* ------------------------------------------------------------------ */
  /* Agencies, news, contact                                             */
  /* ------------------------------------------------------------------ */
  function renderAgencies() {
    const item = (a, dup) => `<a href="${a.url}" target="_blank" rel="noopener noreferrer" ${dup ? 'aria-hidden="true" tabindex="-1"' : ""} class="glass group/item flex shrink-0 items-center gap-3.5 rounded-full py-2.5 pr-6 pl-2.5 transition-all hover:shadow-[0_8px_24px_-12px_#0b819955]">
      ${a.logo ? `<span class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-navy/10 bg-white p-1"><img src="${a.logo}" alt="โลโก้ ${esc(a.name)}" class="h-full w-full object-contain" /></span>`
        : `<span class="font-display flex h-12 w-12 items-center justify-center rounded-full bg-azure text-xs font-bold text-white">${esc(a.abbr)}</span>`}
      <span class="font-display text-base font-medium whitespace-nowrap text-slate-600 transition-colors group-hover/item:text-azure">${esc(a.name)}</span>
      ${icon("external-link", "h-3.5 w-3.5 text-slate-400 transition-colors group-hover/item:text-azure")}</a>`;
    $("#agency-track").innerHTML = D.agencies.map((a) => item(a, false)).join("") + D.agencies.map((a) => item(a, true)).join("");
  }

  const NEWS_ICONS = { "ข่าว": "newspaper", "ประกาศ": "megaphone", "กิจกรรม": "party-popper", "สมาร์ทซิตี้": "building-2" };
  const CONTACT_ICONS = ["phone", "mail", "map-pin", "globe"];
  function renderNews() {
    const shifts = [22, 0, -22];
    mount($("#news-cards"), D.news.slice(0, 3).map((n, i) => `
      <div data-parallax="${shifts[i]}"><div data-reveal style="--ry:28px;--rd:${0.08 * i}s" class="h-full">
        <div class="rounded-2xl glass holo-border group flex h-full cursor-pointer flex-col overflow-hidden" data-tilt data-lift="5">
          <div class="relative flex h-32 items-center justify-center overflow-hidden" style="background:${n.color}">
            <div class="grid-overlay absolute inset-0 opacity-30"></div>
            ${icon(NEWS_ICONS[n.category] || "newspaper", "relative h-12 w-12 text-white/60 transition-transform duration-300 group-hover:scale-110")}
            <span class="font-display absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold tracking-wider" style="color:${n.color}">${esc(n.category)}</span>
            <span class="font-display absolute right-3 bottom-2.5 text-[9px] tracking-[0.2em] text-white/50 uppercase">${esc(t("util.sampleImage"))}</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <p class="flex items-center gap-1.5 text-[11px] text-slate-500">${icon("calendar-days", "h-3 w-3")}${esc(n.date)}</p>
            <h3 class="font-display mt-2 text-base font-semibold leading-snug text-navy transition-colors group-hover:text-azure">${esc(n.title)}</h3>
            <p class="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">${esc(n.excerpt)}</p>
          </div>
        </div></div></div>`).join(""));
    $("#contact-list").innerHTML = D.contacts.map((c, i) => `
      <div class="flex items-start gap-3.5">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-azure/25 bg-azure/6 text-azure">${icon(CONTACT_ICONS[i], "h-4.5 w-4.5")}</span>
        <div><p class="text-xs text-slate-500">${esc(c.label)}</p><p class="font-display mt-0.5 text-sm font-semibold text-navy">${esc(c.value)}</p></div>
      </div>`).join("");
  }

  /* ------------------------------------------------------------------ */
  /* Site search (⌘K)                                                   */
  /* ------------------------------------------------------------------ */
  const searchIndex = [
    { id: "governor", title: D.governor.name, subtitle: D.governor.position, sectionId: "governor", cat: "nav.governor" },
    ...D.activities.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.date} · ${e.location}`, sectionId: "governor", cat: "nav.governor" })),
    ...D.events.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.day} มิ.ย. 2569 · ${e.location}`, sectionId: "calendar", cat: "nav.calendar" })),
    ...D.zones.map((e) => ({ id: e.id, title: e.name, subtitle: e.tagline, sectionId: "twin", cat: "nav.twin" })),
    ...D.stay.map((e) => ({ id: e.id, title: e.name, subtitle: `${e.type} · ${e.area}`, sectionId: "explore", cat: "sec.explore.tab.stay" })),
    ...D.eat.map((e) => ({ id: e.id, title: e.name, subtitle: `${e.cuisine} · ${e.area}`, sectionId: "explore", cat: "sec.explore.tab.eat" })),
    ...D.otop.map((e) => ({ id: e.id, title: e.name, subtitle: `${e.category} · ${e.producer}`, sectionId: "explore", cat: "sec.explore.tab.otop" })),
    ...D.culture.map((e) => ({ id: e.id, title: e.name, subtitle: e.period, sectionId: "explore", cat: "sec.explore.tab.culture" })),
    ...D.goods.map((e) => ({ id: e.id, title: e.name, subtitle: e.category, sectionId: "explore", cat: "sec.explore.tab.goods" })),
    ...D.services.map((e) => ({ id: e.id, title: e.title, subtitle: e.description, sectionId: "services", cat: "nav.services" })),
    ...D.eservices.map((e) => ({ id: e.id, title: e.name, subtitle: e.description, sectionId: "eservice", cat: "nav.eservice" })),
    ...D.pr.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.date} · ${e.unit}`, sectionId: "announcements", cat: "nav.announcements" })),
    ...D.procurement.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.type} · ${e.date}`, sectionId: "announcements", cat: "nav.announcements" })),
    ...D.datasets.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.format} · ${e.size}`, sectionId: "resources", cat: "nav.resources" })),
    ...D.media.map((e) => ({ id: e.id, title: e.title, subtitle: e.date, sectionId: "resources", cat: "nav.resources" })),
    ...D.news.map((e) => ({ id: e.id, title: e.title, subtitle: `${e.category} · ${e.date}`, sectionId: "news", cat: "nav.news" })),
    ...D.agencies.map((e) => ({ id: e.id, title: e.name, subtitle: e.abbr, sectionId: "agencies", cat: "nav.agencies" })),
  ];
  function initSearch() {
    const modal = $("#search-modal"), input = $("#search-input"), out = $("#search-results");
    let results = [], active = 0;
    const open = (v) => {
      modal.hidden = !v;
      if (v) { input.value = ""; draw(); setTimeout(() => input.focus(), 60); lenis && lenis.stop(); } else lenis && lenis.start();
    };
    const go = (r) => { open(false); requestAnimationFrame(() => scrollToSection(document.getElementById(r.sectionId))); };
    const draw = () => {
      const q = input.value.trim().toLowerCase();
      const words = q.split(/\s+/);
      results = q ? searchIndex.filter((r) => words.every((w) => `${r.title} ${r.subtitle || ""}`.toLowerCase().includes(w))).slice(0, 12) : [];
      active = Math.min(active, Math.max(results.length - 1, 0));
      out.innerHTML = !q ? `<p class="px-4 py-8 text-center text-sm text-slate-500">${esc(t("util.searchHint"))}</p>`
        : !results.length ? `<p class="px-4 py-8 text-center text-sm text-slate-500">${esc(t("util.noResult"))}</p>`
        : results.map((r, i) => `<button data-i="${i}" class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${i === active ? "bg-azure/10" : "hover:bg-navy/4"}">
            <div class="min-w-0 flex-1"><p class="font-display truncate text-sm font-semibold text-navy">${esc(r.title)}</p>${r.subtitle ? `<p class="mt-0.5 truncate text-xs text-slate-500">${esc(r.subtitle)}</p>` : ""}</div>
            <span class="font-display shrink-0 rounded-full bg-azure/10 px-2.5 py-1 text-[10px] font-semibold text-azure">${esc(t(r.cat))}</span>
            ${i === active ? icon("corner-down-left", "h-3.5 w-3.5 shrink-0 text-slate-400") : ""}</button>`).join("");
      refreshIcons();
    };
    $("#search-open").addEventListener("click", () => open(true));
    $("#search-close").addEventListener("click", () => open(false));
    modal.addEventListener("click", (e) => { if (e.target === modal) open(false); });
    input.addEventListener("input", () => { active = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(active + 1, results.length - 1); draw(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(active - 1, 0); draw(); }
      else if (e.key === "Enter" && results[active]) go(results[active]);
    });
    out.addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) go(results[+b.dataset.i]); });
    out.addEventListener("mouseover", (e) => {
      const b = e.target.closest("[data-i]");
      if (b && +b.dataset.i !== active) { active = +b.dataset.i; draw(); }
    });
    addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(true); }
      if (e.key === "Escape") open(false);
    });
  }

  /* ------------------------------------------------------------------ */
  /* AI assistant (scripted replies)                                     */
  /* ------------------------------------------------------------------ */
  const CHAT_SUGGESTIONS = ["ไปเกาะเสม็ดยังไง?", "ขอใบอนุญาตธุรกิจ", "คุณภาพอากาศวันนี้", "สิทธิประโยชน์การลงทุน EEC"];
  const CHAT_FALLBACK = "ขออภัยครับ ระบบยังไม่มีข้อมูลในเรื่องดังกล่าว\n\nท่านสามารถสอบถามได้ในหัวข้อ: การท่องเที่ยว · บริการภาครัฐ · การลงทุน EEC · คุณภาพอากาศ · การเดินทาง หรือวิสัยทัศน์ 2035\n\nหรือติดต่อสายด่วนจังหวัด โทร 1567 ตลอด 24 ชั่วโมงครับ";
  function initChat() {
    const fab = $("#chat-fab"), panel = $("#chat-panel"), log = $("#chat-log"), input = $("#chat-input"), send = $("#chat-send");
    const msgs = [{ role: "ai", text: "สวัสดีครับ ผมคือผู้ช่วยอัจฉริยะประจำจังหวัดระยอง\nยินดีให้บริการข้อมูลด้านบริการภาครัฐ การท่องเที่ยว การลงทุน และข้อมูลเมืองอัจฉริยะ\nกรุณาพิมพ์คำถามที่ต้องการสอบถามได้เลยครับ" }];
    let typing = false;
    const draw = () => {
      log.innerHTML = msgs.map((m) => `<div class="msg-in flex ${m.role === "user" ? "justify-end" : "justify-start"}">
        <div class="max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${m.role === "user" ? "rounded-br-md bg-azure text-white" : "rounded-bl-md border border-navy/10 bg-navy/5 text-slate-700"}">${esc(m.text)}</div></div>`).join("") +
        (typing ? `<div class="flex justify-start"><div class="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-navy/10 bg-navy/5 px-4 py-3">${[0, 1, 2].map((i) => `<span class="typing-dot h-1.5 w-1.5 rounded-full bg-cyan" style="animation-delay:${0.2 * i}s"></span>`).join("")}</div></div>` : "");
      log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
    };
    const reply = (q) => {
      const s = q.toLowerCase();
      const hit = D.chatReplies.find((r) => r.keywords.some((k) => s.includes(k)));
      return hit ? hit.reply : CHAT_FALLBACK;
    };
    const ask = (text) => {
      const q = text.trim();
      if (!q || typing) return;
      msgs.push({ role: "user", text: q });
      input.value = ""; send.disabled = true; typing = true; draw();
      setTimeout(() => { msgs.push({ role: "ai", text: reply(q) }); typing = false; draw(); }, 900 + 600 * Math.random());
    };
    $("#chat-suggestions").innerHTML = CHAT_SUGGESTIONS.map((s) => `<button type="button" class="font-display shrink-0 rounded-full border border-cyan/25 bg-cyan/5 px-3 py-1.5 text-[11px] text-cyan transition-colors hover:bg-cyan/15">${esc(s)}</button>`).join("");
    $("#chat-suggestions").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) ask(b.textContent); });
    input.addEventListener("input", () => (send.disabled = !input.value.trim()));
    $("#chat-form").addEventListener("submit", (e) => { e.preventDefault(); ask(input.value); });
    fab.addEventListener("click", () => {
      const open = panel.hidden;
      panel.hidden = !open;
      $("#chat-fab-icon").innerHTML = icon(open ? "x" : "bot", "h-6 w-6 text-white");
      refreshIcons();
      if (open) draw();
    });
    // Keep wheel scrolling inside the panel instead of the page
    panel.setAttribute("data-lenis-prevent", "");
    $("#search-results").setAttribute("data-lenis-prevent", "");
    $("#mobile-menu").setAttribute("data-lenis-prevent", "");
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function boot() {
    applyFont();
    initOrbs();
    initWaveDividers();
    initSeaBackground();
    initSeabed();
    renderNav();
    renderSectionHeads();
    initHeader();
    initHero();
    renderAbout();
    renderGovernor();
    renderTwinUI();
    renderLiveData();
    initCalendar();

    let announceTab = "pr", resourceTab = "data", exploreTab = "stay";
    const drawTabs = () => {
      tabs($('[data-tabs="announce"]'), [
        { id: "pr", icon: "megaphone", label: () => "ข่าวประชาสัมพันธ์" },
        { id: "procurement", icon: "gavel", label: () => "ข่าวประกวดราคา" },
      ], announceTab, (id) => renderAnnouncements((announceTab = id)));
      tabs($('[data-tabs="resources"]'), [
        { id: "data", icon: "database", label: () => t("sec.resources.tab.data") },
        { id: "media", icon: "clapperboard", label: () => t("sec.resources.tab.media") },
      ], resourceTab, (id) => renderResources((resourceTab = id)));
      tabs($('[data-tabs="explore"]'), EXPLORE_TABS.map((x) => ({ ...x, pad: "px-4", label: () => t(`sec.explore.tab.${x.id}`) })),
        exploreTab, (id) => renderExplore((exploreTab = id)));
    };
    drawTabs();
    renderAnnouncements(announceTab);
    renderResources(resourceTab);
    renderMapUI();
    renderExplore(exploreTab);
    renderServices();
    initPoll();
    renderAgencies();
    renderNews();
    initSearch();
    initChat();
    langListeners.push(() => { drawTabs(); renderResources(resourceTab); renderExplore(exploreTab); renderServices(); renderNews(); });

    applyLang();
    observeReveals();
    bindTilt();
    initSmoothScroll();
    requestAnimationFrame(scrollFrame);
  }

  boot();
})();
