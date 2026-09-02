# API Reference

## Spring

```js
new Spring({ value, target, stiffness, damping, mass, precision })
```

Properties: `value`, `target`, `velocity`, `stiffness`, `damping`, `mass`, `precision`.

Methods:
- `step(dt)` advances the simulation.
- `settled` reports whether velocity and displacement are within precision.

## SpringMotion

```js
const motion = new SpringMotion(element, {
  x: { stiffness: 220, damping: 20 },
  y: { stiffness: 220, damping: 20 },
  scale: { value: 1, target: 1 },
  rotate: { stiffness: 150, damping: 16 }
});
```

Methods:
- `to({x,y,scale,rotate})`
- `impulse({x,y,scale,rotate})`
- `start()`
- `stop()`
- `destroy()`

## InertiaDrag

```js
new InertiaDrag(element, {
  friction: 0.93,
  resistance: 0.35,
  bounds: { minX: 0, maxX: 500, minY: 0, maxY: 300 }
});
```

`bounds` may also be a function, useful for responsive containers.

## MagneticButton

```js
new MagneticButton(button, {
  strength: 0.35,
  radius: 130,
  scale: 1.06
});
```

## ElasticCard

```js
new ElasticCard(card, { tilt: 10, lift: 8 });
```

## MomentumScroller

```js
new MomentumScroller(viewport, {
  friction: 0.92,
  wheelMultiplier: 1,
  dragMultiplier: 1
});
```

The first child of the viewport is treated as scroll content.

## Overshoot

```js
const effect = new Overshoot(element, { distance: 180 });
effect.play();
```

## GravityField

Children marked `[data-body]` become simulated bodies.

```js
new GravityField(container, {
  gravity: 900,
  bounce: 0.72,
  air: 0.995
});
```

## CollisionReaction

Children marked `[data-collider]` become equal-mass circular colliders.

```js
new CollisionReaction(container, {
  restitution: 0.92,
  speed: 140
});
```

## FollowCursor

```js
new FollowCursor(element, {
  stiffness: 140,
  damping: 18,
  offsetX: 0,
  offsetY: 0
});
```

## ChainMotion

```js
const chain = new ChainMotion(elements, {
  gap: 0.08,
  distance: 120
});
chain.play();
chain.reset();
```
