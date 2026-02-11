import { Link } from 'react-router-dom'

import './navi.css'

function Navi() {
  

  return (
    <>
      <nav>
        <div className='image'>
          <header className="vl-header">
            <h1>Victory Laps</h1>
          </header>
        </div>
        <div className='nav-a'>
        <Link to="/">Home</Link> 
        <Link to="/Newsletter">Newsletters</Link> 
        </div>
      </nav>
    </>
  )
}

export default Navi
