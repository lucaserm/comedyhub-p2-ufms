-- Dados de demonstração para a atividade.

INSERT INTO users (name, email, role) VALUES
  ('Nina Torres', 'nina@comedyhub.dev', 'creator'),
  ('Gui Melo', 'gui@comedyhub.dev', 'creator'),
  ('Lia Ribeiro', 'lia@comedyhub.dev', 'creator'),
  ('Rafa Lima', 'rafa@comedyhub.dev', 'creator'),
  ('Lucas Macedo', 'lucas@comedyhub.dev', 'consumer'),
  ('Maya Silva', 'maya@comedyhub.dev', 'moderator');

INSERT INTO categories (name) VALUES ('Cotidiano'), ('Trabalho'), ('Tecnologia');

INSERT INTO posts (creator_id, category_id, title, description, format, media_url) VALUES
  (1, 1, 'Reunião que poderia ser e-mail', 'Uma dramatização de cinco minutos sobre uma reunião de quinze minutos.', 'video', 'https://example.com/reuniao'),
  (2, 2, 'Manual do café de escritório', 'Regras não escritas para sobreviver à máquina de café da firma.', 'text', NULL),
  (3, 3, 'Expectativa versus GPS', 'Quando o mapa diz que você chegou e você ainda procura a entrada.', 'image', 'https://example.com/gps'),
  (4, 3, 'O gato que revisa código', 'Uma revisão de pull request conduzida por um especialista em teclado.', 'video', 'https://example.com/gato');

INSERT INTO reports (post_id, reporter_id, reason) VALUES
  (2, 5, 'A publicação foi sinalizada para revisão de contexto.');
