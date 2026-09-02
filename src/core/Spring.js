/** 1D damped spring using semi-implicit Euler integration. */
export class Spring {
  constructor({ value = 0, target = value, stiffness = 220, damping = 24, mass = 1, precision = 0.001 } = {}) {
    this.value = value;
    this.target = target;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.precision = precision;
  }

  step(dt) {
    const force = -this.stiffness * (this.value - this.target);
    const dampingForce = -this.damping * this.velocity;
    const acceleration = (force + dampingForce) / this.mass;
    this.velocity += acceleration * dt;
    this.value += this.velocity * dt;
    if (Math.abs(this.velocity) < this.precision && Math.abs(this.target - this.value) < this.precision) {
      this.value = this.target;
      this.velocity = 0;
    }
    return this.value;
  }

  get settled() {
    return this.velocity === 0 && this.value === this.target;
  }
}
