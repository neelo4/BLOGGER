import { Link, NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export function RootLayout() {
  return (
    <div>
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container row" style={{ justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ margin: 0 }}>Blog</h1>
          </Link>
          <nav className="nav" style={{ alignItems: 'center' }}>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Blog</NavLink>
            <NavLink to="/editor/new" className={({ isActive }) => (isActive ? 'active' : '')}>New Post</NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="container" style={{ paddingTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
