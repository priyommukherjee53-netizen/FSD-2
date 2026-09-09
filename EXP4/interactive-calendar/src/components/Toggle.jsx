export default function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="toggle-row">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch ${checked ? 'on' : 'off'}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-knob" />
      </button>
      <span className="toggle-copy">
        <span className="toggle-label">{label}</span>
        <span className="toggle-desc">{description}</span>
      </span>
    </label>
  )
}
