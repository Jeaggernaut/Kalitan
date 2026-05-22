import './About.css'
import Card from '../Card/Card'
import { aboutItems } from '../../utils/content'

export default function About() {
  return (
    <section className="about" id="nosotros">
      <div className="section-header">
        <span className="eyebrow">Nosotros</span>
        <h2>Impulsamos una economía circular cercana y responsable.</h2>
      </div>
      <div className="about__grid">
        {aboutItems.map((item) => (
          <Card key={item.title} className="about__card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
