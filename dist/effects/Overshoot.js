import { SpringMotion } from "./SpringMotion.js";

export class Overshoot {
  constructor(element, { distance = 180 } = {}) {
    this.element = element; this.distance = distance;
    this.motion = new SpringMotion(element, { x: { value: -distance, target: 0, stiffness: 125, damping: 9 }, scale: { value: .75, target: 1, stiffness: 150, damping: 10 } });
  }
  play() { this.motion.x.value = -this.distance; this.motion.x.velocity = 0; this.motion.scale.value = .75; this.motion.scale.velocity = 0; this.motion.to({ x: 0, scale: 1 }); }
  destroy() { this.motion.destroy(); }
}
