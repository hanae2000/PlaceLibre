import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import jsPDF from "jspdf";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return <Typography variant="h5" align="center">Aucune réservation trouvée.</Typography>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Détails de la réservation", 20, 20);
    doc.setFontSize(12);
    doc.text(`Nom: ${reservation.nomComplet}`, 20, 40);
    doc.text(`CIN: ${reservation.cin}`, 20, 50);
    doc.text(`Parking: ${reservation.parkingName}`, 20, 60);
    doc.text(`Date: ${reservation.date}`, 20, 70);
    doc.text(`Heure: ${reservation.heure_debut} - ${reservation.heure_fin}`, 20, 80);
    doc.save("reservation.pdf");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ p: 3, border: "2px solid #666", borderRadius: 2, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'black' }}> 
          <CheckCircleIcon sx={{ color: "green", fontSize: 40, marginRight: 1 }} />
          Réservation confirmée ! Merci pour votre confiance.
        </Typography>
        
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>Télécharger PDF</Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate("/home")}>Retour Accueil</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
