import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import ContattiPage from "./components/pagineContatti/ContattiPage";
import MenuPage from "./components/pagineContatti/MenuPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/navbar/navbar";
import { Spinner, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setError("Errore di caricamento dati! Riprova più tardi."); // Scommentare per testare l'errore
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
          {/* qui si possono aggiungiere altre route  */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
