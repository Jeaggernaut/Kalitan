export default function RadioButton({ name, options = [], value, onChange }) {
  return (
    <div>
      {options.map((o) => (
        <label key={o.value} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={onChange} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
