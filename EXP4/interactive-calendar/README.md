# Interactive Calendar — Render Lab

A drag-and-drop weekly calendar plus a live "Render Monitor" panel that shows,
in real time, what `React.memo`, `useCallback`, and `useMemo` actually do to
re-renders.

## Stack

- **React 18 + Vite** — fast dev server, minimal config, no CRA cruft.
- Plain CSS (no UI kit) so the memoization logic isn't hidden behind a component library.
- No backend — state lives in React (`useState`), matching the assignment's
  "sync calendar with application state" requirement.

## Run it

```bash
cd interactive-calendar
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production bundle: `npm run build` (output in `dist/`), and preview
it with `npm run preview`.

## What to try

1. **Drag an event card** to another day — state updates, the card moves.
2. **Click an event card** — you'll get a rename prompt (the "edit" interaction).
3. **Click a tag chip** (Meeting / Deadline / Focus block / Personal) to filter
   the week down to that tag.
4. **Flip "Live clock" on.** It ticks a counter every 450ms in `App`, which
   forces `App` to re-render constantly — simulating unrelated state changing
   elsewhere in a real app (a notifications badge, a websocket ping, etc).
5. Watch the **Render Monitor** count go up on every tick. Now flip
   **"React.memo on cards" + "useCallback for handlers"** both on — the count
   stops climbing, because the cards' props are now referentially stable
   across re-renders and `React.memo` can safely bail out.
6. Flip **useCallback off** while memo is on — the count starts climbing again,
   because the handlers are now new function references every render, which
   defeats `React.memo`'s shallow prop comparison. This is the classic
   "memo without useCallback does nothing" gotcha.
7. Flip **useMemo for agenda filter off** — the filtered event list is
   recomputed from scratch on every render (including clock ticks) instead of
   only when `events` or the active tag filter changes.
8. **Reset counters** clears the monitor without touching calendar data.

## How the render counting works

Each `EventCard` calls `logRender(event.id)` inside a bodyless-dependency
`useEffect` (`useEffect(() => { logRender(event.id) })`), which runs after
*every actual render* of that component. When `React.memo` skips a re-render
because props are unchanged, the component function never runs, so the effect
never fires — the counter is a true measurement of renders, not just re-render
*attempts*.

`App.jsx` keeps two versions of each handler/value side by side:
- a `useCallback`/`useMemo`-wrapped "stable" version, and
- a plain version rebuilt fresh every render,

and picks between them based on the toggle state, so you can flip the
optimization on/off without restructuring the component tree.

## Project structure

```
src/
  App.jsx              — state, toggles, DnD handlers, layout
  index.css            — dark theme
  data/events.js        — seed events, days, tag colors
  components/
    EventCard.jsx       — exports both a plain and React.memo-wrapped version
    Toggle.jsx           — the switch control
    RenderMonitor.jsx    — right-hand stats panel
```

## What to extend first

Roughly in order of value-for-effort:

1. **Persist events** — write `events` to `localStorage` (or a small backend)
   on change, and hydrate on load. Right now a refresh resets the board.
2. **Month view** — the assignment mentions day/week/month; the current grid
   is week-only. A month view needs a different layout component but can
   reuse `EventCard`, `Toggle`, and the render-logging pattern unchanged.
3. **Drag-and-drop library** — native HTML5 DnD (what's here) is fine for a
   single-row week grid but gets janky with touch devices and nested drop
   zones. Swap in `@dnd-kit/core` if you add month view or reordering within
   a day.
4. **Real tests** — add Vitest + React Testing Library. Good first tests:
   dragging an event updates its `day`; toggling "React.memo on cards" off
   causes the render count to increase on an unrelated state change; the tag
   filter hides non-matching cards.
5. **React DevTools Profiler pass** — record a session with the clock running
   and memo/useCallback toggled off, then on, and compare the flamegraphs.
   This turns the live demo into the "profiling" deliverable the assignment
   asks for.
6. **Resize / duration** — events currently have a start time only. Adding a
   duration and a resize handle is the natural next interaction after
   drag-and-drop.
