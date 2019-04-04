import Link from "next/link";
import { Fragment } from "react";
import { towns, seoLinks, typeLinks } from "../shared/data";

const createLink = (base, link, key, val) => (
  <Link
    href={`/${base}${key}=${val ? val.toLowerCase() : link.toLowerCase()}`}
    key={link}
  >
    <a>{link}</a>
  </Link>
);

export default () => (
  <Fragment>
    <footer className="footer">
      <div className="mobile-desktop-frame">
        <div className="footer__top">
          <div className="footer__top-locations">
            <h2>buy house, flat, land in Ghana</h2>
            <div>
              {towns.map(link => {
                return createLink("properties/latest?", link, "town");
              })}
            </div>
          </div>
          <div className="footer__top-types">
            <h2>Properties in Accra</h2>
            <div>
              {seoLinks.map((link, i) => {
                return createLink(
                  "properties/latest?town=accra&",
                  link,
                  "premises_type",
                  typeLinks[i]
                );
              })}
            </div>
          </div>
          <div className="footer__top-advert">
            <h2>Sell or rent out your property in Ghana</h2>
            <p>
              Every 4 minutes someone chooses to sell or rent out on WeGhana.
              Enter a price and post your advert now!
            </p>
            <form>
              <label>Price</label>
              <input type="number" placeholder=" e.g 25000" />
              <Link href="/user/auth">
                <a>
                  <button type="button">Post ad</button>
                </a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </footer>
    <section className="footer-end">
      <div className="mobile-desktop-frame">
        <img
          src="/static/images/icons/logo-small.png"
          alt="WeGhana"
          width="150px"
        />
        <div className="footer-end__links">
          <Link href="/contact-us">
            <a>Contact us</a>
          </Link>
          <Link href="/faq">
            <a>FAQ</a>
          </Link>
          <Link href="/about-us">
            <a>About us</a>
          </Link>
          <Link href="/terms">
            <a>Terms & conditions</a>
          </Link>
          <Link href="/privacy-policy">
            <a>Privacy policy</a>
          </Link>
        </div>
      </div>
    </section>
  </Fragment>
);
