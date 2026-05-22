import './Button.css';

export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled }) {
  return (
    <button className={`kp-btn kp-btn--${variant}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
