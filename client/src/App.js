import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingpage";
import PrincipalPage from "./components/principalpage";
import CreatePage from "./components/createpage";
import Detail from "./components/detail";
//importar estilos
import "./styles/landingpage.css";
import "./styles/cards.css";
import "./styles/loader.css"
import "./styles/principalpage.css"
import "./styles/createpage.css"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/inicio" element={<PrincipalPage />} />
          <Route exact path="/recipes/:id" element={<Detail />} />
          <Route exact path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
