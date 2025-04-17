// ApostaLista.tsx
import { useAposta } from "../context/ApostaContext";
import { Link } from "react-router-dom";

const ApostaLista = () => {
  const { apostas } = useAposta();

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Apostas Geradas</h2>
        <Link to="/">Voltar</Link>
      </div>
      <ul>
        {apostas.map((aposta, index) => (
          <li key={index}>{aposta.join(" - ")}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApostaLista;