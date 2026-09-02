import { frameLoop } from "../core/FrameLoop.js";
import { clamp } from "../core/math.js";

export class MomentumScroller {
  constructor(viewport, { friction = 0.92, wheelMultiplier = 1, dragMultiplier = 1 } = {}) {
    this.viewport = viewport; this.content = viewport.firstElementChild; this.friction = friction; this.wheelMultiplier = wheelMultiplier; this.dragMultiplier = dragMultiplier; this.position = 0; this.velocity = 0; this.dragging = false; this.lastY = 0; this.unsub = null;
    viewport.style.overflow = "hidden"; this.content.style.willChange = "transform";
    this.wheel = e => { e.preventDefault(); this.velocity += e.deltaY * wheelMultiplier * .15; this.start(); };
    this.down = e => { this.dragging = true; this.lastY = e.clientY; viewport.setPointerCapture?.(e.pointerId); };
    this.move = e => { if (!this.dragging) return; const dy = e.clientY - this.lastY; this.lastY = e.clientY; this.velocity -= dy * dragMultiplier; this.start(); };
    this.up = () => this.dragging = false;
    viewport.addEventListener("wheel", this.wheel, { passive: false }); viewport.addEventListener("pointerdown", this.down); viewport.addEventListener("pointermove", this.move); viewport.addEventListener("pointerup", this.up);
  }
  max() { return Math.max(0, this.content.scrollHeight - this.viewport.clientHeight); }
  start() { if (this.unsub) return; this.unsub = frameLoop.add(() => { this.position += this.velocity; this.velocity *= this.friction; const max = this.max(); if (this.position < 0) { this.position += (0 - this.position) * .18; this.velocity *= .7; } if (this.position > max) { this.position += (max - this.position) * .18; this.velocity *= .7; } this.content.style.transform = `translate3d(0, ${-this.position}px, 0)`; if (!this.dragging && Math.abs(this.velocity) < .05 && this.position >= -.2 && this.position <= max + .2) { this.unsub?.(); this.unsub = null; } }); }
  destroy() { this.unsub?.(); this.viewport.removeEventListener("wheel", this.wheel); this.viewport.removeEventListener("pointerdown", this.down); this.viewport.removeEventListener("pointermove", this.move); this.viewport.removeEventListener("pointerup", this.up); }
}
