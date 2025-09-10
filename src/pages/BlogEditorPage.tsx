import { useNavigate, useParams } from 'react-router-dom';
import { BlogStore } from '@/features/blog/storage';
import type { Post } from '@/features/blog/types';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/atoms/Button';

export default function BlogEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [draft, setDraft] = useState<Pick<Post, 'title' | 'content' | 'tags' | 'published'>>({
    title: '',
    content: '',
    tags: [],
    published: true
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const p = BlogStore.get(id);
      if (p) setDraft({ title: p.title, content: p.content, tags: p.tags, published: p.published });
    }
  }, [id]);

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{id === 'new' ? 'Create Post' : 'Edit Post'}</h2>
        <div className="row" style={{ gap: 8 }}>
          <Button
            onClick={() => {
              if (!draft.title.trim()) return;
              if (id === 'new' || !id) {
                const p = BlogStore.create({ ...draft });
                navigate(`/post/${p.id}`);
              } else {
                BlogStore.update(id, { ...draft });
                navigate(`/post/${id}`);
              }
            }}
          >
            Save
          </Button>
          {id && id !== 'new' && (
            <Button
              variant="ghost"
              onClick={() => {
                BlogStore.remove(id);
                navigate('/');
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="row" style={{ alignItems: 'start', gap: 16 }}>
        <div style={{ flex: 1 }} className="card">
          <label style={{ display: 'grid', gap: 8 }}>
            <span>Title</span>
            <input
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="Post title"
              style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <span>Tags (comma separated)</span>
            <input
              value={draft.tags.join(', ')}
              onChange={e => setDraft(d => ({ ...d, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
              placeholder="tech, react"
              style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            <span>Content (Markdown)</span>
            <textarea
              value={draft.content}
              onChange={e => setDraft(d => ({ ...d, content: e.target.value }))}
              rows={18}
              placeholder="# Your Markdown here"
              style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', width: '100%', resize: 'vertical' }}
            />
          </label>
        </div>
        <div style={{ flex: 1 }} className="card">
          <div style={{ opacity: 0.7, fontSize: 12, marginBottom: 8 }}>Preview</div>
          <article className="content" style={{ lineHeight: 1.6 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{draft.content || '*Nothing to preview yet.*'}</ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
}

