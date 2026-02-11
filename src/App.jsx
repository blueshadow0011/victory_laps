import { BrowserRouter, Route, Routes,Link } from 'react-router-dom'
import Home from './Home.jsx'
import Navi from './Header.jsx'
import Newsletter from './newsletter.jsx'
export default function App(){
    return(
    <BrowserRouter>
    {/* this puts my navbar above everything else */}
    <Navi/>    
    
        
        

        {/* this is using the react router module so I can link to diffrent webpages  */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Newsletter' element={<Newsletter/>} />
        </Routes>
        
    </BrowserRouter>
    )

}