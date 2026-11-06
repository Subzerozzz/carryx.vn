import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const shared = {};
function grainTexture() {
  if (shared.grain) return shared.grain;
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const ctx = c.getContext('2d'); const pixels = ctx.createImageData(256, 256);
  let seed = 8124;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const value = 110 + (seed % 80);
    pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = value; pixels.data[i + 3] = 255;
  }
  ctx.putImageData(pixels, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 8);
  shared.grain = t; return t;
}
function createBag(color) {
  const bag = new THREE.Group();
  const leather = new THREE.MeshStandardMaterial({ color: color === 'brown' ? '#754226' : '#111317', roughness: .65, metalness: .015, envMapIntensity: .45, bumpMap: grainTexture(), bumpScale: .025 });
  const edge = new THREE.MeshStandardMaterial({ color: color === 'brown' ? '#49301e' : '#0b0d10', roughness: .8, envMapIntensity: .35, bumpMap: grainTexture(), bumpScale: .012 });
  const mesh = new THREE.MeshStandardMaterial({ color: '#1a1c1d', roughness: .95 });
  const metal = new THREE.MeshStandardMaterial({ color: '#a7a397', metalness: .9, roughness: .29 });
  const black = new THREE.MeshStandardMaterial({ color: '#0c1012', roughness: .33, metalness: .18 });
  const stitching = new THREE.MeshStandardMaterial({ color: color === 'brown' ? '#bf926b' : '#5c5c59', roughness: .9 });
  const leatherParts = [leather, edge, stitching];
  function rounded(w, h, d, x, y, z, mat = leather, r = .1) {
    const n = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, Math.min(r, d / 2 - .001)), mat);
    n.position.set(x, y, z); n.castShadow = true; n.receiveShadow = true; bag.add(n); return n;
  }
  function line(points, material = edge, radius = .012) {
    const curve = new THREE.CatmullRomCurve3(points.map(v => new THREE.Vector3(...v)));
    const n = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, radius, 6, false), material); n.castShadow = true; bag.add(n); return n;
  }
  function panel(w, h, depth, x, y, z, material = leather, r = .22) {
    const shape = new THREE.Shape(), l = -w / 2, b = -h / 2;
    shape.moveTo(l + r, b); shape.lineTo(l + w - r, b); shape.quadraticCurveTo(l + w, b, l + w, b + r);
    shape.lineTo(l + w, b + h - r); shape.quadraticCurveTo(l + w, b + h, l + w - r, b + h);
    shape.lineTo(l + r, b + h); shape.quadraticCurveTo(l, b + h, l, b + h - r);
    shape.lineTo(l, b + r); shape.quadraticCurveTo(l, b, l + r, b);
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .025, bevelThickness: .025, curveSegments: 10 });
    const n = new THREE.Mesh(geometry, material); n.position.set(x, y, z); n.castShadow = true; n.receiveShadow = true; bag.add(n); return n;
  }
  // Rounded, structured PU body and two separately padded front compartments.
  const body = rounded(2.18, 3.18, .91, 0, 0, 0, leather, .36);
  const positions = body.geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i); positions.setX(i, positions.getX(i) * (1 - .035 * ((y + 1.59) / 3.18)));
  }
  positions.needsUpdate = true;
  panel(1.97, 2.58, .1, 0, -.19, .45, edge, .29);
  panel(1.91, 2.52, .12, 0, -.18, .53, leather, .28);
  panel(1.78, .47, .08, 0, .63, .665, leather, .13);
  line([[-.84, .72, .784], [-.42, .68, .793], [0, .66, .798], [.43, .68, .793], [.84, .72, .784]], metal, .009);
  line([[-.84, -.19, .696], [-.42, -.22, .703], [0, -.23, .706], [.42, -.22, .703], [.84, -.19, .696]], edge, .012);
  for (const z of [.31, -.26]) {
    line([[-1.07, -1.38, z], [-1.065, .85, z], [-.88, 1.43, z], [0, 1.55, z], [.88, 1.43, z], [1.065, .85, z], [1.07, -1.38, z]], metal, .009);
    line([[-1.015, -1.35, z + .017], [-1.01, .86, z + .017], [-.83, 1.39, z + .017], [0, 1.48, z + .017], [.83, 1.39, z + .017], [1.01, .86, z + .017], [1.015, -1.35, z + .017]], stitching, .004);
  }
  for (const [x, y, z] of [[.57, .68, .81], [.67, .66, .81], [1.075, -.88, .34], [-1.075, -.94, .34]]) {
    const pull = rounded(.07, .22, .025, x, y - .08, z, metal, .011); pull.rotation.z = -.14;
    const hole = rounded(.025, .08, .027, x, y - .1, z + .014, black, .01); hole.rotation.z = -.14;
  }
  // A padded curved handle, back pads, shoulder straps and webbing are modeled in 3D.
  line([[-.44, 1.49, -.07], [-.38, 1.83, -.09], [0, 1.98, -.1], [.38, 1.83, -.09], [.44, 1.49, -.07]], edge, .075);
  line([[-.39, 1.59, -.05], [0, 1.9, -.07], [.39, 1.59, -.05]], stitching, .005);
  for (const sign of [-1, 1]) {
    rounded(.69, 2.43, .13, sign * .46, -.12, -.49, mesh, .06);
    for (let i = 0; i < 9; i++) rounded(.53, .035, .02, sign * .46, -.97 + i * .23, -.568, edge, .009);
    const strap = line([[sign * .6, 1.44, -.43], [sign * .83, 1.05, -.89], [sign * .87, .17, -1.13], [sign * .72, -.75, -.99], [sign * .55, -1.15, -.63]], edge, .125);
    strap.scale.x = 1.03;
    line([[sign * .6, 1.4, -.46], [sign * .83, 1.02, -.98], [sign * .87, .17, -1.24], [sign * .72, -.72, -1.09]], stitching, .006);
    line([[sign * .55, -1.12, -.64], [sign * .75, -1.45, -.65], [sign * .91, -1.49, -.41]], mesh, .045);
    rounded(.22, .13, .045, sign * .74, -.88, -.995, black, .02);
  }
  rounded(1.4, .034, .03, 0, -.38, -.585, metal, .014);
  rounded(1.78, .4, .04, 0, -.08, -.6, mesh, .018);
  // Left side fingerprint sensor and USB connector, in the positions of the reference photos.
  rounded(.085, .45, .25, -1.087, -.34, .05, edge, .035);
  rounded(.092, .36, .19, -1.108, -.34, .05, metal, .028);
  rounded(.097, .29, .15, -1.12, -.34, .05, black, .025);
  const sensor = new THREE.Mesh(new THREE.CylinderGeometry(.054, .054, .005, 24), metal); sensor.rotation.z = Math.PI / 2; sensor.position.set(-1.174, -.29, .05); bag.add(sensor);
  const led = new THREE.Mesh(new THREE.SphereGeometry(.012, 10, 10), new THREE.MeshStandardMaterial({ color: '#a4cdb2', emissive: '#315f45', emissiveIntensity: .25 })); led.position.set(-1.177, -.39, .05); bag.add(led);
  rounded(.088, .39, .24, -1.095, -.98, .05, edge, .03);
  rounded(.093, .29, .16, -1.12, -.98, .05, black, .015);
  rounded(.1, .065, .11, -1.17, -.91, .05, metal, .013);
  rounded(.105, .034, .078, -1.175, -.91, .05, black, .012);
  rounded(.1, .045, .07, -1.17, -1.035, .05, metal, .012);
  rounded(1.88, .085, .72, 0, -1.58, .015, edge, .035);
  bag.userData.leatherParts = leatherParts;
  return bag;
}

export class ProductViewer {
  constructor(element, { color = 'black', compact = false } = {}) {
    this.element = element; this.color = color; this.compact = compact; this.visible = false; this.dead = false; this.auto = false; this.targetY = 0;
    this.stage = element.querySelector('.viewer-stage');
    this.canvas = document.createElement('canvas'); this.canvas.setAttribute('aria-label', 'Mô phỏng 3D balo CarryX. Kéo để xoay, dùng nút để đổi góc.'); this.canvas.setAttribute('role', 'img'); this.canvas.tabIndex = 0;
    try { this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { this.fail('Thiết bị chưa hỗ trợ 3D. Bạn vẫn có thể xem ảnh thật.'); return; }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8)); this.renderer.outputColorSpace = THREE.SRGBColorSpace; this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true; this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.scene = new THREE.Scene(); this.camera = new THREE.PerspectiveCamera(34, 1, .1, 50); this.camera.position.set(-3.7, 1.05, 6.4);
    const pmrem = new THREE.PMREMGenerator(this.renderer); const room = new RoomEnvironment(); this.environment = pmrem.fromScene(room, .04); this.scene.environment = this.environment.texture; room.dispose(); pmrem.dispose();
    const ambient = new THREE.HemisphereLight('#fff8ec', '#a69d8e', 2.3); this.scene.add(ambient);
    const key = new THREE.DirectionalLight('#fff7eb', 3.3); key.position.set(-3, 6, 5); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -4; key.shadow.camera.right = 4; key.shadow.camera.top = 4; key.shadow.camera.bottom = -4; key.shadow.normalBias = .04; this.scene.add(key);
    const rim = new THREE.DirectionalLight('#ffffff', 2.2); rim.position.set(4, 3, -4); this.scene.add(rim);
    this.bag = createBag(color); this.bag.position.y = .06; this.scene.add(this.bag);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ color: '#5e4a2e', opacity: .14 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -1.57; floor.receiveShadow = true; this.scene.add(floor);
    this.controls = new OrbitControls(this.camera, this.canvas); this.controls.enableDamping = true; this.controls.dampingFactor = .08; this.controls.enablePan = false; this.controls.enableZoom = !compact; this.controls.minDistance = 4.8; this.controls.maxDistance = 10; this.controls.minPolarAngle = Math.PI * .22; this.controls.maxPolarAngle = Math.PI * .65; this.controls.rotateSpeed = .7; this.controls.target.set(0, .1, 0); this.controls.update(); this.controls.saveState();
    this.onStart = () => { this.setAuto(false); this.targetY = this.bag.rotation.y; element.classList.add('interacted'); };
    this.controls.addEventListener('start', this.onStart);
    this.stage.append(this.canvas); element.classList.add('viewer-ready');
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(this.stage); this.resize();
    this.visibilityObserver = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; }, { rootMargin: '80px' }); this.visibilityObserver.observe(element);
    this.onKey = e => { if (['ArrowLeft', 'ArrowRight', 'Home'].includes(e.key)) { e.preventDefault(); if (e.key === 'Home') this.reset(); else this.rotate(e.key === 'ArrowLeft' ? -1 : 1); } };
    this.canvas.addEventListener('keydown', this.onKey);
    this.last = performance.now(); this.animate();
  }
  resize() { if (!this.renderer) return; const { width, height } = this.stage.getBoundingClientRect(); if (!width || !height) return; this.renderer.setSize(width, height, false); this.camera.aspect = width / height; this.camera.updateProjectionMatrix(); }
  animate = () => {
    if (this.dead) return;
    this.raf = requestAnimationFrame(this.animate);
    if (!this.visible || document.hidden || this.element.dataset.mode === 'photo') return;
    const now = performance.now(), delta = Math.min((now - this.last) / 1000, .05); this.last = now;
    if (this.auto) this.targetY += delta * .26;
    this.bag.rotation.y = THREE.MathUtils.lerp(this.bag.rotation.y, this.targetY, .09);
    this.controls.update(); this.renderer.render(this.scene, this.camera);
  };
  rotate(direction) { if (!this.bag) return; this.setAuto(false); this.targetY += direction * Math.PI / 2; this.element.classList.add('interacted'); }
  setAuto(on) { this.auto = on; const b = this.element.querySelector('[data-view-action="auto"]'); if (b) { b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? 'Dừng tự xoay' : 'Tự xoay sản phẩm'); b.innerHTML = on ? '<span aria-hidden="true">Ⅱ</span>' : '<span aria-hidden="true">▷</span>'; } }
  setColor(color) { if (!this.bag) return; this.color = color; const [leather, edge, stitch] = this.bag.userData.leatherParts; leather.color.set(color === 'brown' ? '#754226' : '#111317'); edge.color.set(color === 'brown' ? '#49301e' : '#0b0d10'); stitch.color.set(color === 'brown' ? '#bf926b' : '#5c5c59'); }
  reset() { if (!this.controls) return; this.setAuto(false); this.targetY = 0; this.controls.reset(); }
  fail(message) {
    this.element.classList.add('viewer-unavailable'); this.element.dataset.mode = 'photo'; this.element.querySelector('.viewer-note').textContent = message;
    this.element.querySelector('[data-view-action="auto"]').disabled = true;
    this.element.querySelectorAll('[data-view-mode]').forEach(b => { const photo = b.dataset.viewMode === 'photo'; b.classList.toggle('active', photo); b.setAttribute('aria-pressed', String(photo)); if (!photo) b.disabled = true; });
  }
  dispose() { this.dead = true; cancelAnimationFrame(this.raf); this.resizeObserver?.disconnect(); this.visibilityObserver?.disconnect(); this.controls?.dispose(); this.canvas.removeEventListener('keydown', this.onKey); if (this.scene) this.scene.traverse(n => { n.geometry?.dispose(); if (n.material) (Array.isArray(n.material) ? n.material : [n.material]).forEach(m => m.dispose()); }); this.environment?.dispose(); this.renderer?.dispose(); this.renderer?.forceContextLoss(); this.canvas.remove(); }
}
