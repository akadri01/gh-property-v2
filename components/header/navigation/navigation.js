import Link from "next/link";
const logo = '/static/images/icons/logo.png';

export default () => {
  return (
    <section className="navigation">
      <div className="mobile-desktop-frame">
        <div className="navigation__brand">
          <Link href="/">
            <a className="navigation__brand-logo">
              <img
                src={logo}
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
          <Link>
            <a>
              buy
            </a>
          </Link>
          <Link>
            <a>
              rent 
            </a>
          </Link>
          <div>
            locations
          </div>
          <Link>
            <a>
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
}