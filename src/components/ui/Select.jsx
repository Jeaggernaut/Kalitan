export default function Select({ label, name, value, onChange, options = [] }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      {label && <div style={{ fontSize: 14, color: '#22543d', marginBottom: 6 }}>{label}</div>}
      <select name={name} value={value} onChange={onChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0' }}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
