-- ComedyHub: esquema PostgreSQL da primeira versão.
-- Execute este arquivo antes de seed.sql e operations.sql.

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(15) NOT NULL DEFAULT 'consumer'
    CHECK (role IN ('consumer', 'creator', 'moderator')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  creator_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id SMALLINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  title VARCHAR(140) NOT NULL CHECK (char_length(trim(title)) >= 4),
  description TEXT NOT NULL CHECK (char_length(trim(description)) >= 10),
  format VARCHAR(10) NOT NULL CHECK (format IN ('video', 'image', 'text')),
  media_url TEXT,
  status VARCHAR(12) NOT NULL DEFAULT 'published'
    CHECK (status IN ('published', 'pending', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  reason VARCHAR(300) NOT NULL CHECK (char_length(trim(reason)) >= 10),
  status VARCHAR(12) NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'reviewed', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (post_id, reporter_id)
);

CREATE INDEX idx_posts_feed ON posts (status, created_at DESC);
CREATE INDEX idx_posts_category ON posts (category_id, format);
CREATE INDEX idx_reports_status ON reports (status, created_at ASC);
