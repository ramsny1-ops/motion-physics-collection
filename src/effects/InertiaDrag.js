import { frameLoop } from "../core/FrameLoop.js";
import { clamp } from "../core/math.js";

export class InertiaDrag {
  constructor(element, { friction = 0.93, resistance = 0.35, bounds = null } = {}) {
    this.el = element; this.friction = friction; this.resistance = resistance; this.bounds = bounds;
    this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; this.dragging = false; this.last = null; this.unsub = null;
    this.el.style.touchAction = "none";
    this.down = e => { this.dragging = true; this.last = { x: e.clientX, y: e.clientY, t: performance.now() }; this.el.setPointerCapture?.(e.pointerId); };
    this.move = e => {
      if (!this.dragging) return;
      const now = performance.now(); const dt = Math.max(now - this.last.t, 1);
      let dx = e.clientX - this.last.x; let dy = e.clientY - this.last.y;
      const next = this.applyBounds(this.x + dx, this.y + dy, true);
      dx = next.x - this.x; dy = next.y - this.y; this.x = next.x; this.y = next.y;
      this.vx = dx / dt * 16.67; this.vy = dy / dt * 16.67; this.last = { x: e.clientX, y: e.clientY, t: now }; this.render();
    };
    this.up = () => { if (!this.dragging) return; this.dragging = false; this.startInertia(); };
    element.addEventListener("pointerdown", this.down); window.addEventListener("pointermove", this.move); window.addEventListener("pointerup", this.up);
  }
  applyBounds(x, y, resisting = false) {
    if (!this.bounds) return { x, y };
    const b = typeof this.bounds === "function" ? this.bounds() : this.bounds;
    const apply = (v, min, max) => {
      if (v < min) return resisting ? min + (v - min) * this.resistance : min;
      if (v > max) return resisting ? max + (v - max) * this.resistance : max;
      return v;
    };
    return { x: apply(x, b.minX, b.maxX), y: apply(y, b.minY, b.maxY) };
  }
  startInertia() {
    this.unsub?.();
    this.unsub = frameLoop.add(() => {
      this.x += this.vx; this.y += this.vy; this.vx *= this.friction; this.vy *= this.friction;
      if (this.bounds) {
        const bounded = this.applyBounds(this.x, this.y, false);
        if (bounded.x !== this.x) { this.x += (bounded.x - this.x) * 0.2; this.vx *= 0.7; }
        if (bounded.y !== this.y) { this.y += (bounded.y - this.y) * 0.2; this.vy *= 0.7; }
      }
      this.render();
      if (Math.abs(this.vx) + Math.abs(this.vy) < 0.08) { this.unsub?.(); this.unsub = null; }
    });
  }
  render() { this.el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`; }
  destroy() { this.unsub?.(); this.el.removeEventListener("pointerdown", this.down); window.removeEventListener("pointermove", this.move); window.removeEventListener("pointerup", this.up); }
}
