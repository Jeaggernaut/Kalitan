import './AnimatedBackground.css'

export default function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="animated-background__grid" />
      <div className="animated-background__glow animated-background__glow--one" />
      <div className="animated-background__glow animated-background__glow--two" />
      <div className="animated-background__glow animated-background__glow--three" />
      <div className="animated-background__leaf animated-background__leaf--one" />
      <div className="animated-background__leaf animated-background__leaf--two" />
      <div className="animated-background__leaf animated-background__leaf--three" />
    </div>
  )
}
