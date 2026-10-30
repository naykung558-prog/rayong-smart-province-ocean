// 3D Digital Twin — six smart zones on a holographic city grid
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const { twin, zones, seeded } = window.RSP;
const stage = document.getElementById("twin-stage");
const SPREAD = 1.6; // zone positions are scaled out from the data coordinates

/* ---------- materials ---------- */
function zoneMaterial(color, zoneColor, extra = {}) {
  const m = new THREE.MeshStandardMaterial({ color, metalness: 0.15, roughness: 0.7, ...extra });
  m.userData.zoneColor = zoneColor;
  return m;
}
function mesh(geo, mat, pos = [0, 0, 0], rot, scale) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  if (rot) m.rotation.set(...rot);
  if (scale) m.scale.set(...scale);
  return m;
}

/* ---------- landmark models (one per zone) ---------- */
const LANDMARKS = {
  tower(c, anim) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(1.5, 0.3, 1.5), zoneMaterial("#e8eef4", c), [0, 0.15, 0]));
    g.add(mesh(new THREE.BoxGeometry(1.05, 0.26, 1.05), zoneMaterial("#d4e0ec", c), [0, 0.42, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.24, 0.34, 2.2, 8), zoneMaterial("#f4f8fb", c, { metalness: 0.35, roughness: 0.4 }), [0, 1.6, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.58, 0.46, 0.3, 8), zoneMaterial("#9fc6e8", c, { metalness: 0.5, roughness: 0.25 }), [0, 2.82, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.4, 0.52, 0.16, 8), zoneMaterial("#e8eef4", c), [0, 3.05, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.75, 6), zoneMaterial("#c2cdd8", c, { metalness: 0.6, roughness: 0.3 }), [0, 3.5, 0]));
    g.add(mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: "#ff5a5a" }), [0, 3.9, 0]));
    return g;
  },
  island(c, anim) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(1.55, 1.7, 0.1, 24), zoneMaterial("#f3e9cd", c, { roughness: 0.9 }), [0, 0.05, 0]));
    g.add(mesh(new THREE.ConeGeometry(1, 0.9, 10), zoneMaterial("#5cb586", c, { roughness: 0.85 }), [-0.45, 0.45, 0.1]));
    g.add(mesh(new THREE.ConeGeometry(0.6, 0.55, 8), zoneMaterial("#6cc394", c, { roughness: 0.85 }), [0.35, 0.32, 0.55]));
    const lh = new THREE.Group();
    lh.position.set(0.7, 0, -0.55);
    lh.add(mesh(new THREE.CylinderGeometry(0.13, 0.2, 1.6, 10), zoneMaterial("#ffffff", c), [0, 0.8, 0]));
    lh.add(mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.22, 10), zoneMaterial("#e05252", c), [0, 1.7, 0]));
    const lamp = mesh(new THREE.SphereGeometry(0.11, 8, 8), new THREE.MeshBasicMaterial({ color: "#ffe066", transparent: true, opacity: 0.8 }), [0, 1.62, 0]);
    lh.add(lamp);
    lh.add(mesh(new THREE.ConeGeometry(0.18, 0.18, 10), zoneMaterial("#e05252", c), [0, 1.88, 0]));
    g.add(lh);
    [[-0.55, 0.18, 0.45], [-0.95, 0.14, -0.15], [0.1, 0.16, 0.8]].forEach(([x, , z], i) => {
      const palm = new THREE.Group();
      palm.position.set(x, 0, z);
      palm.rotation.set(0, 1.7 * i, 0.12);
      palm.add(mesh(new THREE.CylinderGeometry(0.035, 0.055, 0.85, 6), zoneMaterial("#9c7a52", c, { roughness: 0.9 }), [0, 0.42, 0]));
      palm.add(mesh(new THREE.ConeGeometry(0.3, 0.26, 6), zoneMaterial("#3f9e6e", c, { roughness: 0.85 }), [0.04, 0.88, 0]));
      g.add(palm);
    });
    anim.push((t) => (lamp.material.opacity = 0.55 + 0.45 * Math.sin(2.4 * t)));
    return g;
  },
  station(c, anim) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(2.6, 0.2, 1.3), zoneMaterial("#dfe7ee", c), [0, 0.1, 0]));
    for (const x of [-1.05, 1.05]) for (const z of [-0.45, 0.45])
      g.add(mesh(new THREE.BoxGeometry(0.08, 0.95, 0.08), zoneMaterial("#aebfce", c, { metalness: 0.4, roughness: 0.4 }), [x, 0.65, z]));
    g.add(mesh(new THREE.CylinderGeometry(0.78, 0.78, 2.7, 16, 1, true, 0, Math.PI),
      zoneMaterial("#bcd9ee", c, { metalness: 0.55, roughness: 0.25, side: THREE.DoubleSide }), [0, 1.12, 0], [0, 0, Math.PI / 2]));
    const train = new THREE.Group();
    train.position.set(0, 0.42, 0.32);
    train.add(mesh(new THREE.BoxGeometry(1.5, 0.32, 0.3), zoneMaterial("#f7fafc", c, { metalness: 0.5, roughness: 0.3 })));
    train.add(mesh(new THREE.SphereGeometry(0.15, 10, 10), zoneMaterial("#f7fafc", c, { metalness: 0.5, roughness: 0.3 }), [0.78, -0.02, 0], null, [1.6, 0.85, 1]));
    train.add(mesh(new THREE.BoxGeometry(1.5, 0.07, 0.012), new THREE.MeshBasicMaterial({ color: "#2fd2c0" }), [0, -0.05, 0.155]));
    g.add(train);
    anim.push((t) => (train.position.x = 0.9 * Math.sin(0.45 * t)));
    return g;
  },
  port(c) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(2.6, 0.1, 2), zoneMaterial("#cdd6de", c, { roughness: 0.85 }), [0, 0.05, 0]));
    [[-0.85, 0.45], [-0.25, 0.6]].forEach(([x, z]) =>
      g.add(mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.64, 14), zoneMaterial("#f0f4f7", c, { metalness: 0.3, roughness: 0.45 }), [x, 0.42, z])));
    const stack = new THREE.Group();
    stack.position.set(-0.7, 0, -0.55);
    stack.add(mesh(new THREE.CylinderGeometry(0.09, 0.14, 1.7, 10), zoneMaterial("#e8edf1", c), [0, 0.85, 0]));
    stack.add(mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.18, 10), zoneMaterial("#e05252", c), [0, 1.62, 0]));
    g.add(stack);
    const crane = new THREE.Group();
    crane.position.set(0.75, 0, -0.2);
    const yellow = () => zoneMaterial("#e8b23a", c, { metalness: 0.3, roughness: 0.5 });
    crane.add(mesh(new THREE.BoxGeometry(0.12, 1.4, 0.12), yellow(), [0, 0.7, 0]));
    crane.add(mesh(new THREE.BoxGeometry(1.3, 0.09, 0.09), yellow(), [0.5, 1.36, 0]));
    crane.add(mesh(new THREE.BoxGeometry(0.018, 0.75, 0.018), zoneMaterial("#8a939b", c), [1, 0.95, 0]));
    crane.add(mesh(new THREE.BoxGeometry(0.22, 0.14, 0.16), zoneMaterial("#e05252", c), [1, 0.52, 0]));
    g.add(crane);
    [["#ff7a5c", 0.45, 0.075, 0.6], ["#5cb586", 0.45, 0.225, 0.6], ["#e8b23a", 0.85, 0.075, 0.62]].forEach(([col, x, y, z]) =>
      g.add(mesh(new THREE.BoxGeometry(0.42, 0.15, 0.2), zoneMaterial(col, c, { roughness: 0.6 }), [x, y + 0.1, z])));
    return g;
  },
  chedi(c) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.04, 28), new THREE.MeshStandardMaterial({ color: "#8fcbe8", metalness: 0.3, roughness: 0.2, transparent: true, opacity: 0.85 }), [0, 0.02, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.85, 1, 0.16, 20), zoneMaterial("#cfe3c8", c, { roughness: 0.9 }), [0, 0.1, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.55, 0.62, 0.2, 12), zoneMaterial("#ffffff", c), [0, 0.27, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.18, 12), zoneMaterial("#f6f3ea", c), [0, 0.45, 0]));
    g.add(mesh(new THREE.SphereGeometry(0.32, 14, 14), zoneMaterial("#ffffff", c, { roughness: 0.5 }), [0, 0.78, 0], null, [1, 1.25, 1]));
    g.add(mesh(new THREE.CylinderGeometry(0.13, 0.18, 0.16, 10), zoneMaterial("#f0e6c8", c), [0, 1.18, 0]));
    g.add(mesh(new THREE.ConeGeometry(0.13, 0.6, 10), zoneMaterial("#e8c44a", c, { metalness: 0.65, roughness: 0.25 }), [0, 1.55, 0]));
    g.add(mesh(new THREE.SphereGeometry(0.04, 8, 8), zoneMaterial("#e8c44a", c, { metalness: 0.7, roughness: 0.2 }), [0, 1.92, 0]));
    [0.8, 2.4, 4, 5.2].forEach((a, i) =>
      g.add(mesh(new THREE.SphereGeometry(0.16 + (i % 2) * 0.05, 8, 8), zoneMaterial("#4a9e72", c, { roughness: 0.9 }), [1.35 * Math.cos(a), 0.16, 1.35 * Math.sin(a)])));
    return g;
  },
  shrine(c) {
    const g = new THREE.Group();
    g.add(mesh(new THREE.BoxGeometry(1.7, 0.16, 1.7), zoneMaterial("#e9e2d4", c, { roughness: 0.85 }), [0, 0.08, 0]));
    for (const x of [-0.42, 0.42]) for (const z of [-0.42, 0.42])
      g.add(mesh(new THREE.BoxGeometry(0.09, 0.7, 0.09), zoneMaterial("#f4efe2", c), [x, 0.5, z]));
    g.add(mesh(new THREE.ConeGeometry(0.92, 0.42, 4), zoneMaterial("#c8482e", c, { roughness: 0.6 }), [0, 0.98, 0], [0, Math.PI / 4, 0]));
    g.add(mesh(new THREE.ConeGeometry(0.6, 0.36, 4), zoneMaterial("#d85a3a", c, { roughness: 0.6 }), [0, 1.3, 0], [0, Math.PI / 4, 0]));
    g.add(mesh(new THREE.ConeGeometry(0.09, 0.5, 8), zoneMaterial("#e8c44a", c, { metalness: 0.65, roughness: 0.25 }), [0, 1.72, 0]));
    g.add(mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.52, 8), zoneMaterial("#e8c44a", c, { metalness: 0.5, roughness: 0.35 }), [0, 0.42, 0]));
    [[-1, 0.7, 0.5], [0.95, -0.65, -0.4]].forEach(([x, z, r]) => {
      const hut = new THREE.Group();
      hut.position.set(x, 0, z);
      hut.rotation.y = r;
      hut.add(mesh(new THREE.BoxGeometry(0.5, 0.32, 0.38), zoneMaterial("#b08968", c, { roughness: 0.85 }), [0, 0.26, 0]));
      hut.add(mesh(new THREE.ConeGeometry(0.38, 0.26, 4), zoneMaterial("#8c5e3c", c, { roughness: 0.8 }), [0, 0.52, 0], [0, Math.PI / 4, 0]));
      g.add(hut);
    });
    return g;
  },
};

/* ---------- lit-window texture for buildings ---------- */
function windowTexture(color = "#a8f5ea", density = 0.5) {
  const cv = document.createElement("canvas");
  cv.width = 64; cv.height = 128;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#04101e";
  ctx.fillRect(0, 0, 64, 128);
  const rnd = seeded(42);
  for (let y = 4; y < 124; y += 8) for (let x = 4; x < 60; x += 8) {
    if (rnd() < density) {
      ctx.fillStyle = rnd() < 0.85 ? color : "#f9b233";
      ctx.globalAlpha = 0.35 + 0.65 * rnd();
      ctx.fillRect(x, y, 4, 5);
    }
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildingLayout(seed, count, radius, avoid) {
  const rnd = seeded(seed);
  const out = [];
  let tries = 0;
  while (out.length < count && tries < 540) {
    tries++;
    const x = (rnd() - 0.5) * 4, z = (rnd() - 0.5) * 4;
    if (avoid && Math.hypot(x - avoid.x, z - avoid.z) < avoid.r) continue;
    const centrality = 1 - Math.min(Math.hypot(x, z) / (0.7 * radius), 1);
    const h = 0.4 + 1.5 * rnd() * (0.25 + 0.95 * centrality);
    out.push({ x, z, w: 0.35 + 0.55 * rnd(), d: 0.35 + 0.55 * rnd(), h, tone: 0.5 + 0.5 * rnd() });
  }
  return out;
}

/* ---------- labels (DOM overlay that follows 3D points) ---------- */
function label(zone) {
  const wrap = document.createElement("div");
  wrap.className = "html-label";
  wrap.style.zIndex = 20;
  wrap.innerHTML = `<div><button class="group flex cursor-pointer flex-col items-center gap-1" aria-label="สำรวจโซน ${zone.name}">
    <span class="relative flex h-5 w-5 items-center justify-center rounded-full" style="background:${zone.color}33">
      <span class="absolute inset-0 rounded-full animate-pulse-ring" style="border:1.5px solid ${zone.color}"></span>
      <span class="h-2 w-2 rounded-full" style="background:${zone.color}"></span></span>
    <span class="lbl font-display rounded-md px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap backdrop-blur transition-all opacity-80 group-hover:opacity-100" style="color:${zone.color};background:rgba(6,58,72,0.92);border:1px solid ${zone.color}55">${zone.name}</span>
  </button></div>`;
  wrap.querySelector("button").addEventListener("click", () => twin.select(twin.selected === zone.id ? null : zone.id));
  return wrap;
}

function init() {
  stage.querySelector(".twin-loading")?.remove();
  const renderer = new THREE.WebGLRenderer({ antialias: devicePixelRatio < 1.5, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  stage.appendChild(renderer.domElement);
  renderer.domElement.style.display = "block";

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0c4e60");
  scene.fog = new THREE.Fog("#0c4e60", 26, 60);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(11, 9, 11);

  scene.add(new THREE.AmbientLight("#d9fbf6", 1));
  const sun = new THREE.DirectionalLight("#ffffff", 1.3);
  sun.position.set(8, 12, 6);
  scene.add(sun);
  const glow = new THREE.PointLight("#2fd2c0", 0.8, 30, 2);
  glow.position.set(0, 8, 0);
  scene.add(glow);

  const anim = [];

  // Open sea: a segmented plane whose vertices roll with layered sine swells.
  // The swell runs in the vertex shader so the CPU does no per-vertex work.
  const seaGeo = new THREE.PlaneGeometry(70, 70, 90, 90);
  seaGeo.rotateX(-Math.PI / 2);
  const seaMat = new THREE.MeshStandardMaterial({ color: "#0f7186", metalness: 0.35, roughness: 0.3, flatShading: true });
  const seaTime = { value: 0 };
  seaMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = seaTime;
    shader.vertexShader = "uniform float uTime;\n" + shader.vertexShader.replace("#include <begin_vertex>",
      "vec3 transformed = vec3(position);\n" +
      "transformed.y = 0.16 * sin(0.45 * position.x + 1.1 * uTime) + 0.12 * sin(0.6 * position.z - 0.8 * uTime) + 0.05 * sin(1.7 * (position.x + position.z) + 2.0 * uTime);");
  };
  const sea = new THREE.Mesh(seaGeo, seaMat);
  sea.position.y = -0.52; // swell peaks stay below the lagoon rim
  scene.add(sea);

  // Sand island the city stands on, a shallow lagoon rim, and a faint survey grid
  scene.add(mesh(new THREE.CylinderGeometry(12.3, 13.4, 0.8, 72), new THREE.MeshStandardMaterial({ color: "#5fc4b8", roughness: 0.5 }), [0, -0.46, 0]));
  scene.add(mesh(new THREE.CylinderGeometry(11.4, 12.1, 0.8, 72), new THREE.MeshStandardMaterial({ color: "#e6d6b4", roughness: 0.95 }), [0, -0.4, 0]));
  const grid = new THREE.GridHelper(22, 34, "#2a9d9b", "#c4b48f");
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  scene.add(grid);
  const foam = mesh(new THREE.RingGeometry(12.1, 12.6, 96), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.55 }), [0, -0.05, 0], [-Math.PI / 2, 0, 0]);
  scene.add(foam);

  // Sailing boats circling the island
  const boats = [0, 1, 2, 3].map((i) => {
    const b = new THREE.Group();
    b.add(mesh(new THREE.BoxGeometry(0.9, 0.18, 0.32), new THREE.MeshStandardMaterial({ color: i % 2 ? "#e8573c" : "#ffffff", roughness: 0.6 }), [0, 0.09, 0]));
    b.add(mesh(new THREE.ConeGeometry(0.32, 0.9, 3), new THREE.MeshStandardMaterial({ color: "#fdf8ec", roughness: 0.8 }), [0.05, 0.62, 0], [0, Math.PI / 2, 0], [0.25, 1, 1]));
    scene.add(b);
    return { b, r: 15 + 2.5 * i, speed: 0.05 + 0.02 * i, phase: i * 1.7 };
  });
  anim.push((t) => {
    seaTime.value = t;
    foam.material.opacity = 0.4 + 0.2 * Math.sin(1.4 * t);
    boats.forEach((o) => {
      const a = o.phase + o.speed * t;
      o.b.position.set(Math.cos(a) * o.r, -0.42 + 0.06 * Math.sin(2 * t + o.phase), Math.sin(a) * o.r);
      o.b.rotation.set(0.05 * Math.sin(1.6 * t + o.phase), -a, 0);
    });
  });

  // Data arcs linking neighbouring zones, with a travelling pulse
  const rnd = seeded(8);
  const arcs = zones.map((z, i) => {
    const n = zones[(i + 1) % zones.length];
    const a = new THREE.Vector3(SPREAD * z.position[0], z.position[1] + 1.6, SPREAD * z.position[2]);
    const b = new THREE.Vector3(SPREAD * n.position[0], n.position[1] + 1.6, SPREAD * n.position[2]);
    const mid = a.clone().lerp(b, 0.5);
    mid.y += 2.4 + 1.5 * rnd();
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(36)), new THREE.LineBasicMaterial({ color: z.color, transparent: true, opacity: 0.22 })));
    const dot = mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: z.color }));
    scene.add(dot);
    return { curve, dot };
  });

  const winTex = windowTexture("#a8f5ea", 0.5);
  const zoneObjs = zones.map((z, idx) => {
    const cx = SPREAD * z.position[0], cz = SPREAD * z.position[2];
    const layout = buildingLayout(17 * idx + 3, 18, 4, { x: 0, z: 0, r: 1.95 });
    const mat = new THREE.MeshStandardMaterial({ color: "#4b98a2", emissive: "#a8f5ea", emissiveMap: winTex, emissiveIntensity: 0.45, metalness: 0.4, roughness: 0.55, transparent: true, opacity: 0.92 });
    const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(), mat, layout.length);
    const m4 = new THREE.Object3D();
    layout.forEach((b, i) => {
      m4.position.set(b.x + cx, b.h / 2, b.z + cz);
      m4.scale.set(0.8 * b.w, b.h, 0.8 * b.d);
      m4.updateMatrix();
      inst.setMatrixAt(i, m4.matrix);
    });
    scene.add(inst);

    const lm = LANDMARKS[z.landmark](z.color, anim);
    lm.position.set(cx, 0, cz);
    scene.add(lm);
    const lmMats = [];
    lm.traverse((o) => { if (o.material && o.material.userData.zoneColor) lmMats.push(o.material); });

    const ring = mesh(new THREE.RingGeometry(2.7, 2.85, 48), new THREE.MeshBasicMaterial({ color: z.color, transparent: true, opacity: 0.2, side: THREE.DoubleSide }), [cx, 0.03, cz], [-Math.PI / 2, 0, 0]);
    scene.add(ring);

    const anchor = new THREE.Vector3(cx, z.position[1] + 2.2, cz);
    const el = label(z);
    stage.appendChild(el);
    return { z, mat, lmMats, ring, anchor, el };
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minDistance = 8;
  controls.maxDistance = 24;
  controls.maxPolarAngle = Math.PI / 2.3;
  controls.minPolarAngle = Math.PI / 6;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6;

  function applySelection(id) {
    controls.autoRotate = !id;
    zoneObjs.forEach((o) => {
      const on = o.z.id === id;
      o.mat.color.set(on ? o.z.color : "#4b98a2");
      o.mat.emissive.set(on ? o.z.color : "#a8f5ea");
      o.mat.emissiveIntensity = on ? 0.7 : 0.45;
      o.mat.opacity = on ? 1 : 0.92;
      o.lmMats.forEach((m) => { m.emissive.set(on ? o.z.color : "#000000"); m.emissiveIntensity = on ? 0.3 : 0; });
      const lbl = o.el.querySelector(".lbl");
      lbl.classList.toggle("scale-110", on);
      lbl.classList.toggle("opacity-80", !on);
    });
  }
  twin.listeners.push(applySelection);
  applySelection(twin.selected);

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "250px" }).observe(stage);

  const clock = new THREE.Clock();
  const v = new THREE.Vector3();
  const fovScale = () => 1 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
  // Falls back to 1x resolution when the GPU cannot keep up (slow frames pile up)
  let slowFrames = 0, lastFrame = 0;
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) { clock.getDelta(); return; }
    const t = clock.getElapsedTime();
    controls.update();
    anim.forEach((fn) => fn(t));
    arcs.forEach((a, i) => a.dot.position.copy(a.curve.getPoint((0.25 * t + 0.17 * i) % 1)));
    zoneObjs.forEach((o) => {
      o.ring.rotation.z = 0.4 * t;
      o.ring.material.opacity = twin.selected === o.z.id ? 0.55 + 0.2 * Math.sin(3 * t) : 0.18;
    });
    renderer.render(scene, camera);
    const now = performance.now();
    slowFrames = now - lastFrame > 22 ? slowFrames + 1 : Math.max(slowFrames - 1, 0);
    lastFrame = now;
    if (slowFrames > 40 && renderer.getPixelRatio() > 1) renderer.setPixelRatio(1);

    // Position labels like drei <Html distanceFactor={14}>
    const w = stage.clientWidth, h = stage.clientHeight;
    zoneObjs.forEach((o) => {
      v.copy(o.anchor).project(camera);
      const dist = o.anchor.distanceTo(camera.position);
      const s = (fovScale() / dist) * 14;
      o.el.style.transform = `translate3d(${((v.x + 1) / 2) * w}px,${((1 - v.y) / 2) * h}px,0) scale(${s})`;
      o.el.style.zIndex = Math.round(100 - dist);
      o.el.style.display = v.z > 1 ? "none" : "";
    });
  })();
}

try { init(); } catch (err) {
  console.error("Digital twin failed to start", err);
}
