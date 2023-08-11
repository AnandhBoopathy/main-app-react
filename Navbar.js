import { Link } from 'react-router-dom'

// styles
import './Navbar.css'
import Searchbar from './Searchbar'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>Application Health</h1>
        </Link>
        <Searchbar />
      </nav>
    </div>
  )
}
