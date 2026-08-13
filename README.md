# EEEP Profª Maria Célia Pinheiro Falcão — Novos Cursos Técnicos 2027

Site institucional para divulgar os novos cursos técnicos que chegarão à escola **EEEP Professora Maria Célia Pinheiro Falcão** a partir de **2027**.

## Funcionalidades

- 🏠 **Página Inicial** com hero section e 3 cards de eixos de formação (scroll horizontal no mobile, grid 3 colunas no desktop)
- 📚 **Página de Eixo** (`/eixo/[slug]`) listando os cursos de cada eixo
- 🎓 **Página de Curso** (`/curso/[slug]`) com descrição completa, áreas de atuação, habilidades e quiz vocacional
- 🧠 **Quiz Vocacional** de 10 perguntas por curso, com correção imediata, resultado final e feedback personalizado
- ❤️ **Marcação de Interesse** (Quero / Talvez / Não quero) salva por sessão anônima
- 🌙 **Modo Claro/Escuro** persistido no localStorage
- 📱 **Totalmente Responsivo** (mobile, tablet, desktop)

## Stack Técnica

- **Framework:** Next.js 16 (App Router), TypeScript
- **Banco de dados:** PostgreSQL via Drizzle ORM
- **Estilização:** Tailwind CSS v4
- **Ícones:** lucide-react

## Cursos e Eixos

| Eixo | Cursos |
|------|--------|
| Gestão e Negócios | Administração, Finanças |
| Recursos Naturais | Fruticultura |
| Info & Comunicação | Desenvolvimento de Sistemas |

## Configuração Local

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eeep_cursos
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Criar o Schema no Banco

```bash
npx drizzle-kit push
```

Observação: para o comando acima o `DATABASE_URL` deve estar disponível no ambiente. Veja as instruções abaixo para rodar localmente e para permitir que eu execute as migrações por você.

### 4. Popular o Banco (Seed)

Acesse via POST após iniciar o servidor:

```bash
curl -X POST http://localhost:3000/api/seed
```

Ou via browser: acesse `http://localhost:3000/api/seed` com método POST (ex: usando Postman, Insomnia ou Thunder Client).

### 5. Iniciar o Servidor

```bash
npm run dev
```

Acesse `http://localhost:3000`

## Deploy na Vercel

1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o projeto
3. Configure as variáveis de ambiente no painel da Vercel:
   - `DATABASE_URL` — string de conexão com PostgreSQL (ex: Neon, Supabase, Railway)
4. A Vercel detectará automaticamente que é um projeto Next.js
5. Após o primeiro deploy, faça um POST para `https://seu-dominio.vercel.app/api/seed` para popular o banco

---

## Guia rápido: Supabase + Vercel (passo a passo)

1) Criar projeto no Supabase
    - Acesse https://app.supabase.com e crie um projeto.
    - No painel do projeto, em Settings → Database → Connection string, copie a connection string do Postgres.

2) Configurar localmente
    - Crie um arquivo `.env.local` na raiz do projeto com a variável:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<database>
```

    - Ou exporte a variável no terminal antes de rodar o comando (Linux/macOS):

```bash
export DATABASE_URL="postgresql://..."
npx drizzle-kit push
```

    - No PowerShell (Windows):

```powershell
$env:DATABASE_URL = "postgresql://..."
npx drizzle-kit push
```

3) Popular o banco (seed)
    - Após rodar `npx drizzle-kit push`, inicie o servidor com `npm run dev` e faça um POST para `http://localhost:3000/api/seed` (ou use `curl`).

4) Deploy no Vercel
    - No painel do projeto Vercel, defina a variável de ambiente `DATABASE_URL` com a connection string do Supabase.
    - Faça deploy. Após o deploy, execute `POST https://<seu-dominio>/api/seed` para popular a base em produção.

5) Se você quiser que eu rode as migrações e o seed por você localmente:
    - Opção A (mais segura): defina `DATABASE_URL` no seu terminal local (veja comandos acima) e me peça para executar `npm run push-db` e `curl -X POST http://localhost:3000/api/seed` aqui — eu rodarei os comandos no seu ambiente local sem que você precise me enviar a string.
    - Opção B: cole a `DATABASE_URL` aqui na conversa (não recomendado por segurança). Se você optar por isso, eu posso executar as ações imediatamente.

Se quiser, eu executo agora os passos que você escolher (rodar `npx drizzle-kit push` e/ou `POST /api/seed`). Diga qual opção prefere.

## Estrutura de Pastas

```
src/
├── app/
│   ├── api/
│   │   ├── cursos/[slug]/   # API de curso
│   │   ├── eixos/           # API de eixos
│   │   ├── eixos/[slug]/    # API de eixo específico
│   │   ├── health/          # Health check
│   │   ├── interesse/       # API de interesse do usuário
│   │   ├── quiz/[slug]/     # API de quiz por curso
│   │   ├── respostas/       # API para salvar respostas
│   │   └── seed/            # Endpoint para popular o banco
│   ├── curso/[slug]/        # Página do curso
│   ├── eixo/[slug]/         # Página do eixo
│   ├── globals.css
│   ├── layout.tsx           # Layout raiz com ThemeProvider e Header
│   ├── not-found.tsx        # Página 404
│   └── page.tsx             # Página inicial
├── components/
│   ├── CursoCard.tsx        # Card de curso
│   ├── EixoCard.tsx         # Card de eixo (homepage)
│   ├── EixoIcon.tsx         # Ícone circular do eixo
│   ├── Header.tsx           # Header fixo com toggle de tema
│   ├── InteresseButton.tsx  # Botões de interesse (Quero/Talvez/Não quero)
│   ├── Quiz.tsx             # Componente de quiz vocacional
│   └── ThemeProvider.tsx    # Provedor de tema claro/escuro
├── db/
│   ├── index.ts             # Conexão com banco de dados
│   └── schema.ts            # Schema Drizzle ORM
├── lib/
│   ├── db-init.ts           # Inicialização do banco
│   ├── seed-data.ts         # Dados para seed (eixos, cursos, quiz)
│   └── session.ts           # Gerenciamento de sessão anônima
└── types/
    └── index.ts             # Tipos TypeScript
```

## Sessão Anônima

O sistema utiliza um UUID gerado no navegador e salvo no `localStorage` para identificar o visitante de forma anônima (sem login/senha). Isso permite:
- Salvar as respostas do quiz
- Persistir o status de interesse por curso
- Recuperar as preferências ao voltar à página

## Tema Claro/Escuro

O tema é persistido no `localStorage` com a chave `eeep_theme`. O toggle fica sempre visível no header, inclusive no menu mobile. Um script inline no `<head>` previne o flash de tema incorreto no carregamento da página.
