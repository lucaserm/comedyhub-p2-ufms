# Banco de dados do ComedyHub

O modelo relacional atende ao público-alvo da plataforma: consumidores descobrem conteúdo, criadores publicam e moderadores analisam denúncias.

## Modelo de dados

```mermaid
erDiagram
  USERS ||--o{ POSTS : publica
  CATEGORIES ||--o{ POSTS : classifica
  POSTS ||--o{ REPORTS : recebe
  USERS ||--o{ REPORTS : registra

  USERS {
    bigint id PK
    varchar name
    varchar email UK
    varchar role
  }
  CATEGORIES {
    smallint id PK
    varchar name UK
  }
  POSTS {
    bigint id PK
    bigint creator_id FK
    smallint category_id FK
    varchar title
    varchar format
    varchar status
  }
  REPORTS {
    bigint id PK
    bigint post_id FK
    bigint reporter_id FK
    varchar reason
    varchar status
  }
```

## Como executar com PostgreSQL

```bash
createdb comedyhub
psql -d comedyhub -f database/schema.sql
psql -d comedyhub -f database/seed.sql
psql -d comedyhub -f database/operations.sql
```

`schema.sql` contém entidades, relacionamentos, chaves, restrições e índices. `seed.sql` insere dados de exemplo. `operations.sql` documenta inserção, consulta, atualização e remoção.
