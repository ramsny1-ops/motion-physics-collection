/** Shared RAF loop. Starts only while at least one subscriber exists. */
export class FrameLoop {
  #items = new Set();
  #raf = 0;
  #last = 0;

  add(callback) {
    this.#items.add(callback);
    if (!this.#raf) this.#raf = requestAnimationFrame(this.#tick);
    return () => this.remove(callback);
  }

  remove(callback) {
    this.#items.delete(callback);
    if (!this.#items.size && this.#raf) {
      cancelAnimationFrame(this.#raf);
      this.#raf = 0;
      this.#last = 0;
    }
  }

  #tick = time => {
    const dt = this.#last ? Math.min((time - this.#last) / 1000, 0.033) : 1 / 60;
    this.#last = time;
    for (const callback of [...this.#items]) callback(dt, time);
    this.#raf = this.#items.size ? requestAnimationFrame(this.#tick) : 0;
  };
}

export const frameLoop = new FrameLoop();
