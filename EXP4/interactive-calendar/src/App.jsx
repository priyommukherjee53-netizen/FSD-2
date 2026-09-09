import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DAYS, TAGS, initialEvents } from './data/events'
import { EventCard, MemoEventCard } from './components/EventCard'
import Toggle from './components/Toggle'
import RenderMonitor from './components/RenderMonitor'

export default function App() {
  // --- calendar data -------------------------------------------------
  const [events, setEvents] = useState(initialEvents)
  const [activeTags, setActiveTags] = useState(() => new Set())

  // --- optimization toggles -------------------------------------------
  const [memoOn, setMemoOn] = useState(true)
  const [callbackOn, setCallbackOn] = useState(true)
  const [memoListOn, setMemoListOn] = useState(true)
  const [liveClockOn, setLiveClockOn] = useState(false)

  // --- unrelated state, to prove it cascades into children ------------
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!liveClockOn) return
    const id = setInterval(() => setTick((t) => t + 1), 450)
    return () => clearInterval(id)
  }, [liveClockOn])

  // --- render monitor bookkeeping -------------------------------------
  const [renderCounts, setRenderCounts] = useState({})
  const totalRef = useRef(0)
  const [totalRenders, setTotalRenders] = useState(0)

  const logRender = useCallback((id) => {
    totalRef.current += 1
    setTotalRenders(totalRef.current)
    setRenderCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }, [])

  const resetCounters = () => {
    totalRef.current = 0
    setTotalRenders(0)
    setRenderCounts({})
  }

  // --- drag and drop ----------------------------------------------------
  // Stable versions (built once, deps only on setEvents which never changes).
  const stableDragStart = useCallback((e, id) => {
    e.dataTransfer.setData('text/plain', id)
  }, [])

  const stableEdit = useCallback((id) => {
    setEvents((prev) => {
      const current = prev.find((ev) => ev.id === id)
      const next = window.prompt('Rename event', current?.title)
      if (!next || !next.trim()) return prev
      return prev.map((ev) => (ev.id === id ? { ...ev, title: next.trim() } : ev))
    })
  }, [])

  const stableDrop = useCallback((day, e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (!id) return
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, day } : ev)))
  }, [])

  // Unstable versions: freshly created on every render on purpose, so
  // toggling "useCallback for handlers" off actually breaks memoization
  // even when "React.memo on cards" is on.
  const unstableDragStart = (e, id) => stableDragStart(e, id)
  const unstableEdit = (id) => stableEdit(id)
  const unstableDrop = (day, e) => stableDrop(day, e)

  const onDragStart = callbackOn ? stableDragStart : unstableDragStart
  const onEdit = callbackOn ? stableEdit : unstableEdit
  const onDrop = callbackOn ? stableDrop : unstableDrop

  // --- filtering --------------------------------------------------------
  const toggleTag = (tag) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })
  }

  const computeVisible = () =>
    activeTags.size === 0 ? events : events.filter((ev) => activeTags.has(ev.tag))

  // useMemo version only recomputes when events or activeTags change.
  // Non-memo version recomputes on every render, including the live-clock tick.
  const memoVisible = useMemo(computeVisible, [events, activeTags])
  const visibleEvents = memoListOn ? memoVisible : computeVisible()

  const Card = memoOn ? MemoEventCard : EventCard

  const eventsByDay = (day) => visibleEvents.filter((ev) => ev.day === day)

  return (
    <div className="app">
      <header className="hero">
        <h1>Interactive calendar</h1>
        <p>
          Drag events between days, then flip the switches below to see, in real time, what
          React.memo, useCallback, and useMemo actually do to re-renders.
        </p>
      </header>

      <section className="panel controls">
        <div className="controls-grid">
          <Toggle
            label="React.memo on cards"
            description="Skip a card's re-render when its own props haven't changed."
            checked={memoOn}
            onChange={setMemoOn}
          />
          <Toggle
            label="useCallback for handlers"
            description="Keep drag handlers referentially stable so memo isn't fooled."
            checked={callbackOn}
            onChange={setCallbackOn}
          />
          <Toggle
            label="useMemo for agenda filter"
            description="Cache the filtered list; recompute only when events or day change."
            checked={memoListOn}
            onChange={setMemoListOn}
          />
        </div>
        <div className="controls-footer">
          <Toggle
            label="Live clock"
            description="Ticks every 450ms to simulate unrelated state elsewhere in the app."
            checked={liveClockOn}
            onChange={setLiveClockOn}
          />
          <button className="reset-btn" onClick={resetCounters}>
            Reset counters
          </button>
        </div>
      </section>

      <section className="board">
        <div className="panel week">
          <div className="week-header">
            <h2>Week view</h2>
            <div className="tag-filters">
              {Object.keys(TAGS).map((tag) => (
                <button
                  key={tag}
                  className={`tag-chip ${activeTags.has(tag) ? 'active' : ''}`}
                  style={{ '--chip-color': TAGS[tag] }}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="week-grid">
            {DAYS.map((day) => (
              <div
                key={day}
                className="day-column"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(day, e)}
              >
                <div className="day-label">{day}</div>
                <div className="day-cards">
                  {eventsByDay(day).map((event) => (
                    <Card
                      key={event.id}
                      event={event}
                      onDragStart={onDragStart}
                      onEdit={onEdit}
                      logRender={logRender}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <RenderMonitor events={events} renderCounts={renderCounts} totalRenders={totalRenders} />
      </section>

      <footer className="clock-readout">
        {liveClockOn ? `Live clock tick #${tick}` : 'Live clock is off'}
      </footer>
    </div>
  )
}
