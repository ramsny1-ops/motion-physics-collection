import { SpringMotion } from "./SpringMotion.js";

export class ElasticCard {
  constructor(element, { tilt = 10, lift = 8 } = {}) {
    this.el = element; this.tilt = tilt; this.lift = lift;
    this.motion = new SpringMotion(element, { x: { stiffness: 180, damping: 18 }, y: { stiffness: 180, damping: 18 }, scale: { stiffness: 200, damping: 18 }, rotate: { stiffness: 160, damping: 15 } });
    this.move = e => {
      const r = element.getBoundingClientRect(); const nx = (e.clientX - r.left) / r.width - .5; const ny = (e.clientY - r.top) / r.height - .5;
      this.motion.to({ x: nx * lift, y: ny * lift, rotate: nx * tilt, scale: 1.025 });
    };
    this.leave = () => this.motion.to({ x: 0, y: 0, rotate: 0, scale: 1 });
    element.addEventListener("pointermove", this.move); element.addEventListener("pointerleave", this.leave);
  }
  destroy() { this.el.removeEventListener("pointermove", this.move); this.el.removeEventListener("pointerleave", this.leave); this.motion.destroy(); }
}
