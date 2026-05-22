export default function InfoPanel({ title, children }) {
  return (
    <div style={{ background: '#f0fff4', borderRadius: 10, padding: 16, border: '1px solid #e6fffa' }}>
      {title && <div style={{ fontWeight: 700, color: '#22543d', marginBottom: 8 }}>{title}</div>}
      <div style={{ color: '#2d3748' }}>{children}</div>
    </div>
  );
}
