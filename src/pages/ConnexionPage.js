import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; 

const ConnexionPage = () => {
  const [formData, setFormData] = useState({ number: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { number, password } = formData;

    if (!number || !password) {
      setError("Tous les champs sont requis");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.number === number && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setError("");
      alert("Connexion réussie !");
      navigate("/home");
    } else {
      setError("Numero de telephone ou mot de passe incorrect");
    }
  };

  return (
    <div className="connexion-container">
      <div className="form-box">
        <h1>Se Connecter</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="number">Numéro de téléphone</label><br></br>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Entrez votre numero"
              value={formData.number}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Connexion
          </button>
        </form>
        <p className="register-link">
          Vous n'avez pas de compte ?{" "}
          <Link to="/sinscrire" className="register-now">
            S'inscrire maintenant
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConnexionPage;