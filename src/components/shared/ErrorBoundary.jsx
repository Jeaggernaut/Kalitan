import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('Kalitán render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error" role="alert">
          <div>
            <span>Kalitán</span>
            <h1>No pudimos cargar la interfaz.</h1>
            <p>Actualiza la página o reinicia el servidor de desarrollo para volver a intentarlo.</p>
            <button type="button" onClick={() => window.location.reload()}>
              Recargar
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
