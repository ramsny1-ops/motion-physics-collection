import { frameLoop } from "../core/FrameLoop.js";

export class GravityField {
  constructor(container, { gravity = 900, bounce = 0.72, air = 0.995 } = {}) {
    this.container = container; this.gravity = gravity; this.bounce = bounce; this.air = air; this.items = [...container.querySelectorAll("[data-body]")].map((el, i) => ({ el, x: Number(el.dataset.x || 20 + i * 70), y: Number(el.dataset.y || 10), vx: Number(el.dataset.vx || (i % 2 ? 40 : -30)), vy: Number(el.dataset.vy || 0) }));
    container.style.position ||= "relative";
    for (const b of this.items) { b.el.style.position = "absolute"; }
    this.unsub = frameLoop.add(dt => this.step(dt));
  }
  step(dt) {
    const box = this.container.getBoundingClientRect();
    for (const b of this.items) {
      const w = b.el.offsetWidth, h = b.el.offsetHeight; b.vy += this.gravity * dt; b.vx *= this.air; b.vy *= this.air; b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * this.bounce; }
      if (b.x + w > box.width) { b.x = box.width - w; b.vx = -Math.abs(b.vx) * this.bounce; }
      if (b.y + h > box.height) { b.y = box.height - h; b.vy = -Math.abs(b.vy) * this.bounce; }
      if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * this.bounce; }
      b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    }
  }
  destroy() { this.unsub?.(); }
}
