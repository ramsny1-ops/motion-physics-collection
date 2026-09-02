# Physics Notes

## Spring force

A damped spring combines a restorative spring force with a damping force.

Conceptually:

```text
spring force  = -stiffness × displacement
damping force = -damping × velocity
acceleration  = total force / mass
velocity     += acceleration × dt
position     += velocity × dt
```

The library uses semi-implicit Euler integration: velocity is updated before position. This is simple, inexpensive and appropriate for small interface motion systems.

## Inertia

Release velocity is estimated from pointer displacement over elapsed input time. After release, the library keeps advancing position and multiplies velocity by friction.

## Overshoot

Overshoot is not a special keyframe. It emerges naturally when damping is low enough that momentum carries the spring beyond its target.

## Gravity

Gravity is modeled as constant downward acceleration. Bounce reverses velocity at boundaries and multiplies it by restitution.

## Collision response

The circle example detects overlap using center distance. It separates overlapping bodies and applies an impulse along the collision normal. The demo assumes equal masses.

## What this is not

This package is an interface-motion toolkit, not a complete physics engine. It intentionally omits rotation inertia tensors, continuous collision detection, constraints, polygon collision and broad-phase spatial indexing.
