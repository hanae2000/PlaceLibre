import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteReservation, updateReservation } from "../store/actions/parkingActions";
import { List, ListItem, ListItemText, Button, Container, Typography, Box, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentIcon from "@mui/icons-material/Payment";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const ListReservation = () => {
  const reservationHistory = useSelector((state) => state.parking.reservationHistory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editForm, setEditForm] = useState({
    nomComplet: "",
    cin: "",
    date: "",
    heure_debut: "",
    heure_fin: "",
  });

  const handleDeleteReservation = (id) => {
    dispatch(deleteReservation(id));
    const updatedReservations = reservationHistory.filter((reservation) => reservation.id !== id);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  const handleEditReservation = (reservation) => {
    setEditingReservationId(reservation.id);
    setEditForm({
      nomComplet: reservation.nomComplet,
      cin: reservation.cin,
      date: reservation.date,
      heure_debut: reservation.heure_debut || "", 
      heure_fin: reservation.heure_fin || "", 
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdateReservation = () => {
    const updatedReservation = {
      id: editingReservationId,
      ...editForm,
    };

    dispatch(updateReservation(updatedReservation));

    const updatedReservations = reservationHistory.map((res) =>
      res.id === editingReservationId ? updatedReservation : res
    );
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));

    setEditingReservationId(null);
  };

  const handlePayment = (reservation) => {
    navigate("/payment", { state: { reservation } });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Liste des Réservations
        </Typography>
        {reservationHistory.length === 0 ? (
          <Typography align="center">Aucune réservation disponible</Typography>
        ) : (
          <List>
            {reservationHistory.map((reservation) => (
              <ListItem
                key={reservation.id}
                sx={{
                  mb: 2,
                  border: "2px solid #666",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {editingReservationId === reservation.id ? (
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <TextField
                      fullWidth
                      margin="dense"
                      label="Nom Complet"
                      name="nomComplet"
                      value={editForm.nomComplet}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      label="CIN"
                      name="cin"
                      value={editForm.cin}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      type="time"
                      name="heure_debut"
                      value={editForm.heure_debut}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      type="time"
                      name="heure_fin"
                      value={editForm.heure_fin}
                      onChange={handleInputChange}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                      <Button
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateReservation}
                        sx={{ mr: 1 }}
                      >
                        Modifier
                      </Button>
                      <Button
                        startIcon={<CancelIcon />}
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingReservationId(null)}
                      >
                        Annuler
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={`${reservation.nomComplet} - ${reservation.parkingName}`}
                      secondary={`CIN: ${reservation.cin}, Date: ${reservation.date}, Heure: ${reservation.heure_debut} - ${reservation.heure_fin}`}
                      sx={{
                        "& .MuiTypography-root": { color: "#333", fontWeight: "bold" },
                      }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 2 }}>
                      <Button
                        startIcon={<EditIcon />}
                        onClick={() => handleEditReservation(reservation)}
                        sx={{ mr: 1 }}
                      >
                        Modifier
                      </Button>
                      <Button
                        startIcon={<PaymentIcon />}
                        onClick={() => handlePayment(reservation)}
                        color="success"
                        sx={{ mr: 1 }}
                      >
                        Payer
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteReservation(reservation.id)}
                        color="error"
                      >
                        Supprimer
                      </Button>
                    </Box>
                  </>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{ backgroundColor: "#555", color: "#fff", "&:hover": { backgroundColor: "#333" } }}
        >
          Retour à l'Accueil
        </Button>
      </Box>
    </Container>
  );
};

export default ListReservation;
