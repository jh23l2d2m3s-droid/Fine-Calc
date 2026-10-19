import { useState } from 'react';
import { money } from '../utils/finance.js';

export default function ScheduleTable({ result, currency }) {
  const [open, setOpen] = useState(false);
  const { schedule, scheduleKind } = result;
  if (!schedule?.length) return null;
  const monthly = scheduleKind === 'monthly';
  const m = (n) => money(n, currency);

  return (
    <div className="schedule">
      <button type="button" className="link" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? 'Ocultar' : 'Ver'} {monthly ? 'tabla de amortización' : 'evolución por año'}
      </button>
      {open && (
        <div className="table-scroll">
          <table>
            <thead>
              {monthly ? (
                <tr><th>Mes</th><th>Cuota</th><th>Capital</th><th>Interés</th><th>Saldo</th></tr>
              ) : (
                <tr><th>Año</th>{schedule[0].contributed !== undefined && <th>Aportado</th>}<th>Interés</th><th>Total</th></tr>
              )}
            </thead>
            <tbody>
              {schedule.map((row) =>
                monthly ? (
                  <tr key={row.period}><td>{row.period}</td><td>{m(row.payment)}</td><td>{m(row.principal)}</td><td>{m(row.interest)}</td><td>{m(row.balance)}</td></tr>
                ) : (
                  <tr key={row.period}><td>{row.period}</td>{row.contributed !== undefined && <td>{m(row.contributed)}</td>}<td>{m(row.interest)}</td><td>{m(row.balance)}</td></tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
