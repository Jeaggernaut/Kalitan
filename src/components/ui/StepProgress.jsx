import './StepProgress.css';

export default function StepProgress({ step = 1 }) {
  const labels = ['Información personal', 'Disponibilidad', 'Preferencias', 'Confirmación'];
  return (
    <div className="kp-step">
      {labels.map((label, i) => {
        const index = i + 1;
        const active = index === step;
        const done = index < step;
        return (
          <div key={label} className={`kp-step__item ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
            <div className="kp-step__circle">{done ? '✓' : index}</div>
            <div className="kp-step__label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}
