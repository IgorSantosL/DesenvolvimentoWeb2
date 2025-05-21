import { useEffect, useState } from 'react';
import { fetchLatestResult, fetchConcurso, Concurso } from '../services/MegaSenaService';

export function MegaSena() {
  const [concurso, setConcurso] = useState<Concurso | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarConcursoMaisRecente = async () => {
      const data = await fetchLatestResult();
      if (data) {
        setConcurso(data);
        setError('');
      } else {
        setError('Erro ao carregar o concurso mais recente.');
      }
    };
    carregarConcursoMaisRecente();
  }, []);

  const handleBuscar = async () => {
    if (!input) return;
    const numero = parseInt(input);
    const data = await fetchConcurso(numero);

    if ('message' in data) {
      setConcurso(null);
      setError(data.message);
    } else {
      setConcurso(data);
      setError('');
    }
  };

  return (
    <div className="megasena-container">
      <input
        type="number"
        placeholder="Número do concurso"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
      />

      {error && (
        <div className="card error">
          <p>{error}</p>
        </div>
      )}

      {concurso && !error && (
        <div className="card">
          <h2>MEGA-SENA - Concurso {concurso.concurso}</h2>
          <div className="balls">
            {concurso.dezenas.map((d, i) => (
              <span className="ball" key={i}>{d}</span>
            ))}
          </div>
          <p>{formatarData(concurso.data_do_sorteio)}</p>
        </div>
      )}
    </div>
  );
}

function formatarData(data: string) {
  const opcoes: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(data).toLocaleDateString('pt-BR', opcoes);
}
