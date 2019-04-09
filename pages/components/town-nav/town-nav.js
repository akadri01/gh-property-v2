import Link from "next/link";
import { Picture } from "react-responsive-picture";

const insertImageFrame = (link, locationName, mobileImg, desktopImg) => (
  <Link href={link}>
    <a className="town-nav__town">
      <div className="town-nav__town-content">
        <h2>{locationName}</h2>
        <p>View properties</p>
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

const _accra = insertImageFrame(
  "/properties/latest?town=accra",
  "Accra",
  "accra-mobile.jpg",
  "accra-desktop.jpg"
);
const _kumasi = insertImageFrame(
  "/properties/latest?town=kumasi",
  "Kumasi",
  "kumasi-mobile.jpg",
  "kumasi-desktop.jpg"
);
const _tamale = insertImageFrame(
  "/properties/latest?town=tamale",
  "Tamale",
  "tamale-mobile.jpg",
  "tamale-desktop.jpg"
);
const _takoradi = insertImageFrame(
  "/properties/latest?town=takoradi",
  "Takoradi",
  "takoradi-mobile.jpg",
  "takoradi-desktop.jpg"
);
const _sunyani = insertImageFrame(
  "/properties/latest?town=sunyani",
  "Sunyani",
  "sunyani-mobile.jpg",
  "sunyani-desktop.jpg"
);
const _obuasi = insertImageFrame(
  "/properties/latest?town=obuasi",
  "Obuasi",
  "obuasi-mobile.jpg",
  "obuasi-desktop.jpg"
);

export default () => (
  <section className="town-nav mobile-desktop-frame">
    <div className="default-group">
      <h1>Property locations in Ghana</h1>
      <p>Our property collection for Ghana</p>
      <hr />
    </div>
    <div className="top">
      {_accra}
      {_kumasi}
    </div>
    <div className="middle">
      {_tamale}
      {_takoradi}
      {_sunyani}
    </div>
    <div className="bottom">{_obuasi}</div>
  </section>
);
