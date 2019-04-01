import Link from "next/link";
import associateImgPath from "../../helpers/associate-image-path.js";

export default ({
  img_directory,
  images,
  title,
  advert_type,
  premises_type,
  town,
  region,
  url
}) => {
  const heading =
    (advert_type === "rent" ? "Rental " : "For Sale ") +
    `${premises_type} in ${town}`;
  return (
    <Link href={url ? `/property/${url}` : "#"}>
      <a className="simple-thumbnail">
        <img
          src={associateImgPath(img_directory, images[0])}
          alt="Property in Ghana"
          title="Click to view this property"
          className={images[0] === "loader.gif" ? "loader-image" : "real-image"}
        />
        <img
          src="/static/images/property-uploads/placeholders/thumbnail.jpg"
          className="hidden-placeholder"
        />
        <h4>{heading}</h4>
        <em>{`${title.substring(0, 140)}...`}</em>
      </a>
    </Link>
  );
};
