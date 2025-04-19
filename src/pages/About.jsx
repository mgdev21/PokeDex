import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1>About</h1>
      <p>
        Made by Gafton Marius (344343) for WEB2 <span>&copy; 2025</span>
      </p>
      <div className="about-buttons">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/pokedex")}>Pokédex</button>
      </div>
    </div>
  );
}

export default About;