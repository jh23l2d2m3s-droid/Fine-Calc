// Pruebas guiadas de la guía (sección 11). Ejecutar: npm test
import assert from 'node:assert/strict';
import { calculate } from './finance.js';

const near = (a, b) => assert.ok(Math.abs(a - b) < 0.005, `${a} ≉ ${b}`);

let r = calculate('simple', 1000, 12, 2);
near(r.interest, 240); near(r.total, 1240);

r = calculate('compound', 1000, 0, 2);
near(r.total, 1000);

r = calculate('loan', 1200, 0, 1);
near(r.main, 100);

assert.throws(() => calculate('loan', -100, 12, 2), /mayores que cero/);

// Ahorro con aportes: 1000 inicial + 200/mes, 6% anual, 10 años
r = calculate('savings', 1000, 6, 10, 200);
near(r.contributed, 25000);
near(r.total, 1000 * Math.pow(1.005, 120) + 200 * ((Math.pow(1.005, 120) - 1) / 0.005));

// La amortización termina en saldo 0
r = calculate('loan', 10000, 12, 1);
near(r.schedule.at(-1).balance, 0);
near(r.main, 888.49);

console.log('✔ Todas las pruebas pasaron');
