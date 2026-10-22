import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const initialPosts = [
  { id: 1, title: 'Reunião que poderia ser e-mail', creator: 'Nina Torres', handle: '@ninatorres', category: 'Cotidiano', format: 'Vídeo', time: 'Hoje', description: 'Uma dramatização de cinco minutos sobre uma reunião de quinze minutos.', emoji: '📧', color: 'lavender' },
  { id: 2, title: 'Manual do café de escritório', creator: 'Gui Melo', handle: '@guimelo', category: 'Trabalho', format: 'Texto', time: 'Ontem', description: 'Regras não escritas para sobreviver à máquina de café da firma.', emoji: '☕', color: 'yellow' },
  { id: 3, title: 'Expectativa versus GPS', creator: 'Lia Ribeiro', handle: '@liaribeiro', category: 'Tecnologia', format: 'Imagem', time: '2 dias', description: 'Quando o mapa diz “você chegou” e você ainda está procurando a entrada.', emoji: '🗺️', color: 'blue' },
  { id: 4, title: 'O gato que revisa código', creator: 'Rafa Lima', handle: '@rafalima', category: 'Tecnologia', format: 'Vídeo', time: '3 dias', description: 'Uma revisão de pull request conduzida por um especialista em teclado.', emoji: '🐈', color: 'pink' }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [category, setCategory] = useState('Todas');
  const [format, setFormat] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState('feed');
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => posts.filter((post) =>
    (category === 'Todas' || post.category === category) &&
    (format === 'Todos' || post.format === format)
  ), [posts, category, format]);

  function publish(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get('title').trim();
    const description = form.get('description').trim();
    if (title.length < 4 || description.length < 10) {
      setNotice('Revise o título e escreva uma descrição com pelo menos 10 caracteres.');
      return;
    }
    setPosts([{ id: Date.now(), title, description, category: form.get('category'), format: form.get('format'), creator: 'Você', handle: '@criador', time: 'Agora', emoji: '✨', color: 'lavender' }, ...posts]);
    event.currentTarget.reset();
    setNotice('Publicação criada e adicionada ao feed.');
    setView('feed');
  }

  return <>
    <header className="topbar">
      <a className="brand" href="#inicio" onClick={() => setView('feed')} aria-label="ComedyHub início"><span>CH</span> ComedyHub</a>
      <nav aria-label="Navegação principal">
        <button className={view === 'feed' ? 'active' : ''} onClick={() => setView('feed')}>Explorar</button>
        <button className={view === 'creator' ? 'active' : ''} onClick={() => setView('creator')}>Área do criador</button>
      </nav>
      <button className="profile" onClick={() => setView('creator')} aria-label="Abrir perfil do criador">LM</button>
    </header>

    <main id="conteudo">
      {notice && <p className="notice" role="status">{notice}</p>}
      {view === 'feed' ? <section id="inicio" className="page">
        <div className="hero">
          <div><p className="eyebrow">COMÉDIA INDEPENDENTE</p><h1>Encontre algo que combine com seu humor.</h1><p>Conteúdos curtos de criadores independentes, reunidos em um só lugar.</p></div>
          <button className="primary" onClick={() => setView('creator')}>Publicar conteúdo <span aria-hidden="true">→</span></button>
        </div>
        <section className="filters" aria-label="Filtros de conteúdo">
          <div><label htmlFor="category">Categoria</label><select id="category" value={category} onChange={e => setCategory(e.target.value)}><option>Todas</option><option>Cotidiano</option><option>Trabalho</option><option>Tecnologia</option></select></div>
          <div><label htmlFor="format">Formato</label><select id="format" value={format} onChange={e => setFormat(e.target.value)}><option>Todos</option><option>Vídeo</option><option>Imagem</option><option>Texto</option></select></div>
          <p aria-live="polite">{filtered.length} {filtered.length === 1 ? 'publicação encontrada' : 'publicações encontradas'}</p>
        </section>
        <section aria-labelledby="feed-title"><h2 id="feed-title">Em destaque</h2>
          <div className="grid">{filtered.map(post => <article className="card" key={post.id}>
            <div className={`cover ${post.color}`} aria-hidden="true"><span>{post.emoji}</span><small>{post.format}</small></div>
            <div className="card-body"><div className="meta"><span>{post.category}</span><time>{post.time}</time></div><h3>{post.title}</h3><p>{post.description}</p><div className="card-footer"><span>{post.creator}</span><button onClick={() => setSelected(post)} aria-label={`Ver detalhes de ${post.title}`}>Ver publicação →</button></div></div>
          </article>)}</div>
          {filtered.length === 0 && <p className="empty">Nenhuma publicação corresponde aos filtros escolhidos.</p>}
        </section>
      </section> : <section className="page creator-page">
        <div><p className="eyebrow">ÁREA DO CRIADOR</p><h1>Compartilhe sua próxima ideia.</h1><p>Preencha os dados abaixo para publicar no feed do ComedyHub.</p></div>
        <form onSubmit={publish} noValidate aria-describedby="form-help"><p id="form-help">Os campos marcados com * são obrigatórios.</p>
          <label htmlFor="title">Título *</label><input id="title" name="title" required minLength="4" placeholder="Ex.: O gato que revisa código" />
          <label htmlFor="description">Descrição *</label><textarea id="description" name="description" required minLength="10" rows="4" placeholder="Conte brevemente do que trata sua publicação." />
          <div className="form-row"><div><label htmlFor="post-category">Categoria *</label><select id="post-category" name="category"><option>Cotidiano</option><option>Trabalho</option><option>Tecnologia</option></select></div><div><label htmlFor="post-format">Formato *</label><select id="post-format" name="format"><option>Vídeo</option><option>Imagem</option><option>Texto</option></select></div></div>
          <button className="primary" type="submit">Publicar no feed</button>
        </form>
      </section>}
    </main>
    <footer>ComedyHub · Protótipo acadêmico para divulgação de conteúdo cômico independente</footer>
    {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e => e.stopPropagation()}>
      <button className="close" onClick={() => setSelected(null)} aria-label="Fechar detalhes">×</button><div className={`cover ${selected.color}`} aria-hidden="true"><span>{selected.emoji}</span></div><p className="eyebrow">{selected.category} · {selected.format}</p><h2 id="modal-title">{selected.title}</h2><p>{selected.description}</p><p className="creator-name">Por {selected.creator} <span>{selected.handle}</span></p>
    </section></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
