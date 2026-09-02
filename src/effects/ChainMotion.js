import { SpringMotion } from "./SpringMotion.js";

export class ChainMotion {
  constructor(elements, { gap = 0.08, distance = 120 } = {}) {
    this.items = [...elements].map(el => new SpringMotion(el, { y: { value: distance, target: distance, stiffness: 170, damping: 17 }, scale: { value: .8, target: .8, stiffness: 170, damping: 17 } }));
    this.gap = gap; this.distance = distance; this.timers = [];
  }
  play() { this.cancel(); this.items.forEach((motion, i) => this.timers.push(setTimeout(() => motion.to({ y: 0, scale: 1 }), i * this.gap * 1000))); }
  reset() { this.cancel(); this.items.forEach(m => { m.y.value = this.distance; m.y.target = this.distance; m.scale.value = .8; m.scale.target = .8; m.start(); }); }
  cancel() { this.timers.forEach(clearTimeout); this.timers = []; }
  destroy() { this.cancel(); this.items.forEach(m => m.destroy()); }
}
