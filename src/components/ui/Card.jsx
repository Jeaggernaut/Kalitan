export default function Card({ children, className = '' }) {
  return (
    <div className={`kp-card ${className}`} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 6px 18px rgba(16,24,40,0.06)' }}>
      {children}
    </div>
  );
}
