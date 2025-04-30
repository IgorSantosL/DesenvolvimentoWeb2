import { useEffect, useState } from 'react';

interface Concurso {
  nome: string;
  numero: number;
  dataApuracao: string;
  dezenasSorteadasOrdemSorteio: string[];
}

export function MegaSena() {
  const [concurso, setConcurso] = useState<Concurso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena');
          
          // DEBUG: Mostra a resposta completa no console
          const responseData = await response.clone().json(); // Clone para poder usar depois
          console.log('Resposta completa da API:', responseData);
          
          if (!response.ok) {
            throw new Error(`API retornou status ${response.status}`);
          }

        const data = await response.json();
        
        // Verifica se os dados estão no formato correto
        if (!data.numero || !data.dezenasSorteadasOrdemSorteio) {
          throw new Error('Dados inválidos da API');
        }

        // Atualiza o estado com os dados
        setConcurso({
          nome: 'Mega-Sena',
          numero: data.numero,
          dataApuracao: data.dataApuracao,
          dezenasSorteadasOrdemSorteio: data.dezenasSorteadasOrdemSorteio
        });

        // Salva no LocalStorage para cache
        localStorage.setItem('megasena-data', JSON.stringify(data));
        setError(null);

      } catch (err) {
        console.error('Erro na requisição:', err);
        
        // Tenta usar cache se a API falhar
        const cached = localStorage.getItem('megasena-data');
        if (cached) {
          const data = JSON.parse(cached);
          setConcurso({
            nome: 'Mega-Sena',
            ...data
          });
        } else {
          setError('Não foi possível carregar os dados. Tente novamente mais tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Carregando...</p>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }

  if (!concurso) {
    return <p>Nenhum dado disponível</p>;
  }

  return (
    <div className="megasena-container">
      <h1>{concurso.nome} - Concurso {concurso.numero}</h1>
      <p>Data: {concurso.dataApuracao}</p>
      
      <div className="numbers-grid">
        {concurso.dezenasSorteadasOrdemSorteio.map((num, i) => (
          <div key={i} className="ball">
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}