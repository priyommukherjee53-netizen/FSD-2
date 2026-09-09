export default function RenderMonitor({ events, renderCounts, totalRenders }) {
  const rendered = Object.keys(renderCounts).length
  const maxCount = Math.max(1, ...Object.values(renderCounts))

  return (
    <div className="panel monitor">
      <h2>Render monitor</h2>

      <div className="monitor-stats">
        <div>
          <div className="stat-number">{totalRenders}</div>
          <div className="stat-label">total renders logged</div>
        </div>
        <div>
          <div className="stat-number">
            {rendered}/{events.length}
          </div>
          <div className="stat-label">cards that have rendered</div>
        </div>
      </div>

      <ul className="monitor-list">
        {events.map((event) => {
          const count = renderCounts[event.id] || 0
          const width = Math.round((count / maxCount) * 100)
          return (
            <li key={event.id} className="monitor-row">
              <span className="monitor-name">{event.title}</span>
              <span className="monitor-bar-track">
                <span className="monitor-bar-fill" style={{ width: `${width}%` }} />
              </span>
              <span className="monitor-count">{count}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
