# Motion Physics Collection

A dependency-free ES2023 motion library for interfaces that should feel physical rather than merely animated.

## Included effects

1. Spring motion
2. Inertia drag with resistance
3. Magnetic buttons
4. Elastic cards
5. Momentum scrolling
6. Overshoot entrances
7. Gravity-like movement
8. Collision reactions
9. Follow-cursor springs
10. Chained spring animations

## Why this library exists

Normal CSS transitions describe how long an animation takes. Physics-based motion describes how a system behaves: stiffness, damping, mass, velocity, friction, gravity, restitution and impulse. The visible duration then emerges from those values.

## Quick start

```js
import { SpringMotion } from "./src/index.js";

const motion = new SpringMotion(document.querySelector(".box"), {
  x: { stiffness: 220, damping: 20, mass: 1 }
});

motion.to({ x: 240, scale: 1.1, rotate: 8 });
```

Run the demos:

```bash
npm run serve
```

Open `http://localhost:8080/examples/`.

## Core model

The spring implementation uses force, damping and velocity integrated per animation frame. Frame deltas are capped to avoid explosive jumps after a background tab resumes.

## Browser support

Designed for evergreen browsers supporting ES modules, Pointer Events, private class fields and `requestAnimationFrame`.

## Accessibility

Physics motion can be visually intense. Applications using this package should provide a reduced-motion experience where motion is not essential. The examples are intentionally interactive demonstrations, while production interfaces should disable or simplify non-essential effects when `prefers-reduced-motion: reduce` is active.

## Performance rules

- Animate `transform` instead of layout properties.
- Share one requestAnimationFrame scheduler.
- Stop spring subscriptions after settling.
- Keep collision groups small; the included collision demo uses an O(n²) pair loop.
- Restrict momentum-wheel interception to a deliberate local viewport, never the whole page by default.
- Destroy effects when removing their elements.

## Documentation

See `docs/API.md`, `docs/USAGE.md`, `docs/PHYSICS.md`, and `docs/PERFORMANCE.md`.
