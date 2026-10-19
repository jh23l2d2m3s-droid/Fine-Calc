import { money } from '../utils/finance.js';
import { options } from './CalculatorTabs.jsx';

const labelOf = (v) => options.find((o) => o.value === v)?.label ?? v;

export default function HistoryPanel({ items, onLoad, onDelete, onClear }) {
  if (!items.length) return null;
  return (
    <section className="panel history" aria-label="Historial de simulaciones">
      <div className="history-head">
        <h2>Historial</h2>
        <button type="button" className="link" onClick={onClear}>Borrar todo</button>
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <button type="button" className="history-item" onClick={() => onLoad(it)}>
              <span className="h-type">{labelOf(it.type)}</span>
              <span className="h-main">{it.mainLabel}: <strong>{money(it.main, it.currency)}</strong></span>
              <span className="h-sub">{money(Number(it.values.principal), it.currency)} · {it.values.rate}% · {it.values.years} años · {it.date}</span>
            </button>
            <button type="button" className="icon-btn" onClick={() => onDelete(it.id)} aria-label="Eliminar simulación">✕</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
