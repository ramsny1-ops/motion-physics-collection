# Performance

## Shared frame loop

All continuous simulations subscribe to one shared `requestAnimationFrame` loop. Springs unsubscribe when settled, so idle effects consume no frame work.

## Transform-only rendering

The examples update CSS transforms. This generally avoids layout recalculation compared with animating `top`, `left`, `width` or `height`.

## Delta cap

Frame delta is capped at 33 ms. This prevents a large physics jump if the browser suspends a tab and resumes later.

## Collision complexity

The included collision demo compares every pair, making collision detection O(n²). Keep the number of colliders small. For hundreds of objects, add a uniform grid or spatial hash broad phase.

## Pointer events

Pointer Events unify mouse, pen and touch input. Drag examples use `touch-action: none` only on the draggable interaction surface rather than disabling page scrolling globally.
