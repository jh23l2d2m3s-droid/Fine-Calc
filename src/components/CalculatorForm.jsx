import NumberField from './NumberField.jsx';
import { CURRENCIES } from '../utils/finance.js';

const SYMBOL = { DOP: 'RD$', USD: 'US$' };

export default function CalculatorForm({ values, onFieldChange, onSubmit, onReset, type, currency, onCurrencyChange }) {
  const sym = SYMBOL[currency];
  return (
    <form onSubmit={onSubmit} className="panel form">
      <h2>Datos de la simulación</h2>

      <div className="field">
        <label htmlFor="currency">Moneda</label>
        <select id="currency" value={currency} onChange={(e) => onCurrencyChange(e.target.value)}>
          {Object.entries(CURRENCIES).map(([code, c]) => (
            <option key={code} value={code}>{c.label}</option>
          ))}
        </select>
      </div>

      <NumberField id="principal" prefix={sym} label={type === 'loan' ? `Monto del préstamo (${sym})` : `Capital inicial (${sym})`} value={values.principal} onChange={(v) => onFieldChange('principal', v)} />
      <NumberField id="rate" prefix="%" label="Tasa de interés anual (%)" value={values.rate} onChange={(v) => onFieldChange('rate', v)} />
      <NumberField
        id="years"
        prefix="⏱"
        label="Plazo (años)"
        value={values.years}
        onChange={(v) => onFieldChange('years', v)}
        hint={type === 'loan' ? 'Ejemplo: 1.5 equivale a 18 meses.' : 'Puedes utilizar decimales, por ejemplo 2.5 años.'}
      />
      {type === 'savings' && (
        <NumberField id="deposit" prefix={sym} label={`Aporte mensual (${sym})`} value={values.deposit} onChange={(v) => onFieldChange('deposit', v)} hint="Opcional. Deja 0 si solo harás un depósito inicial." />
      )}

      <div className="actions">
        <button className="primary" type="submit">Calcular</button>
        <button className="secondary" type="button" onClick={onReset}>Limpiar</button>
      </div>
    </form>
  );
}
