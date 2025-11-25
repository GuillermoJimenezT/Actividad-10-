import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App
