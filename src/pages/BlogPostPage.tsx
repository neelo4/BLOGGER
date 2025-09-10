import { Link, useParams } from 'react-router-dom';
import { BlogStore } from '@/features/blog/storage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const post = id ? BlogStore.get(id) : undefined;
  if (!post) return <div className="card">Post not found. <Link to="/">Go back</Link></div>;
  return (
    <article className="card" style={{ display: 'grid', gap: 8 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>{post.title}</h2>
        <Link to={`/editor/${post.id}`} className="pill">Edit</Link>
      </div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {new Date(post.updatedAt).toLocaleString()} • {post.tags.join(', ')}
      </div>
      <div className="content" style={{ lineHeight: 1.7 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

