import { SpringMotion } from "./SpringMotion.js";
import { clamp } from "../core/math.js";

export class MagneticButton {
  constructor(element, { strength = 0.35, radius = 130, scale = 1.06 } = {}) {
    this.el = element; this.strength = strength; this.radius = radius; this.scale = scale;
    this.motion = new SpringMotion(element, { x: { stiffness: 260, damping: 22 }, y: { stiffness: 260, damping: 22 }, scale: { stiffness: 260, damping: 20 } });
    this.move = e => {
      const r = element.getBoundingClientRect(); const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
      const dx = e.clientX - cx; const dy = e.clientY - cy; const d = Math.hypot(dx, dy);
      if (d <= radius) { const pull = (1 - d / radius) * strength; this.motion.to({ x: dx * pull, y: dy * pull, scale: 1 + (scale - 1) * clamp(1 - d / radius, 0, 1) }); }
      else this.motion.to({ x: 0, y: 0, scale: 1 });
    };
    this.leave = () => this.motion.to({ x: 0, y: 0, scale: 1 });
    window.addEventListener("pointermove", this.move); window.addEventListener("pointerleave", this.leave);
  }
  destroy() { window.removeEventListener("pointermove", this.move); window.removeEventListener("pointerleave", this.leave); this.motion.destroy(); }
}
