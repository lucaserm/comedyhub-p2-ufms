# ComedyHub

Protótipo acadêmico de uma aplicação web para descobrir e divulgar conteúdo cômico independente.

## Funcionalidades

- Feed de publicações com cartões semânticos.
- Filtros por categoria e formato.
- Visualização de detalhes da publicação em modal acessível.
- Área do criador com formulário e validação no navegador.
- Layout responsivo para celular e desktop, com foco visível e atalho para pular ao conteúdo.

## Tecnologias

React, Vite, HTML5, CSS3, PostgreSQL, SQL e Git.

## Como executar

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no navegador.

## Banco de dados

O diretório [`database/`](database/) contém o modelo relacional do projeto, o esquema PostgreSQL, dados de demonstração e exemplos de operações CRUD. O modelo contempla usuários, categorias, publicações e denúncias, atendendo consumidores, criadores e moderadores.

```bash
createdb comedyhub
psql -d comedyhub -f database/schema.sql
psql -d comedyhub -f database/seed.sql
```

## Controle de versão

O projeto usa Git para registrar a evolução do código. Cada alteração relevante deve ser registrada em um commit curto e descritivo, por exemplo: `feat: add post moderation schema`.

Repositório: https://github.com/lucaserm/comedyhub-p2-ufms

## Escopo da versão

A interface atual usa dados em memória. O esquema SQL está pronto para ser conectado a uma futura API REST; autenticação, persistência em produção, moderação real de denúncias e envio de arquivos são evoluções planejadas.
