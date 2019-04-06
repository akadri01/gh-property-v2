import { Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import { removeAdvert } from "../../../helpers/form-handles.js";
const trashImg = "/static/images/icons/bin.svg";
const editImg = "/static/images/icons/edit.svg";

export default ({ posts, _id }) => (
  <Fragment>
    <section className="posted mobile-desktop-frame">
      <h1 className="section-main-title">Posted Adverts</h1>
      {posts.map(({ url, title, thumbnailImg }) => (
        <div className="console__profile-frame-property">
          <Link href={`/property/${url}`}>
            <a className="console__profile-frame-property-content">
              <h4>{title.slice(0, 63)}...</h4>
            </a>
          </Link>
          <div className="console__profile-frame-property-controls">
            <Link href={`/user/advert/edit/${url}`}>
              <a className="console__profile-frame-property-controls-edit">
                <img
                  src={editImg}
                  title="Edit this advert"
                  alt="Edit this advert"
                />
                <span>Edit</span>
              </a>
            </Link>
            <Link href={`/api/user/advert/remove/${url}`}>
              <a className="console__profile-frame-property-controls-remove">
                <img
                  src={trashImg}
                  title="Remove this advert"
                  alt="Remove this advert"
                  onClick={e => {
                    removeAdvert(e, url, _id, thumbnailImg);
                  }}
                />
                <span>Remove</span>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </section>
    <div className="go-to-previous-page mobile-desktop-frame">
      <button
        onClick={() => {
          Router.back();
        }}
      >
        Previous page
      </button>
    </div>
  </Fragment>
);
