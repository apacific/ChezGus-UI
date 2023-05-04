import logo from '../../THE-GUS-transparent-ltgrey.png';
import styles from './NavBar.module.css';

const NavBar = () => {
return <nav className="nav">
  <div className={styles.navContainer}>
    <div className="site-title">
      <a href="/">
        <img src={logo} width="50px" className="App-logo" alt="logo" />
      </a>
  </div>
    <div className="nav-links">
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
    </div>
  </div>
  </nav>
}

export default NavBar;
