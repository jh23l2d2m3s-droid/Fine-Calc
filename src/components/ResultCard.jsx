import { useState } from 'react';
import { money } from '../utils/finance.js';
import ScheduleTable from './ScheduleTable.jsx';

export default function ResultCard({ result, currency, onSave }) {
  const [feedback, setFeedback] = useState('');

  if (!result) {
    return (
      <section className="panel empty" aria-live="polite">
        <div className="empty-icon">▤</div>
        <h2>Tu resultado aparecerá aquí</h2>
        <p>Completa los campos y pulsa Calcular.</p>
      </section>
    );
  }

  const flash = (msg) => { setFeedback(msg); setTimeout(() => setFeedback(''), 2000); };

  const copy = async () => {
    const text = `${result.mainLabel}: ${money(result.main, currency)} | Monto total: ${money(result.total, currency)} | Intereses: ${money(result.interest, currency)}`;
    try { await navigator.clipboard.writeText(text); flash('¡Copiado!'); } catch { flash('No se pudo copiar'); }
  };

  return (
    <section className="panel results" aria-live="polite">
      <h2>Resultado de tu simulación</h2>
      <div className="hero-result">
        <span>{result.mainLabel}</span>
        <strong>{money(result.main, currency)}</strong>
      </div>
      <div className="metric"><span>Monto total</span><strong>{money(result.total, currency)}</strong></div>
      <div className="metric"><span>Intereses generados / pagados</span><strong>{money(result.interest, currency)}</strong></div>

      <div className="actions">
        <button type="button" className="secondary" onClick={copy}>Copiar resultado</button>
        <button type="button" className="secondary" onClick={() => { onSave(); flash('Guardado en historial'); }}>Guardar</button>
      </div>
      <p className="toast" role="status">{feedback}</p>

      <ScheduleTable result={result} currency={currency} />
      <p className="disclaimer">Simulación educativa. No incluye comisiones, impuestos, seguros ni otros cargos.</p>
    </section>
  );
}
