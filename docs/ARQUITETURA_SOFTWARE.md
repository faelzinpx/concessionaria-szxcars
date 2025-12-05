# Arquitetura do Software — Concessionária AutoMax

Última atualização: 2025-11-17

Este documento descreve a arquitetura do sistema desenvolvido no repositório `concessionaria-automax` (frontend React + backend Node.js simples). O objetivo é fornecer uma visão técnica clara para manutenção, evolução e geração de documentação PDF.

## Sumário

- Visão Geral
- Contrato do Sistema (inputs/outputs, critérios de sucesso, erros)
- Tecnologias e Estrutura do Repositório
- Componentes Principais
  - Frontend
  - Backend
  - Dados / Mocks
- Fluxos de Dados e Comunicação
- Modelos de Dados principais
- Endpoints HTTP (resumo)
- Requisitos Não-Funcionais
- Segurança e Controle de Acesso
- Deploy e Execução Local
- Pontos de melhoria e próximos passos


## Visão Geral

O sistema é uma aplicação web para uma concessionária, com interface React no `frontend/` e um backend Node.js mínimo em `backend/`. O frontend consome dados do backend (mock de carros) e apresenta páginas como `Homepage`, `Carros`, `Admin` e `Login`.

Objetivo do documento: ser referência técnica para desenvolvedores e permitir conversão direta para PDF.


## Contrato do Sistema (resumo)

- Inputs:
  - Requisições HTTP do frontend para o backend (GET/POST conforme necessidade).
  - Ações do usuário via UI (login, cadastro de carros, navegação).
- Outputs:
  - Páginas HTML servidas pelo frontend (via dev server / build estático).
  - Respostas JSON do backend contendo listas de carros, detalhes e mensagens de sucesso/erro.
- Critério de sucesso:
  - UI apresenta corretamente os dados do backend e permite operações administrativas simples.
- Modos de erro:
  - Backend indisponível → frontend deve tratar erros e mostrar mensagem amigável.
  - Dados inválidos no frontend → validação básica de campos antes de enviar.


## Tecnologias e Estrutura do Repositório

- Frontend: React (create-react-app), código em `frontend/src/`.
  - Principais arquivos: `App.js`, `index.js`, `index.css`.
  - Páginas: `frontend/src/pages/*` (Homepage, Carros, Admin, Login ...)
  - Componentes: `frontend/src/components/*` (Header, Footer, CarImage...)
- Backend: Node.js simples, arquivo `backend/server.js`.
  - Dados mock: `backend/data/carros-mock.js`.
- Gerenciamento de versão: Git (repositório remoto no GitHub em `origin/main`).
- Imagens e ativos: `frontend/public/images/`.


## Componentes Principais

### Frontend

- `Header` (`frontend/src/components/Header.js`): navegação e botão de login.
- `Homepage` (`frontend/src/pages/Homepage.js`): hero e botão WhatsApp.
- `Carros` (`frontend/src/pages/Carros.js`): listagem de carros e exibição de preços.
- `CarrosNovo` (`frontend/src/pages/CarrosNovo.js`): formulário para adicionar novo carro (Admin).
- `Login` (`frontend/src/pages/Login.js`): tela de autenticação (simples).

Estilo: centralizado em `frontend/src/index.css` e estilos locais por componente.

### Backend

- `server.js`: servidor express minimal que serve endpoints para obter a lista de carros e operações simples (se implementadas).
- `data/carros-mock.js`: array com objetos de carros (modelo, preço, imagem, etc.).


## Fluxos de Dados e Comunicação

1. Usuário abre a `Homepage` no navegador.
2. O frontend consome dados do backend via fetch/axios (GET `/carros` ou endpoint correspondente no `server.js`).
3. Dados retornados em JSON são mapeados para componentes React e renderizados.
4. Operações administrativas (ex.: adicionar carro) chamam endpoints POST/PUT no backend ou atualizam um mock local conforme implementação.


## Modelos de Dados (exemplo simplificado)

Carro (exemplo):

- id: string | number
- marca: string
- modelo: string
- ano: number
- preco: number
- cor: string
- imagem: string (path relativo em `public/images/cars/`)


## Endpoints HTTP (resumo esperado)

- GET /api/carros — retorna lista de carros
- GET /api/carros/:id — retorna detalhes de um carro
- POST /api/carros — cria novo carro (Admin)
- PUT /api/carros/:id — atualiza carro
- DELETE /api/carros/:id — remove carro

> Observação: adapte as rotas conforme implementação real em `backend/server.js`. Verificar o arquivo para confirmar nomes exatos.


## Requisitos Não-Funcionais

- Performance: páginas estáticas servidas rápido; carregar imagens otimizadas.
- Escalabilidade: arquitetura monolítica simples; para alto tráfego, migrar backend para serviços e adicionar cache (Redis).
- Portabilidade: frontend padrão React, pode ser hospedado como SPA em qualquer host estático.
- Testabilidade: testes unitários em `frontend/src/App.test.js` (já existe scaffold do CRA).


## Segurança

- Autenticação: atualmente básica (verificar `Login.js`); para produção, adicionar JWT/HTTPS e backend com persistência segura.
- Validação de entrada: validar no frontend e no backend.
- Armazenamento de segredos: usar variáveis de ambiente (`frontend/.env` existe localmente). Nunca commitar segredos reais.


## Deploy e Execução Local

Execução local (frontend):

1. Abrir terminal na pasta `frontend/`.
2. Instalar dependências: `npm install` (se necessário).
3. Rodar em dev: `npm start`.

Backend:

1. Abrir terminal na pasta `backend/`.
2. Instalar dependências: `npm install` (se houver `package.json`).
3. Rodar: `node server.js` ou `npm start`.


## Pontos de melhoria / Próximos passos

- Documentar contratos de API com OpenAPI/Swagger.
- Substituir mocks por um banco de dados (ex.: SQLite ou MongoDB) para persistência.
- Adicionar testes de integração para endpoints do backend.
- Introduzir CI (GitHub Actions) para lint, build e testes automáticos.
- Planejar implantação: Dockerfile para backend e build do frontend para host estático.


## Referências (no repositório)

- Frontend: `frontend/src/`
- Backend: `backend/server.js`, `backend/data/carros-mock.js`
- Estilos globais: `frontend/src/index.css`


---

Se quiser, eu:

- posso adicionar um diagrama de sequência para o fluxo de compra/visualização de carro;
- posso gerar também uma versão em DOCX ou PDF automaticamente e commitar no repositório;
- posso adaptar o conteúdo para um formato institucional (logo, capa, sumário com páginas numeradas) antes da conversão.

Diga qual desses próximos passos prefere que eu execute.
