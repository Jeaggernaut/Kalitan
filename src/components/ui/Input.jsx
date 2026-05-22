import './Input.css';

export default function Input({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <label className="kp-input">
      {label && <span className="kp-input__label">{label}</span>}
      <input className="kp-input__field" name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </label>
  );
}
