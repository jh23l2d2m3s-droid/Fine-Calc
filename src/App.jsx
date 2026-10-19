import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CalculatorTabs from './components/CalculatorTabs.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';
import { calculate } from './utils/finance.js';

const initial = { principal: '100000', rate: '12', years: '2', deposit: '0' };
const KEY = 'financalc_history';

const loadHistory = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; } catch { return []; }
};

export default function App() {
  const [type, setType] = useState('loan');
  const [values, setValues] = useState({ ...initial });
  const [currency, setCurrency] = useState('DOP');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => { document.title = 'FinanCalc | Calculadora financiera'; }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(history)); } catch { /* sin almacenamiento */ }
  }, [history]);

  const clearOutput = () => { setResult(null); setError(''); };
  const changeType = (next) => { setType(next); clearOutput(); };
  const changeField = (field, value) => { setValues((prev) => ({ ...prev, [field]: value })); clearOutput(); };

  const run = (t, v) => {
    try {
      setResult(calculate(t, v.principal, v.rate, v.years, v.deposit));
      setError('');
    } catch (err) {
      setResult(null);
      setError(err.message);
    }
  };

  const submit = (event) => { event.preventDefault(); run(type, values); };
  const reset = () => { setValues({ ...initial }); clearOutput(); };

  const save = () => {
    if (!result) return;
    setHistory((h) => [
      { id: Date.now(), type, currency, values: { ...values }, main: result.main, mainLabel: result.mainLabel, date: new Date().toLocaleDateString('es-DO') },
      ...h,
    ].slice(0, 20));
  };

  const loadItem = (item) => {
    setType(item.type); setValues({ ...initial, ...item.values }); setCurrency(item.currency);
    run(item.type, { ...initial, ...item.values });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <main className="shell">
        <div className="intro">
          <span className="eyebrow">HERRAMIENTAS FINANCIERAS</span>
          <h1>Calcula con confianza</h1>
          <p>Explora tus préstamos, intereses y ahorros en segundos.</p>
        </div>

        <CalculatorTabs value={type} onChange={changeType} />
        {error && <p className="error" role="alert">{error}</p>}

        <div className="layout">
          <CalculatorForm type={type} values={values} onFieldChange={changeField} onSubmit={submit} onReset={reset} currency={currency} onCurrencyChange={(c) => { setCurrency(c); clearOutput(); }} />
          <ResultCard result={result} currency={currency} onSave={save} />
        </div>

        <HistoryPanel items={history} onLoad={loadItem} onDelete={(id) => setHistory((h) => h.filter((x) => x.id !== id))} onClear={() => setHistory([])} />
      </main>
      <footer className="shell footer">FinanCalc · Proyecto educativo desarrollado con React JS</footer>
    </>
  );
}
