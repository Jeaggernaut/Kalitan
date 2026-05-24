import { Bell, ChevronDown, Menu } from 'lucide-react'
import { beneficiaryProfile } from '../mock/beneficiaryMockData'

export default function BeneficiaryTopbar({ onMenuClick }) {
  return (
    <header className="beneficiary-topbar">
      <button className="beneficiary-topbar__menu" type="button" aria-label="Abrir menu" onClick={onMenuClick}>
        <Menu size={22} />
      </button>
      <div>
        <span>Hola, {beneficiaryProfile.name.split(' ')[0]}</span>
        <h1>Nos alegra tenerte aqui.</h1>
        <p>Hay apoyos disponibles para ti y tu familia.</p>
      </div>
      <div className="beneficiary-topbar__actions">
        <button className="beneficiary-topbar__notification" type="button" aria-label="Notificaciones">
          <Bell size={22} />
          <span>{beneficiaryProfile.notifications}</span>
        </button>
        <button className="beneficiary-topbar__profile" type="button">
          <span>{beneficiaryProfile.initials}</span>
          <strong>{beneficiaryProfile.name}</strong>
          <ChevronDown size={18} />
        </button>
      </div>
    </header>
  )
}
