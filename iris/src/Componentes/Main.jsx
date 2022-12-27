import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Componentes
import NavBar from "./Navbar";
import Footer from "./Footer";

//Paginas
import Home from "../Paginas/Home";
import EDA from "../Paginas/EDA";
import PCA from "../Paginas/PCA";
import Pronostico from "../Paginas/Pronostico";
import Clasificacion from "../Paginas/Clasificacion";
import Hibridos from "../Paginas/Hibridos";

export default function Main() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/EDA" element={<EDA />} />
          <Route exact path="/PCA" element={<PCA />} />
          <Route exact path="/Pronostico" element={<Pronostico />} />
          <Route exact path="/Clasificacion" element={<Clasificacion />} />
          <Route exact path="/Hibridos" element={<Hibridos />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
