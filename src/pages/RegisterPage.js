import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    number: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { fullName, number, password } = userData;

    if (!fullName || !number || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some((user) => user.number === number);

    if (userExists) {
      setError("Un utilisateur avec ce numero de telephone existe déjà");
      return;
    }

   
    const newUser = { fullName, number, password };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setError("");
    alert("Inscription réussie !");
    navigate("/");
  };

  return (
    <div className="connexion-container">
      <div className="form-box">
        <h1>S'inscrire</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="fullName">Nom complet</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Entrez votre nom complet"
              value={userData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="number">Numéro de Téléphone</label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Entrez votre numero de telephone"
              value={userData.number}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            S'inscrire
          </button>
        </form>

        <p className="register-link">
          Vous avez déjà un compte ?{" "}
          <span
            className="register-now"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: "#007BFF", textDecoration: "underline", fontWeight: "bold" }}
          >
            Connectez-vous ici
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
