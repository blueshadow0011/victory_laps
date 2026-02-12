import './App.css'
import Cards from './newscard.jsx'
import AnimatedContent from './AnimatedContent.jsx'
export default function Newsletter() {



    return(
        <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={false}
              duration={0.8}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1}
              threshold={0.1}
              delay={0}
          >
        <div className='vl-app'>
        <div className='newsletter'>
            <div className='header'>
                <h1>Victory Laps Newsletters</h1>
            </div>
            <div className='cards'>
                <Cards image={''} title={'March 2026'} link={'/newsletter1'}/>
            </div>
        </div>
        </div>
        </AnimatedContent>
    
    )
}