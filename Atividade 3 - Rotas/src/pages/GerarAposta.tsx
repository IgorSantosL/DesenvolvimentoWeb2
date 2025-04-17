import { useAposta } from "../context/ApostaContext";
import { useState } from "react";

const GerarAposta = () => {
  const { adicionarAposta } = useAposta();
  const [ultimaAposta, setUltimaAposta] = useState<number[] | null>(null);

  const gerarAposta = () => {
    try {
      const numeros = new Set<number>();

      while (numeros.size < 6) {
        const numero = Math.floor(Math.random() * 60) + 1;
        numeros.add(numero);
      }

      const aposta = Array.from(numeros).sort((a, b) => a - b);
      
      // Verifica se adicionarAposta é uma função antes de chamar
      if (typeof adicionarAposta === 'function') {
        adicionarAposta(aposta);
        setUltimaAposta(aposta);
      } else {
        console.error('adicionarAposta não é uma função');
      }
    } catch (error) {
      console.error('Erro ao gerar aposta:', error);
    }
  };

  return (
    <div>
      <h2>Gerar Aposta</h2>
      <button onClick={gerarAposta}>Gerar Nova Aposta</button>
      {ultimaAposta && (
        <p>Última aposta gerada: {ultimaAposta.join(" - ")}</p>
      )}
    </div>
  );
};

export default GerarAposta;