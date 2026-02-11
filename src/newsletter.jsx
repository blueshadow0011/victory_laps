import './App.css'
import Cards from './newscard.jsx'
export default function Newsletter() {



    return(
        
        <div className='newsletter'>
            <div className='header'>
                <h1>Victory Laps Newsletters</h1>
            </div>
            <div className='cards'>
                <Cards image={''} title={'March 2026'} link={'/newsletter1'}/>
            </div>
        </div>

    
    )
}