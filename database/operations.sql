-- Operações CRUD e consultas representativas do ComedyHub.

-- CREATE: nova publicação de um criador.
INSERT INTO posts (creator_id, category_id, title, description, format, media_url)
VALUES (1, 1, 'Fila do mercado em horário de pico', 'Um relato humorístico sobre escolhas feitas na fila errada.', 'text', NULL);

-- READ: feed público, mostrando autor e categoria.
SELECT p.id, p.title, p.description, p.format, p.created_at,
       u.name AS creator, c.name AS category
FROM posts p
JOIN users u ON u.id = p.creator_id
JOIN categories c ON c.id = p.category_id
WHERE p.status = 'published'
ORDER BY p.created_at DESC;

-- READ: filtro por categoria e formato, usado pelo catálogo.
SELECT p.id, p.title, u.name AS creator, c.name AS category, p.format
FROM posts p
JOIN users u ON u.id = p.creator_id
JOIN categories c ON c.id = p.category_id
WHERE c.name = 'Tecnologia' AND p.format = 'video' AND p.status = 'published';

-- UPDATE: edição feita pelo proprietário do conteúdo.
UPDATE posts
SET title = 'O gato que revisa código de madrugada',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 4 AND creator_id = 4;

-- UPDATE: ação de moderação sobre uma denúncia.
UPDATE reports SET status = 'reviewed' WHERE id = 1;

-- DELETE: exclusão de uma denúncia resolvida.
DELETE FROM reports WHERE id = 1 AND status = 'reviewed';

-- READ: painel de moderação com itens pendentes.
SELECT r.id, r.reason, r.created_at, p.title, reporter.name AS reporter
FROM reports r
JOIN posts p ON p.id = r.post_id
JOIN users reporter ON reporter.id = r.reporter_id
WHERE r.status = 'open'
ORDER BY r.created_at;
