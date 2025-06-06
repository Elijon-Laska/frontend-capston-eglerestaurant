import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import ContattiPage from "./components/pagineContatti/ContattiPage";
import MenuPage from "./components/pagineContatti/MenuPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/navbar/navbar";
import { Spinner, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import DashboardAdmin from "./components/DashboardAdmin";
import { getCurrentUser } from "./redux/actions";
import { useDispatch } from "react-redux";
import PrenotazioniPage from "./components/admin/PrenotazioniPage";
import UtentiPage from "./components/admin/UtentiPage";
import ImmaginiPage from "./components/admin/ImmaginiPage";
import Piatti from "./components/admin/Piatti";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getCurrentUser());
    }

    const timer = setTimeout(() => {
      // setError("Errore di caricamento dati! Riprova più tardi."); // Scommentare per testare l'errore
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        <Spinner animation="border" variant="primary" style={{ width: 70, height: 70, marginBottom: 20 }} />
        <div style={{ color: "primary", fontWeight: "bold", fontSize: 22 }}>
          Caricamento in corso... Benvenuto da E G L E!
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.85)",
        }}
      >
        <Alert variant="danger" style={{ fontSize: 20, fontWeight: "bold" }}>
          <span role="img" aria-label="errore">
            ❌
          </span>
          {error}
        </Alert>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="main-content">
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contatti" element={<ContattiPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/prenotazioni" element={<PrenotazioniPage />} />
          <Route path="/admin/utenti" element={<UtentiPage />} />
          <Route path="/admin/immagini" element={<ImmaginiPage />} />
          <Route path="/admin/piatti" element={<Piatti />} />

          {/* qui si possono aggiungiere altre route  */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
