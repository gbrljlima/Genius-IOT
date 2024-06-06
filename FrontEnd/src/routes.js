import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ranking from './Pages/Ranking';
import Registro from './Pages/Registro';


function RoutesApp() {
  
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Registro/>}/> 
                <Route path='/ranking' element={<Ranking/>}/> 
            </Routes>
        </BrowserRouter>
    );           
  };
  
  export default RoutesApp;