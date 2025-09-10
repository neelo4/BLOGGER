import { BlogStore } from '../storage';
import type { Post } from '../types';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

export function PostList() {
  const [query, setQuery] = useState('');
  const posts = useMemo(() => BlogStore.list(), []);
  const filtered = posts.filter(p =>
    [p.title, p.tags.join(' '), p.content].join(' ').toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
        <input
          placeholder="Search posts…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            width: '100%'
          }}
        />
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((p: Post) => (
          <li key={p.id} style={{ padding: '8px 4px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link to={`/post/${p.id}`} style={{ fontWeight: 600 }}>{p.title}</Link>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {new Date(p.updatedAt).toLocaleString()} • {p.tags.join(', ')}
            </div>
          </li>
        ))}
        {filtered.length === 0 && <li>No posts yet.</li>}
      </ul>
    </div>
  );
}

export default PostList;

