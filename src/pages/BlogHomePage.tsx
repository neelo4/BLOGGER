import { Link } from 'react-router-dom';
import { PostList } from '@/features/blog/components/PostList';

export default function BlogHomePage() {
  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Your Posts</h2>
        <Link to="/editor/new" className="pill" style={{ textDecoration: 'none' }}>+ New Post</Link>
      </div>
      <PostList />
    </section>
  );
}

