import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import store from "./store";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import ConnexionPage from "./pages/ConnexionPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ListReservation from "./pages/ListReservation";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <header className="header">
            <Logo />
            <div className="nav-buttons">
              <NavButtons currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </div>
          </header>
          <Routes>
            <Route path="/" element={<ConnexionPage />} />
            <Route path="/reserve" element={<ReservationPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/sinscrire" element={<RegisterPage />} />
            <Route path="/reservations" element={<ListReservation />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

const Logo = () => {
  return (
    <div className="logo">
      <LocationOnIcon style={{ fontSize: 30, marginRight: "10px", color: "#34D399" }} />
      PlaceLibre
    </div>
  );
};

const NavButtons = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/"); 
  };

  return (
    <div className="nav-buttons">
      {currentUser ? (
        <>
          <div className="welcome-container">
            <span className="welcome-message">Bienvenue, {currentUser.fullName} !</span>
            <button className="nav-btn" onClick={() => navigate("/reservations")}>
            Réservations
          </button>
          </div>
          <button className="nav-btn" onClick={handleLogout}>
              Déconnexion
            </button>
        </>
      ) : (
        <>
          <button className="nav-btn" onClick={() => navigate("/")}>
            Connexion
          </button>
          <button className="nav-btn" onClick={() => navigate("/sinscrire")}>
            S'inscrire
          </button>
        </>
      )}
    </div>
  );
};

export default App;
