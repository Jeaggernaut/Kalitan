import './Benefits.css'
import Card from '../Card/Card'

export default function Benefits({ title, description, items, variant = 'primary' }) {
  return (
    <section className={`benefits benefits--${variant}`}>
      <div className="section-header">
        <span className="eyebrow">{title}</span>
        <h2>{description}</h2>
      </div>
      <div className="benefits__list">
        {items.map((item) => (
          <Card key={item} className="benefits__item">
            <p>{item}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
