import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingpage";
import PrincipalPage from "./components/principalpage";
//importar estilos
import "./styles/landingpage.css";
import "./styles/cards.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/inicio" element={<PrincipalPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
