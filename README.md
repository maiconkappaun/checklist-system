# Checklist System

Sistema web para gerenciamento de checklists, permitindo o cadastro de itens de verificação, criação de checklists, associação de itens e controle do status de disponibilização.

O projeto foi desenvolvido utilizando uma arquitetura separada entre **frontend** e **backend**, com comunicação através de uma API REST.

---

## Tecnologias utilizadas

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* REST API
* `tsx`

### Frontend

* Vue 3
* TypeScript
* Vite
* Vue Router
* Pinia
* Tailwind CSS
* Lucide Icons

### Banco de dados

* PostgreSQL
* Prisma Migrations

---

## Estrutura do projeto

```text
checklist-system/
│
├── checklist-api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── prisma.config.ts
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── checklist-web/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   └── stores/
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

# Pré-requisitos

Para executar o projeto, é necessário possuir:

* Node.js 20 ou superior
* npm
* PostgreSQL 14 ou superior
* Git

---

# Clonando o projeto

Clone o repositório:

```bash
git clone https://github.com/maiconkappaun/checklist-system.git
```

Entre na pasta do projeto:

```bash
cd checklist-system
```

---

# Configuração do PostgreSQL

Crie um banco de dados PostgreSQL chamado:

```text
checklist_db
```

Por exemplo:

```sql
CREATE DATABASE checklist_db;
```

O usuário utilizado para conexão deve possuir permissão para criar e alterar tabelas no banco.

---

# Configuração do Backend

Entre na pasta:

```bash
cd checklist-api
```

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`.

Exemplo:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/checklist_db?schema=public"
PORT=3000
```

### Importante

O arquivo `.env` contém informações sensíveis e **não deve ser versionado**.

O projeto disponibiliza apenas o arquivo `.env.example` como referência para configuração.

---

# Inicialização do banco de dados

Após configurar a variável `DATABASE_URL`, gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

As migrations irão criar as tabelas necessárias no PostgreSQL.

---

# Executando o Backend

Na pasta `checklist-api`:

```bash
npm run dev
```

A API será executada, por padrão, em:

```text
http://localhost:3000
```

---

# Configuração do Frontend

Abra outro terminal e entre na pasta:

```bash
cd checklist-web
```

Instale as dependências:

```bash
npm install
```

Caso o projeto utilize variável de ambiente para a API, crie o arquivo `.env` baseado no `.env.example`.

Exemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

---

# Executando o Frontend

Na pasta `checklist-web`:

```bash
npm run dev
```

O Vite disponibilizará a aplicação em um endereço semelhante a:

```text
http://localhost:5173
```

O endereço exato será apresentado no terminal.

---

# Funcionalidades

## Cadastro de itens

* [x] Cadastro de itens de verificação
* [x] Cada item possui uma descrição
* [x] Listagem dos itens cadastrados
* [x] Persistência dos itens no PostgreSQL

Exemplos de itens:

* O piso está limpo?
* Os equipamentos estão organizados?
* Os produtos estão armazenados corretamente?

---

## Cadastro de checklists

* [x] Cadastro de checklist
* [x] Nome do checklist
* [x] Descrição opcional
* [x] Status do checklist
* [x] Status `RASCUNHO`
* [x] Status `PRONTO`
* [x] Associação de um ou mais itens previamente cadastrados
* [x] Persistência dos checklists no PostgreSQL
* [x] Persistência do relacionamento entre checklists e itens

---

## Checklists disponíveis

* [x] Listagem de checklists com status `PRONTO`
* [x] Checklists `RASCUNHO` não são exibidos nessa área
* [x] Visualização de um checklist específico
* [x] Visualização da descrição e dos itens vinculados

---

## Gerenciamento de rascunhos

* [x] Tela separada para checklists com status `RASCUNHO`
* [x] Alteração de `RASCUNHO` para `PRONTO`
* [x] Alteração de `PRONTO` para `RASCUNHO`
* [x] Alteração de status através de modal

---

# API

A comunicação entre frontend e backend é realizada através de uma API REST.

## Itens

### Criar item

```http
POST /api/items
```

Exemplo:

```json
{
  "descricao": "O piso está limpo?"
}
```

### Listar itens

```http
GET /api/items
```

---

## Checklists

### Criar checklist

```http
POST /api/checklists
```

Exemplo:

```json
{
  "nome": "Checklist de abertura",
  "descricao": "Verificações necessárias antes da abertura.",
  "status": "RASCUNHO",
  "itemIds": [
    "ID_DO_ITEM_1",
    "ID_DO_ITEM_2"
  ]
}
```

### Listar checklists

```http
GET /api/checklists
```

Para obter apenas checklists disponíveis:

```http
GET /api/checklists?status=PRONTO
```

### Buscar checklist específico

```http
GET /api/checklists/:id
```

### Alterar status

```http
PATCH /api/checklists/:id/status
```

Exemplo:

```json
{
  "status": "PRONTO"
}
```

ou:

```json
{
  "status": "RASCUNHO"
}
```

---

# Modelagem do banco

O relacionamento entre checklists e itens utiliza uma tabela intermediária.

```text
┌──────────────┐
│    itens     │
└──────┬───────┘
       │
       │
       ▼
┌────────────────────┐
│  checklist_itens   │
└─────────┬──────────┘
          │
          │
          ▼
┌────────────────────┐
│     checklists     │
└────────────────────┘
```

### Tabelas principais

#### `itens`

Armazena os itens de verificação cadastrados.

#### `checklists`

Armazena os checklists e seus respectivos status.

#### `checklist_itens`

Tabela intermediária responsável pelo relacionamento N:N entre checklists e itens.

---

# Arquitetura

O backend foi organizado seguindo uma separação de responsabilidades:

```text
src/
├── config/
├── controllers/
├── routes/
├── services/
└── server.ts
```

### Controllers

Responsáveis por receber as requisições HTTP, validar dados básicos e retornar as respostas.

### Services

Concentram as regras de negócio da aplicação.

### Routes

Responsáveis pelo mapeamento dos endpoints da API.

### Config

Contém configurações da aplicação, incluindo a conexão com o banco de dados.

---

# Frontend

O frontend utiliza uma organização baseada em componentes, páginas, stores e serviços:

```text
src/
├── components/
├── layouts/
├── pages/
├── router/
├── services/
└── stores/
```

### Components

Componentes reutilizáveis da interface.

### Pages

Representam as páginas e telas da aplicação.

### Stores

Gerenciamento do estado da aplicação utilizando Pinia.

### Services

Responsáveis pela comunicação com a API.

### Router

Gerenciamento da navegação da aplicação utilizando Vue Router.

---

# Diferencial

O desafio propõe como diferencial a possibilidade de executar um checklist e classificar cada item como:

* Conforme
* Não conforme

Essa funcionalidade **não foi implementada na versão atual do projeto**.

---

# Segurança

Informações sensíveis não são armazenadas no repositório.

O projeto utiliza arquivos `.env` para configurações locais e disponibiliza arquivos `.env.example` contendo apenas as variáveis necessárias para execução.

O `.gitignore` impede o versionamento de arquivos como:

```text
.env
node_modules/
dist/
```

---

# Execução rápida

## Backend

Terminal 1:

```bash
cd checklist-api
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

## Frontend

Terminal 2:

```bash
cd checklist-web
npm install
npm run dev
```

Após iniciar o frontend, acesse o endereço exibido pelo Vite no terminal.

---

# Status do projeto

Projeto desenvolvido como desafio técnico para implementação de um sistema de gerenciamento de checklists.

As funcionalidades principais especificadas no desafio foram implementadas utilizando:

* Node.js
* TypeScript
* Vue 3
* PostgreSQL
* Prisma
* REST API
