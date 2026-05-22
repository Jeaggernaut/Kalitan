import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="kp-navbar">
      <div className="kp-navbar__brand">Kalitán</div>
      <div className="kp-navbar__links">
        <Link to="/">Inicio</Link>
        <Link to="/register-volunteer">Voluntariado</Link>
      </div>
    </nav>
  );
}
