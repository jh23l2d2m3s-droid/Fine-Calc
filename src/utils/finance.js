// Lógica financiera pura (sin React). Las tasas son porcentajes anuales: 12 = 12%.

export const CURRENCIES = {
  DOP: { label: 'RD$ (Peso dominicano)', locale: 'es-DO' },
  USD: { label: 'US$ (Dólar)', locale: 'en-US' },
};

export const money = (amount, currency = 'DOP') =>
  new Intl.NumberFormat(CURRENCIES[currency]?.locale ?? 'es-DO', {
    style: 'currency',
    currency,
  }).format(amount);

const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Valor futuro con capitalización mensual y aportes mensuales opcionales. */
function futureValue(P, monthlyRate, months, deposit) {
  const growth = Math.pow(1 + monthlyRate, months);
  const annuity = monthlyRate === 0 ? deposit * months : deposit * ((growth - 1) / monthlyRate);
  return P * growth + annuity;
}

/**
 * calculate(type, principal, annualRate, years, monthlyDeposit)
 * Devuelve { main, mainLabel, total, interest, contributed, schedule, scheduleKind }
 * Lanza Error con mensaje comprensible si la entrada es inválida.
 */
export function calculate(type, principal, annualRate, years, monthlyDeposit = 0) {
  const P = Number(principal);
  const r = Number(annualRate) / 100;
  const t = Number(years);
  const D = Number(monthlyDeposit || 0);

  if (![P, r, t, D].every(Number.isFinite) || P <= 0 || r < 0 || t <= 0 || D < 0) {
    throw new Error('Introduce un capital y plazo mayores que cero y una tasa no negativa.');
  }

  if (type === 'simple') {
    const interest = P * r * t;
    const schedule = [];
    for (let y = 1; y <= Math.ceil(t); y++) {
      const yy = Math.min(y, t);
      const i = P * r * yy;
      schedule.push({ period: y, interest: i, balance: P + i });
    }
    return { main: interest, mainLabel: 'Interés generado', total: P + interest, interest, contributed: P, schedule, scheduleKind: 'yearly' };
  }

  if (type === 'compound' || type === 'savings') {
    const months = Math.round(t * 12);
    if (months < 1) throw new Error('El plazo debe ser de al menos un mes.');
    const mr = r / 12;
    const deposit = type === 'savings' ? D : 0;
    const total = futureValue(P, mr, months, deposit);
    const contributed = P + deposit * months;
    const schedule = [];
    for (let y = 1; y <= Math.ceil(months / 12); y++) {
      const m = Math.min(y * 12, months);
      const bal = futureValue(P, mr, m, deposit);
      const contrib = P + deposit * m;
      schedule.push({ period: y, contributed: contrib, interest: bal - contrib, balance: bal });
    }
    return {
      main: total,
      mainLabel: type === 'savings' ? 'Ahorro proyectado' : 'Monto futuro',
      total,
      interest: total - contributed,
      contributed,
      schedule,
      scheduleKind: 'yearly',
    };
  }

  if (type === 'loan') {
    const months = Math.round(t * 12);
    if (months < 1) throw new Error('El plazo debe ser de al menos un mes.');
    const mr = r / 12;
    const payment = mr === 0 ? P / months : (P * mr) / (1 - Math.pow(1 + mr, -months));
    const total = payment * months;
    const schedule = [];
    let balance = P;
    for (let m = 1; m <= months; m++) {
      const interest = balance * mr;
      const principalPaid = payment - interest;
      balance = Math.max(0, balance - principalPaid);
      schedule.push({ period: m, payment, principal: principalPaid, interest, balance });
    }
    return { main: payment, mainLabel: 'Cuota mensual', total, interest: total - P, contributed: P, schedule, scheduleKind: 'monthly', months };
  }

  throw new Error('Selecciona un cálculo válido.');
}

export { round2 };
