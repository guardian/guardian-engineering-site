/** @jsxImportSource preact */
import Styles from './styles.module.scss';

function Nav() {
  return (
    <nav className={Styles.nav}>
      <a className={Styles.link} href="/">
        Home
      </a>
      <a className={Styles.link} href="/open#people">
        Open People
      </a>
      <a className={Styles.link} href="/open#source">
        Open Source
      </a>
      <a className={Styles.link} href="/diversity">
        Diversity
      </a>

      <a className={Styles.link} href="/events">
        Events &amp; Talks
      </a>
    </nav>
  );
}
export default Nav;
