# Atividade 5 — Mega-Sena: Frontend + Backend

Este projeto é composto por duas aplicações:

- **Frontend (React + Vite)**: localizado na pasta `frontend/`
- **Backend (Node.js + Express + PostgreSQL)**: localizado na pasta `backend/`

---

## 📦 Requisitos

- Node.js (v18 ou superior recomendado)
- PostgreSQL
- pgAdmin 4
- Navegador web (para acessar o frontend)

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório e acessar a pasta do projeto
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd Atividade\ 5
```

---

### 2. Instalar dependências do backend
```bash
cd backend
npm install
```

### 3. Instalar dependências do frontend
```bash
cd ../frontend
npm install
```

---

### 4. Rodar o backend (porta 3001)
```bash
cd ../backend
npm start
```

---

### 5. Rodar o frontend (porta padrão do Vite: 5173)
```bash
cd ../frontend
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🗃️ Configuração do Banco de Dados (PostgreSQL via pgAdmin)

### ⚙️ Passo 1 – Criar o banco de dados

1. Abra o **pgAdmin 4**.
2. Crie um banco de dados chamado `bdaula` (ou outro nome de sua preferência, mas se alterar, edite o `.env` do backend).

---

### ⚙️ Passo 2 – Criar a tabela `megasena`

Execute o seguinte comando SQL no Query Tool:

```sql
DROP TABLE IF EXISTS megasena;

CREATE TABLE megasena (
  concurso INTEGER NOT NULL,
  data_do_sorteio DATE NOT NULL,
  bola1 INTEGER NOT NULL,
  bola2 INTEGER NOT NULL,
  bola3 INTEGER NOT NULL,
  bola4 INTEGER NOT NULL,
  bola5 INTEGER NOT NULL,
  bola6 INTEGER NOT NULL,
  ganhadores_6_acertos INTEGER NOT NULL,
  cidade_uf VARCHAR(510) NULL,
  rateio_6_acertos DECIMAL NOT NULL,
  ganhadores_5_acertos INTEGER NOT NULL,
  rateio_5_acertos DECIMAL NOT NULL,
  ganhadores_4_acertos INTEGER NOT NULL,
  rateio_4_acertos DECIMAL NOT NULL,
  acumulado_6_acertos DECIMAL NOT NULL,
  arrecadacao_total DECIMAL NOT NULL,
  estimativa_premio DECIMAL NOT NULL,
  acumulado_sorteio_especial_mega_da_virada DECIMAL NOT NULL,
  observacao VARCHAR(255) NULL,
  PRIMARY KEY(concurso)
);
```

---

### ⚙️ Passo 3 – Importar os dados da Mega-Sena

Use o seguinte comando SQL no pgAdmin (ajustando o caminho para seu arquivo `.csv`):

```sql
COPY megasena
FROM 'C:\caminho\para\seu\arquivo\megasena.csv'
WITH (
    FORMAT csv,
    DELIMITER ';',
    HEADER,
    NULL 'NULL'
);
```

⚠️ **Importante**: Use `\\` no caminho se estiver no Windows.

---

### ⚙️ Passo 4 – Verificar os dados

```sql
SELECT * FROM megasena;
```

---

## 📂 Estrutura do Projeto

```
Atividade 5/
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── vite.config.ts
│   └── package.json
└── README.md
```

---

## 📝 Observações

- A aplicação inicia exibindo o último concurso automaticamente.
- O usuário pode buscar outros concursos via número.
- Se o concurso não existir, uma mensagem será exibida.

---
