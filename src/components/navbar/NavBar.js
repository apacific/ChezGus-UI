import styles from './NavBar.module.css';

const NavBar = () => {
  return <nav className="nav">
    <a href="/" className="site-title">the Gus Cafe</a>
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
