import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const HomePage = () => {
  const navigate = useNavigate();
  const [parkings, setParkings] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredParkings, setFilteredParkings] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  useEffect(() => {
    setLoadingData(true);
    fetch("/data/parkings.json") 
      .then((response) => response.json())
      .then((data) => {
        setParkings(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error("Erreur : ", err);
        setLoadingData(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = parkings.filter((parking) =>
      parking.city.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredParkings(filtered);
  };

  const handleReserve = (parking) => {
    if (!isAuthenticated) {
      navigate("/reserve", { state: { parking } });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#333", fontWeight: "bold" }}>
          Rechercher des parkings par ville
        </Typography>
        <TextField
          fullWidth
          label="Entrez le nom de la ville"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{mb: 2,backgroundColor: "#fff",color: "#333",border: "2px solid #666",borderRadius: "4px",}}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{mb: 4,backgroundColor: "#444",color: "#fff","&:hover": { backgroundColor: "#222" },}}
        >
          Rechercher
        </Button>

        {loadingData ? (
          <CircularProgress />
        ) : filteredParkings.length === 0 && filter ? (
          <Typography sx={{ color: "#666" }}>Aucun parking trouvé pour cette ville</Typography>
        ) : (
          <List>
            {filteredParkings.map((parking) => (
              <ListItem
                key={parking.id}
                sx={{mb: 2,border: "2px solid #666", borderRadius: 4,p: 2,backgroundColor: "#f9f9f9",}}
              >
                <ListItemText
                  primary={parking.name}
                  secondary={`${parking.availableSpots} places disponibles`}
                  sx={{"& .MuiTypography-root": {color: "#333", fontWeight: "bold",},}}
                />
                <Typography variant="body2" sx={{ color: "#555", fontWeight: "bold" }}>
                  Prix horaire : {parking.pricing?.hourlyRate} MAD / heure
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleReserve(parking)}
                  sx={{backgroundColor: "#444",color: "#fff","&:hover": { backgroundColor: "#222" },}}
                >
                  Réserver
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
