import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Componentes
import NavBar from "./Navbar";
import Footer from "./Footer";

//Paginas
import Home from "../Paginas/Home";
import EDA from "../Paginas/EDA";
import PCA from "../Paginas/PCA";
import PronosticoArboles from "../Paginas/Pronóstico Arboles";

export default function Main() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/EDA" element={<EDA />} />
          <Route exact path="/PCA" element={<PCA />} />
          <Route exact path="/Pronóstico Arboles" element={<PronosticoArboles />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}
