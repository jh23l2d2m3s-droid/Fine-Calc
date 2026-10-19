export const options = [
  { value: 'loan', label: 'Préstamo', icon: '$' },
  { value: 'simple', label: 'Interés simple', icon: '%' },
  { value: 'compound', label: 'Interés compuesto', icon: '∞' },
  { value: 'savings', label: 'Ahorro', icon: '◆' },
];

export default function CalculatorTabs({ value, onChange }) {
  return (
    <div className="tabs" role="group" aria-label="Tipo de cálculo">
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          className={value === o.value ? `tab active t-${o.value}` : 'tab'}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
        >
          <span aria-hidden="true">{o.icon}</span> {o.label}
        </button>
      ))}
    </div>
  );
}
