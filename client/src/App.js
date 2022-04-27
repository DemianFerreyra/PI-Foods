import './App.css';
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/landingpage';
import PrincipalPage from './components/principalpage';
//importar estilos
import './styles/landingpage.css'

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/inicio" element={<PrincipalPage/>} />
      </Routes>  
    </div>
  );
}

export default App;
