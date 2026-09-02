import { Spring } from "../core/Spring.js";
import { frameLoop } from "../core/FrameLoop.js";

export class FollowCursor {
  constructor(element, { stiffness = 140, damping = 18, offsetX = 0, offsetY = 0 } = {}) {
    this.el = element; this.x = new Spring({ stiffness, damping }); this.y = new Spring({ stiffness, damping }); this.offsetX = offsetX; this.offsetY = offsetY; this.unsub = null;
    this.move = e => { this.x.target = e.clientX + offsetX; this.y.target = e.clientY + offsetY; this.start(); };
    window.addEventListener("pointermove", this.move); element.style.pointerEvents = "none"; element.style.position = "fixed"; element.style.left = 0; element.style.top = 0;
  }
  start() { if (this.unsub) return; this.unsub = frameLoop.add(dt => { this.el.style.transform = `translate3d(${this.x.step(dt)}px, ${this.y.step(dt)}px, 0)`; if (this.x.settled && this.y.settled) { this.unsub?.(); this.unsub = null; } }); }
  destroy() { window.removeEventListener("pointermove", this.move); this.unsub?.(); }
}
