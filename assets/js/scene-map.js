// 3D tourism map — textured relief slab of Rayong with district pins
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const { map: state, districts, attractions } = window.RSP;
const stage = document.getElementById("map-stage");
const MAP_W = 9, MAP_D = 5.06;

// Percent coordinates on the map image -> scene position on the slab top
const toScene = (x, y) => new THREE.Vector3(((x - 50) / 100) * MAP_W, 0.16, ((y - 50) / 100) * MAP_D);

const PIN_SVG = (cls, fill) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${cls}"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

function districtLabel(d) {
  const el = document.createElement("div");
  el.className = "html-label";
  el.innerHTML = `<div><button class="group relative flex -translate-y-1/2 cursor-pointer flex-col items-center" aria-label="ดูรายละเอียด ${d.name}"></button></div>`;
  const btn = el.querySelector("button");
  btn.addEventListener("click", () => state.setDistrict(state.district === d.id ? null : d.id));
  const draw = () => {
    const on = state.district === d.id;
    btn.innerHTML =
      (on ? `<span class="absolute -top-2 h-9 w-9 rounded-full border-2 border-[#72e0d4]/70 animate-pulse-ring"></span>` : "") +
      PIN_SVG(`drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)] transition-all ${on ? "h-7 w-7 text-[#a3efe6]" : "h-5 w-5 text-[#ff9479] group-hover:scale-125"}`, on ? "#ff7a5c" : "#e8573c") +
      `<span class="font-display mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap backdrop-blur transition-colors ${on ? "bg-[#ff7a5c] font-bold text-white shadow-lg" : "bg-[#04293a]/85 text-white group-hover:bg-[#0b8199]/90"}">${d.name}</span>`;
  };
  draw();
  return { el, draw, anchor: toScene(d.x, d.y), z: 20 };
}

function attractionLabel() {
  const el = document.createElement("div");
  el.className = "html-label";
  el.style.pointerEvents = "none";
  return { el, anchor: new THREE.Vector3(), z: 30 };
}

function init() {
  stage.querySelector(".map-loading")?.remove();
  const renderer = new THREE.WebGLRenderer({ antialias: devicePixelRatio < 1.5, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.display = "block";
  stage.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 6.2, 6.8);

  scene.add(new THREE.AmbientLight("#ffffff", 1.1));
  const key = new THREE.DirectionalLight("#fff6e6", 1.4);
  key.position.set(5, 9, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#bcd8f0", 0.4);
  fill.position.set(-6, 5, -3);
  scene.add(fill);

  const tex = new THREE.TextureLoader().load("assets/images/rayong-map-3d.jpg");
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const group = new THREE.Group();
  const side = (c, r = 0.9) => new THREE.MeshStandardMaterial({ color: c, roughness: r });
  // Box faces: +x, -x, +y (top, textured), -y, +z, -z
  const slab = new THREE.Mesh(new THREE.BoxGeometry(MAP_W, 0.28, MAP_D), [
    side("#8a7a5c"), side("#8a7a5c"),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, metalness: 0.02 }),
    side("#6b5d44", 0.95), side("#94846a"), side("#94846a"),
  ]);
  group.add(slab);
  // The slab floats on a gently rolling sea (lives outside the bobbing group)
  const seaGeo = new THREE.PlaneGeometry(40, 30, 80, 60);
  seaGeo.rotateX(-Math.PI / 2);
  const seaMat = new THREE.MeshStandardMaterial({ color: "#1b8fa3", metalness: 0.3, roughness: 0.35, flatShading: true, transparent: true, opacity: 0.9 });
  const seaTime = { value: 0 };
  seaMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = seaTime;
    shader.vertexShader = "uniform float uTime;\n" + shader.vertexShader.replace("#include <begin_vertex>",
      "vec3 transformed = vec3(position);\n" +
      "transformed.y = 0.07 * sin(0.9 * position.x + 1.2 * uTime) + 0.05 * sin(1.3 * position.z - 0.9 * uTime);");
  };
  const sea = new THREE.Mesh(seaGeo, seaMat);
  sea.position.y = -0.32;
  scene.add(sea);
  const foam = new THREE.Mesh(new THREE.PlaneGeometry(MAP_W * 1.06, MAP_D * 1.08), new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.35 }));
  foam.rotation.x = -Math.PI / 2;
  foam.position.y = -0.2;
  scene.add(foam);
  const waveSea = (t) => {
    seaTime.value = t;
    foam.material.opacity = 0.25 + 0.12 * Math.sin(1.6 * t);
  };
  scene.add(group);

  const labels = districts.map(districtLabel);
  labels.forEach((l) => stage.appendChild(l.el));
  const active = attractionLabel();
  stage.appendChild(active.el);

  const sync = () => {
    labels.forEach((l) => l.draw());
    const a = attractions.find((x) => x.id === state.attraction);
    if (a) {
      active.anchor.copy(toScene(a.pin.x, a.pin.y));
      active.el.innerHTML = `<div><div class="relative flex -translate-y-1/2 flex-col items-center" style="animation:pop-in .35s ease both">
        <span class="absolute -top-2 h-10 w-10 rounded-full border-2 border-[#72e0d4]/70 animate-pulse-ring"></span>
        ${PIN_SVG("h-8 w-8 text-[#72e0d4] drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]", "#ff7a5c")}
        <span class="font-display mt-1 rounded-full bg-[#ff7a5c] px-3 py-1 text-[11px] font-bold whitespace-nowrap text-white shadow-lg">${a.name}</span></div></div>`;
      active.el.hidden = false;
    } else active.el.hidden = true;
  };
  state.listeners.push(sync);
  sync();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 12;
  controls.minPolarAngle = 0.4;
  controls.maxPolarAngle = 1.15;

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
  const place = (l) => {
    v.copy(l.anchor).applyMatrix4(group.matrixWorld);
    const dist = v.distanceTo(camera.position);
    const s = 9 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * dist);
    v.project(camera);
    l.el.style.transform = `translate3d(${((v.x + 1) / 2) * stage.clientWidth}px,${((1 - v.y) / 2) * stage.clientHeight}px,0) scale(${s})`;
    l.el.style.zIndex = Math.round(l.z - dist);
  };
  // Falls back to 1x resolution when the GPU cannot keep up (slow frames pile up)
  let slowFrames = 0, lastFrame = 0;
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    waveSea(t);
    group.position.y = 0.06 * Math.sin(0.6 * t);
    group.rotation.z = 0.012 * Math.sin(0.3 * t);
    group.updateMatrixWorld();
    controls.update();
    renderer.render(scene, camera);
    const now = performance.now();
    slowFrames = now - lastFrame > 22 ? slowFrames + 1 : Math.max(slowFrames - 1, 0);
    lastFrame = now;
    if (slowFrames > 40 && renderer.getPixelRatio() > 1) renderer.setPixelRatio(1);
    labels.forEach(place);
    if (!active.el.hidden) place(active);
  })();
}

try { init(); } catch (err) {
  console.error("Tourism map failed to start", err);
}
