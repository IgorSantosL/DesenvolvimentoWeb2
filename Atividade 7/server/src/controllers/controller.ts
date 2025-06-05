import { Request, Response } from "express";
import db from "./db";

export async function cidade(req: Request, res: Response): Promise<void> {
    try {
        // Retorna todas as cidades com geom em WKT
        const result = await db.query("SELECT id, nome, ST_AsText(geom) as geom FROM cidades");
        res.json(result.rows);
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

export async function cidadeIncidencia(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        // Busca a cidade pelo ID (mantém o campo geom original para consulta)
        const cidadeResult = await db.query("SELECT id, nome, geom FROM cidades WHERE id = $1", [id]);
        if (cidadeResult.rows.length === 0) {
            res.status(404).json({ message: `Cidade com id ${id} não encontrada` });
            return;
        }
        const cidadeRow = cidadeResult.rows[0];

        // Busca incidências que contenham a geometria da cidade
        const incidenciasResult = await db.query(
            "SELECT id, lon, lat, anual, jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez, ST_AsText(geom) as geom FROM incidencias WHERE ST_Contains(geom, $1::geometry)",
            [cidadeRow.geom]
        );

        if (incidenciasResult.rows.length === 0) {
            res.status(404).json({ message: `Não existem dados de incidencias para a cidade ${id}` });
            return;
        }

        // Agora converte o geom da cidade para WKT só na resposta
        const cidade = {
            id: cidadeRow.id,
            nome: cidadeRow.nome,
            geom: (await db.query("SELECT ST_AsText($1::geometry) as geom", [cidadeRow.geom])).rows[0].geom
        };

        res.json({ cidade, incidencia: incidenciasResult.rows });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}