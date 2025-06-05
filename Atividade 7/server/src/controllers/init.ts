import { Client } from "pg";
import * as dotenv from "dotenv";
import pool from "./db"; // usa o Pool configurado em db.ts

dotenv.config();

async function createDatabase(): Promise<void> {
  const client = new Client({
    host: process.env.INIT_DB_HOST,
    port: Number(process.env.INIT_DB_PORT),
    user: process.env.INIT_DB_USER,
    password: process.env.INIT_DB_PASSWORD,
    database: process.env.INIT_DB_NAME,
  });

  await client.connect();

  try {
    await client.query(`CREATE DATABASE bdex`);
    console.log("Banco de dados 'bdex' criado.");
  } catch (err: any) {
    if (err.code === "42P04") {
      console.log("Banco de dados 'bdex' já existe.");
    } else {
      throw err;
    }
  } finally {
    await client.end();
  }
}

async function setupTables(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

    await client.query(`DROP TABLE IF EXISTS cidades`);
    await client.query(`
      CREATE TABLE cidades (
        id SERIAL PRIMARY KEY,
        nome TEXT,
        geom GEOMETRY(Point, 4326)
      )
    `);

    await client.query(`DROP TABLE IF EXISTS incidencias`);
    await client.query(`
      CREATE TABLE incidencias (
        id SERIAL PRIMARY KEY,
        lon FLOAT,
        lat FLOAT,
        anual INTEGER,
        jan INTEGER,
        fev INTEGER,
        mar INTEGER,
        abr INTEGER,
        mai INTEGER,
        jun INTEGER,
        jul INTEGER,
        ago INTEGER,
        set INTEGER,
        out INTEGER,
        nov INTEGER,
        dez INTEGER,
        geom GEOMETRY(Polygon, 4326)
      )
    `);

    console.log("Tabelas criadas com sucesso.");
  } finally {
    client.release();
  }
}

async function init() {
  try {
    await createDatabase(); // conecta ao postgres e cria o bdex
    await setupTables();    // usa o pool (bd.ts) que se conecta ao bdex
  } catch (error) {
    console.error("Erro ao inicializar:", error);
  }
}

init();