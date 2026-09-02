# Contributing

Keep the package dependency-free and browser-native.

For a new effect:
1. Put the implementation in `src/effects/`.
2. Reuse `frameLoop` instead of opening a separate permanent RAF loop.
3. Prefer transform and opacity rendering.
4. Add a focused example.
5. Add tests for reusable mathematical logic.
6. Document cleanup behavior and performance limitations.

Run:

```bash
npm test
npm run check
```
