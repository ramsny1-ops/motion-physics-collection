# Usage Guide

## Choosing parameters

### Stiffness
Higher stiffness produces stronger acceleration toward the target. Very high stiffness can appear sharp or unstable if damping is too low.

### Damping
Damping removes energy. High damping settles quickly with little overshoot. Low damping creates bounce and repeated overshoot.

### Mass
Mass resists acceleration. Increasing mass without changing stiffness makes a spring feel heavier and slower.

### Friction
In inertia systems, friction is a multiplier applied to velocity over time. Values near 1 preserve momentum longer.

### Restitution
Restitution controls bounce after a collision. `1` approximates a perfectly elastic collision, while lower values lose more energy.

## UI patterns

### Button attraction
Use modest magnetic strength. A button that moves too far can make targeting harder.

### Cards
Tilt and translation should remain small. Physical motion should reinforce hierarchy rather than cause reading difficulty.

### Dragging
Use resistance beyond boundaries instead of hard-clamping during the pointer move. Hard bounds feel artificial because the object abruptly stops while the hand keeps moving.

### Scroll
Momentum scrolling should remain local to specialized galleries or panels. Do not replace normal document scrolling without a strong reason.

### Collision effects
Use collisions for decorative or playful UI. The included solver is intentionally small and not a general-purpose rigid-body engine.
