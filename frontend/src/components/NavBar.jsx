import { Link, Outlet } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
    <nav>
      <ul>
        <li><Link to="/add">Create Blog Post</Link></li>
        <li><Link to="view">My Blogs</Link></li>
        <li><Link to="login">Login</Link></li>
      </ul>
    </nav>

    <Outlet />
    </div>
  )
}