// Simula um banco de dados no LocalStorage
export interface Concurso {
    nome: string;
    numero: number;
    dataApuracao: string;
    dezenasSorteadasOrdemSorteio: string[];
  }
  
  const DB_KEY = 'megasena-results';
  
  export async function fetchLatestResult(): Promise<Concurso | null> {
  // 1. Tenta pegar do LocalStorage primeiro
  const storedData = localStorage.getItem(DB_KEY);
  if (storedData) {
    return JSON.parse(storedData);
  }

  // 2. Se não tiver, busca da API da Caixa
  try {
    const response = await fetch('https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados', {
      headers: { 'accept': 'application/json' },
    });
    
    const data = await response.json();
    const mega = data.listaResultadoJogos.find((jogo: any) => jogo.nome === 'Mega-Sena');

    if (mega) {
      // Armazena no LocalStorage para próximas consultas
      localStorage.setItem(DB_KEY, JSON.stringify(mega));
      // Define um tempo de expiração (1 dia)
      localStorage.setItem(`${DB_KEY}-expires`, (Date.now() + 86400000).toString());
      return mega;
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }

  return null;
}

// Função para limpar o cache (opcional)
export function clearCache() {
    localStorage.removeItem(DB_KEY);
    localStorage.removeItem(`${DB_KEY}-expires`);
  }