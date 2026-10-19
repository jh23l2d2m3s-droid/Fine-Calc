export default function Header() {
  return (
    <header className="header">
      <div className="shell header-inner">
        <div className="brand">
          <span className="logo" aria-hidden="true">↗</span>
          <span>FinanCalc</span>
          <span className="badge">React JS</span>
        </div>
        <p>Simula, compara y planifica tus finanzas.</p>
      </div>
    </header>
  );
}
