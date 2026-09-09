import React, { useEffect, useRef } from 'react'
import { TAGS } from '../data/events'

/**
 * EventCardBase renders one event pill and reports every time its function
 * body actually runs. When React.memo wraps it and props are referentially
 * equal to the previous render, this function body does NOT run at all —
 * that's the whole point of the demo.
 */
function EventCardBase({ event, onDragStart, onEdit, logRender }) {
  const mounted = useRef(false)

  useEffect(() => {
    logRender(event.id)
  })

  useEffect(() => {
    mounted.current = true
  }, [])

  return (
    <div
      className="event-card"
      style={{ borderLeftColor: TAGS[event.tag] || '#7C9CFF' }}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      onClick={() => onEdit(event.id)}
      title="Drag me to another day, or click to edit"
    >
      <div className="event-time">{event.time}</div>
      <div className="event-title">{event.title}</div>
    </div>
  )
}

export const EventCard = EventCardBase
export const MemoEventCard = React.memo(EventCardBase)
