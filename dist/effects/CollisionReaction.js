import { frameLoop } from "../core/FrameLoop.js";

export class CollisionReaction {
  constructor(container, { restitution = 0.92, speed = 140 } = {}) {
    this.container = container; this.restitution = restitution;
    this.bodies = [...container.querySelectorAll("[data-collider]")].map((el, i) => ({ el, x: 30 + i * 90, y: 40 + (i % 2) * 90, vx: (i % 2 ? -1 : 1) * (speed + i * 12), vy: (i % 3 - 1) * 70, r: el.offsetWidth / 2 }));
    container.style.position ||= "relative"; this.bodies.forEach(b => b.el.style.position = "absolute"); this.unsub = frameLoop.add(dt => this.step(dt));
  }
  step(dt) {
    const r = this.container.getBoundingClientRect();
    for (const b of this.bodies) {
      b.x += b.vx * dt; b.y += b.vy * dt;
      if (b.x < 0 || b.x + b.r * 2 > r.width) { b.vx *= -1; b.x = Math.max(0, Math.min(b.x, r.width - b.r * 2)); }
      if (b.y < 0 || b.y + b.r * 2 > r.height) { b.vy *= -1; b.y = Math.max(0, Math.min(b.y, r.height - b.r * 2)); }
    }
    for (let i = 0; i < this.bodies.length; i++) for (let j = i + 1; j < this.bodies.length; j++) this.resolve(this.bodies[i], this.bodies[j]);
    for (const b of this.bodies) b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
  }
  resolve(a, b) {
    const ax = a.x + a.r, ay = a.y + a.r, bx = b.x + b.r, by = b.y + b.r; const dx = bx - ax, dy = by - ay; const dist = Math.hypot(dx, dy); const min = a.r + b.r;
    if (!dist || dist >= min) return;
    const nx = dx / dist, ny = dy / dist; const overlap = min - dist; a.x -= nx * overlap / 2; a.y -= ny * overlap / 2; b.x += nx * overlap / 2; b.y += ny * overlap / 2;
    const rvx = b.vx - a.vx, rvy = b.vy - a.vy; const velAlong = rvx * nx + rvy * ny; if (velAlong > 0) return;
    const impulse = -(1 + this.restitution) * velAlong / 2; a.vx -= impulse * nx; a.vy -= impulse * ny; b.vx += impulse * nx; b.vy += impulse * ny;
  }
  destroy() { this.unsub?.(); }
}
