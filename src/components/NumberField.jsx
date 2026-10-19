export default function NumberField({ id, label, value, onChange, min = 0, step = 'any', hint, prefix }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrap">
        {prefix && <span className="prefix" aria-hidden="true">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
      </div>
      {hint && <small>{hint}</small>}
    </div>
  );
}
