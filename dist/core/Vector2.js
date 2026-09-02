export class Vector2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  set(x, y) { this.x = x; this.y = y; return this; }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  scale(n) { this.x *= n; this.y *= n; return this; }
  clone() { return new Vector2(this.x, this.y); }
  get length() { return Math.hypot(this.x, this.y); }
}
