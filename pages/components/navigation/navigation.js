import Link from "next/link";
import {Regions, Towns} from '../shared';

export default () => (
  <section className="navigation">
    <div className="mobile-desktop-frame">
      <div className="navigation__brand">
        <Link href="/">
          <a className="navigation__brand-logo">
            <img
              src='/static/images/icons/logo.png'
              alt='WeGhana logo'
              title='Go to home page'
            />
          </a>
        </Link>
        <div className="navigation__brand-burger" id="navBurger" onClick={e=>{
          document.getElementById('navMenu').classList.toggle('show-navigation-menu');
          document.getElementById('navBurger').classList.toggle('animate-burger-icon');
        }}>
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </div>
      </div>
      <nav className="navigation__navbar" id="navMenu">
        <Link href="#">
          <a className="links">
            buy
          </a>
        </Link>
        <Link href="#">
          <a className="links">
            rent 
          </a>
        </Link>
        <div className="navigation__navbar-location" id="locationDownArrow" onClick={()=> {
            document.getElementById('locationMegaMenu').classList.toggle('show-location-menu');
            document.getElementById('locationDownArrow').classList.toggle('replace-arrow-with-close');
          }}>
          <span className="navigation__navbar-location-title">locations</span>
          <div className="navigation__navbar-location-menu" id="locationMegaMenu">
            <div className="mobile-desktop-frame">
              <div className="navigation__navbar-location-menu-items">
                {Regions}
              </div>
              <div className="navigation__navbar-location-menu-items">
                {Towns}
              </div>
            </div>
          </div>
        </div>
        <Link href="/user/auth">
          <a className="links">
            Login-Register
          </a>
        </Link>
        <button>
          post an ad
        </button>
      </nav>
    </div>
  </section>
)













