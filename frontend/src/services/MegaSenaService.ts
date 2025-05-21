export interface Concurso {
  concurso: number;
  data_do_sorteio: string;
  dezenas: string[];
}

const API_BASE = 'http://localhost:3001';

function adaptarConcurso(data: any): Concurso {
  return {
    concurso: data.concurso,
    data_do_sorteio: data.data_do_sorteio,
    dezenas: [data.bola1, data.bola2, data.bola3, data.bola4, data.bola5, data.bola6].map(String)
  };
}

export async function fetchLatestResult(): Promise<Concurso | null> {
  try {
    const res = await fetch(`${API_BASE}/concursos/latest`);
    if (!res.ok) throw new Error('Erro ao buscar concurso mais recente');
    const data = await res.json();
    return adaptarConcurso(data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchConcurso(numero: number): Promise<Concurso | { message: string }> {
  try {
    const res = await fetch(`${API_BASE}/concursos/${numero}`);
    const data = await res.json();
    if ('message' in data) return data;
    return adaptarConcurso(data);
  } catch (err) {
    console.error(err);
    return { message: 'Erro ao buscar concurso.' };
  }
}
