# Project preferences

Chosen when the project was created. Where another file in docs/rules/ disagrees, this file wins.

## Code comments: minimal

- Comment only what the code cannot say: why a constraint exists, why the obvious approach was rejected, what breaks if this is changed.
- Never restate what the line below does. If a comment does, delete it.

This overrides the comment guidance in docs/rules/code-style.md.

## Build order: ui-first

- Build the screens of a feature first, on mock or static data shaped exactly like the API response will be.
- Run it and show the user: a dev server URL or screenshots of every screen and state (empty, loading, error, filled).
- Stop and wait for explicit approval. Do not start the backend, database or real API wiring for that feature before it.
- After approval, replace the mocks with the real data path without changing the approved UI.

## Layout priority: mobile-first

- Base styles target a ~375px phone. Breakpoints only add layout upward (`min-width`).
- Check every screen at 375px first, then tablet, then desktop.
