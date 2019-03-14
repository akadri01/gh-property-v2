import Link from "next/link";
import { Picture } from "react-responsive-picture";

export default (link, locationName, mobileImg, desktopImg) => (
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
)
