import Link from "next/link";
import { Picture } from "react-responsive-picture";

const insertImageFrame = (link, locationName, mobileImg, desktopImg) => (
  <Link href={link}>
    <a className="town-nav__town">
      <div className="town-nav__town-overlay">
        <h2 className="town-nav__town-title">{locationName}</h2>
        <p className="town-nav__town-text">View properties</p>
      </div>
      <Picture
        sources={[
          {
            srcSet: `/static/images/photos/${mobileImg}`,
            media: "(max-width: 890px)"
          },
          {
            srcSet: `/static/images/photos/${desktopImg}`,
            type: "image/jpg"
          }
        ]}
        style={{ width: "100%" }}
        alt="Search for property in Ghana"
      />
    </a>
  </Link>
);

export default () => (
  <section className="town-nav mobile-desktop-frame">
    <div className="default-group">
      <h1>Property locations in Ghana</h1>
      <p>Our property collection for Ghana</p>
      <hr />
    </div>
    <div className="top">
      {insertImageFrame(
        "/properties?town=accra",
        "Accra",
        "accra-mobile.jpg",
        "accra-desktop.jpg"
      )}
      {insertImageFrame(
        "/properties?town=kumasi",
        "Kumasi",
        "kumasi-mobile.jpg",
        "kumasi-desktop.jpg"
      )}
    </div>
    <div className="middle">
      {insertImageFrame(
        "/properties?town=tamale",
        "Tamale",
        "tamale-mobile.jpg",
        "tamale-desktop.jpg"
      )}
      {insertImageFrame(
        "/properties?town=takoradi",
        "Takoradi",
        "takoradi-mobile.jpg",
        "takoradi-desktop.jpg"
      )}
      {insertImageFrame(
        "/properties?town=sunyani",
        "Sunyani",
        "sunyani-mobile.jpg",
        "sunyani-desktop.jpg"
      )}
    </div>
    <div className="bottom">
      {insertImageFrame(
        "/properties?town=obuasi",
        "Obuasi",
        "obuasi-mobile.jpg",
        "obuasi-desktop.jpg"
      )}
    </div>
  </section>
);
