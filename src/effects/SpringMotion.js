import { Spring } from "../core/Spring.js";
import { frameLoop } from "../core/FrameLoop.js";

export class SpringMotion {
  constructor(element, options = {}) {
    this.element = element;
    this.x = new Spring(options.x);
    this.y = new Spring(options.y);
    this.scale = new Spring({ value: 1, target: 1, ...(options.scale || {}) });
    this.rotate = new Spring(options.rotate);
    this.unsubscribe = null;
  }
  to({ x, y, scale, rotate } = {}) {
    if (x != null) this.x.target = x;
    if (y != null) this.y.target = y;
    if (scale != null) this.scale.target = scale;
    if (rotate != null) this.rotate.target = rotate;
    this.start();
    return this;
  }
  impulse({ x = 0, y = 0, scale = 0, rotate = 0 } = {}) {
    this.x.velocity += x; this.y.velocity += y; this.scale.velocity += scale; this.rotate.velocity += rotate;
    this.start();
    return this;
  }
  start() {
    if (this.unsubscribe) return;
    this.unsubscribe = frameLoop.add(dt => {
      const x = this.x.step(dt); const y = this.y.step(dt); const s = this.scale.step(dt); const r = this.rotate.step(dt);
      this.element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${r}deg)`;
      if (this.x.settled && this.y.settled && this.scale.settled && this.rotate.settled) this.stop();
    });
  }
  stop() { this.unsubscribe?.(); this.unsubscribe = null; }
  destroy() { this.stop(); this.element.style.transform = ""; }
}
