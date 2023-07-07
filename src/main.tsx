import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Router } from './router/Router.tsx'
import { Route } from './router/Route.tsx'
import About from './pages/About.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Route path='/' component={<App />} />
    <Route path='/about' component={<About />} />
  </Router>
)
