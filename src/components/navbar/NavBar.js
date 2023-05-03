import './NavBar.module.css';

const NavBar = () => {
  return <nav className="nav">
    <div className="site-title">
      <a href="/">The Gus Café</a>
    </div>
    <ul>
      <li>
        <a href="/food">
          food
        </a>
      </li>
      <li>
        <a href="/dessert">
          dessert
        </a>
      </li>
      <li>
        <a href="/beverages">
          beverages
        </a>
      </li>
    </ul>
  </nav>
}

export default NavBar;
