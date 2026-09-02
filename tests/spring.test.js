import test from "node:test";
import assert from "node:assert/strict";
import { Spring } from "../src/core/Spring.js";
import { clamp, lerp, normalize } from "../src/core/math.js";

test("spring converges toward its target", () => {
  const spring = new Spring({ value: 0, target: 100, stiffness: 180, damping: 24 });
  for (let i = 0; i < 600; i++) spring.step(1 / 60);
  assert.ok(Math.abs(spring.value - 100) < 0.01);
});

test("spring can overshoot when damping is low", () => {
  const spring = new Spring({ value: 0, target: 100, stiffness: 120, damping: 5 });
  let overshot = false;
  for (let i = 0; i < 180; i++) { spring.step(1 / 60); if (spring.value > 100) overshot = true; }
  assert.equal(overshot, true);
});

test("math helpers produce expected values", () => {
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(lerp(0, 20, .25), 5);
  const n = normalize(3, 4);
  assert.ok(Math.abs(n.x - .6) < 1e-10);
  assert.ok(Math.abs(n.y - .8) < 1e-10);
});
