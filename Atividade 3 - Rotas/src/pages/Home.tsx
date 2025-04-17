import { Link } from "react-router-dom";
import GerarAposta from "./GerarAposta";

const Home = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Home</h1>
        <Link to="/apostas">Apostas Geradas</Link>
      </div>
      <GerarAposta />
    </div>
  );
};

export default Home;