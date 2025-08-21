import React, { useState } from "react";
import { Container, Box, Button, Typography, TextField, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  if (!reservation) {
    return <Typography variant="h5" align="center">Aucune réservation trouvée.</Typography>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    console.log("Paiement effectué avec les détails:", cardDetails);
    alert("Paiement confirmé!");

    navigate("/confirmation", { state: { reservation } });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, border: "1px solid #444", borderRadius: 2, backgroundColor: "#333" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#fff" }}>
          Page de Paiement
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Numéro de carte"
              fullWidth
              variant="outlined"
              name="cardNumber"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#444",
                color: "#fff",
                "& .MuiInputLabel-root": { color: "#fff", 
                  "&.Mui-focused": { color: "#fff" }
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#777" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nom sur la carte"
              fullWidth
              variant="outlined"
              name="cardName"
              value={cardDetails.cardName}
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#444",
                color: "#fff",
                "& .MuiInputLabel-root": { color: "#fff", 
                  "&.Mui-focused": { color: "#fff" }
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#777" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date d'expiration (MM/AA)"
              fullWidth
              variant="outlined"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#444",
                color: "#fff",
                "& .MuiInputLabel-root": { 
                  color: "#fff", 
                  "&.Mui-focused": { color: "#fff" }
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#777" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVV"
              fullWidth
              variant="outlined"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              sx={{
                backgroundColor: "#444",
                color: "#fff",
                "& .MuiInputLabel-root": { 
                  color: "#fff", 
                  "&.Mui-focused": { color: "#fff" }
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#777" },
                  "&:hover fieldset": { borderColor: "#fff" },
                  "&.Mui-focused fieldset": { borderColor: "#fff" },
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            sx={{
              backgroundColor: "#555",
              color: "#fff",
              "&:hover": { backgroundColor: "#333" },
              width: "100%",
              padding: "10px",
            }}
          >
            Confirmer le paiement
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              width: "100%",
              padding: "10px",
              "&:hover": { borderColor: "#ddd", color: "#ddd" },
            }}
          >
            Retour à la page d'accueil
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentPage;
