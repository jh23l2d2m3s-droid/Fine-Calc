# FinanCalc React

Calculadora financiera hecha con **React + Vite + JavaScript + CSS** (mobile first), siguiendo la guía *FinanCalc – Paso a paso* y con el estilo y las funciones extra de *finanClick*.

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # pruebas guiadas de las fórmulas
npm run build
```

## Modalidades
Préstamo (cuota francesa + tabla de amortización), interés simple, interés compuesto (capitalización mensual) y ahorro (con aporte mensual opcional).

## Estructura
```
src/
  main.jsx / App.jsx      Punto de entrada y estado (useState, useEffect)
  styles.css              Diseño mobile first (desde 320 px)
  components/             Header, CalculatorTabs, CalculatorForm, NumberField,
                          ResultCard, ScheduleTable, HistoryPanel
  utils/finance.js        Fórmulas y moneda (sin React)
  utils/finance.test.js   Casos de la sección 11 de la guía
```

## Qué se tomó de cada fuente
- **Guía / FinanCalc:** arquitectura de componentes, inputs controlados, `calculate()` separado de la UI, validaciones, RD$.
- **finanClick:** paleta azul/verde/morado, tipografías, tabla de amortización, ahorro con aportes mensuales, historial en `localStorage`, selector de moneda.

Simulación educativa: no incluye comisiones, impuestos ni seguros.
