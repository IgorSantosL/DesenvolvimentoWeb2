import { Request, Response } from "express";
import db from "./db";

export async function cidade(req: Request, res: Response): Promise<void> {
    try {
        const result = await db.query("SELECT * FROM cidades");
        res.json(result.rows); // Retorna todas as cidades
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

export async function cidadeIncidencia(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params; // Corrija o nome do parâmetro para 'id'
        // Busca a cidade pelo ID
        const cidadeResult = await db.query("SELECT * FROM cidades WHERE id = $1", [id]);
        if (cidadeResult.rows.length === 0) {
            res.status(404).json({ message: `Cidade com id ${id} não encontrada` });
            return;
        }
        const cidade = cidadeResult.rows[0];

        // Busca incidências que contenham a geometria da cidade
        const incidenciasResult = await db.query(
            "SELECT * FROM incidencias WHERE ST_Contains(geom, $1::geometry)",
            [cidade.geom]
        );

        if (incidenciasResult.rows.length === 0) {
            res.status(404).json({ message: `Não existem dados de incidencias para a cidade ${id}` });
            return;
        }

        res.json(incidenciasResult.rows);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}