import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reserveParking } from "../store/actions/parkingActions";
import "./ReservationPage.css"; 

const ReservationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { parking } = location.state || {};

  const [currentUser, setCurrentUser] = useState(null);
  const [reservationData, setReservationData] = useState({
    nomComplet: "",
    cin: "",
    date: "",
    heure_debut: "",  
    heure_fin: "",    
  });
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser")); 
    if (!user) {
      navigate("/");
    } else {
      setCurrentUser(user); 
    }

    if (!parking) {
      navigate("/home"); 
    }
  }, [parking, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const calculatePrice = (heureDebut, heureFin, parking) => {
    if (!parking || !parking.pricing) {
      return "Tarif non défini";
    }
  
    const tarifHoraire = parking.pricing.hourlyRate;
  
    if (!heureDebut || !heureFin) {
      return "Tarif non défini";
    }
  
    const [hDeb, mDeb] = heureDebut.split(":").map(Number);
    const [hFin, mFin] = heureFin.split(":").map(Number);
  
    const debutMinutes = hDeb * 60 + mDeb;
    const finMinutes = hFin * 60 + mFin;
    if (finMinutes <= debutMinutes) {
      return "Tarif non défini";
    }
  
    const dureeHeures = (finMinutes - debutMinutes) / 60;
  
    const prixFinal = (dureeHeures * tarifHoraire).toFixed(2);
    
    return prixFinal;
  };
  
  
  const handleSubmit = () => {
    const { nomComplet, cin, date, heure_debut, heure_fin } = reservationData;
  
    if (!nomComplet || !cin || !date || !heure_debut || !heure_fin) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const prix = calculatePrice(heure_debut, heure_fin, parking);
  
    if (prix === "Tarif non défini") {
      alert("Impossible de calculer le prix. Vérifiez les informations.");
      return;
    }
  
    const reservation = {
      ...reservationData,
      parkingName: parking.name,
      parkingId: parking.id,
      reservedBy: currentUser.email,
      prix,
    };
  
  
    dispatch(reserveParking(reservation));
    alert(`Réservation confirmée ! Prix à payer : ${prix} MAD`);
    navigate("/reservations");
  };
  
  

  return (
    <div className="reservation-page">
      <h1>Réserver un parking : {parking ? parking.name : "Pas de parking sélectionné"}</h1>

      <div className="reservation-form">
        <input
          type="text"
          name="nomComplet"
          placeholder="Nom complet"
          value={reservationData.nomComplet}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cin"
          placeholder="CIN"
          value={reservationData.cin}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={reservationData.date}
          onChange={handleInputChange}
        />
        <label>De :</label>
        <input 
        type="time" 
        name="heure_debut" 
        value={reservationData.heure_debut} 
        onChange={handleInputChange} />
        <label>A :</label>
        <input 
        type="time" 
        name="heure_fin" 
        value={reservationData.heure_fin} 
        onChange={handleInputChange} />

        <button onClick={handleSubmit}>Confirmer la réservation</button>
      </div>
    </div>
  );
};

export default ReservationPage;
