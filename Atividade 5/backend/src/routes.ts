import express, { Request, Response } from 'express';
import db from './controllers/db';

const router = express.Router();

// Rota para retornar o concurso mais recente da Mega-Sena
router.get('/concursos/latest', async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM megasena ORDER BY concurso DESC LIMIT 1');
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Nenhum concurso encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar o concurso mais recente:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota para retornar os dados de um concurso específico pelo número
router.get('/concursos/:numero', async (req: Request, res: Response) => {
  const { numero } = req.params;
  try {
    const result = await db.query('SELECT * FROM megasena WHERE concurso = $1', [numero]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: `Não existem dados do concurso ${numero}` });
    }
  } catch (error) {
    console.error(`Erro ao buscar o concurso ${numero}:`, error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export default router;