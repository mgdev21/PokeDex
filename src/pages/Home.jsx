import { useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to the Pokédex!</h1>
      <p>Pokédex app built with Vite and React.</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/pokedex")}>Go to Pokédex</button>
        <button onClick={() => navigate("/about")}>About</button>
      </div>
    </div>
  );
}

export default Home;
