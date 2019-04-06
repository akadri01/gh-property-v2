import React, { Fragment } from "react";
import Router from "next/router";
import Link from "next/link";
import isPlural from "../../../helpers/isPlural.js";
import { removeAdvert } from "../../../helpers/form-handles.js";
const trashImg = "/static/images/icons/bin.svg";
const editImg = "/static/images/icons/edit.svg";

export default ({ name, email, posts, posts_allowed, joined_date, _id }) => {
  return (
    <Fragment>
      <h1 className="section-main-title">Posted Adverts</h1>
      <div className="console__profile-frame">
        {posts.slice(0, 8).map(({ url, title, thumbnailImg }) => {
          return (
            <div className="console__profile-frame-property">
              <Link href={`/property/${url}`}>
                <a className="console__profile-frame-property-content">
                  <div className="console__profile-frame-property-content-img-wrapper">
                    <img
                      src={`/static/images/property-uploads/${thumbnailImg}`}
                    />
                  </div>
                  <h4>{title.slice(0, 60)}...</h4>
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
                <div className="console__profile-frame-property-controls-remove">
                  <img
                    src={trashImg}
                    title="Remove this advert"
                    alt="Remove this advert"
                    onClick={() => {
                      removeAdvert(url, _id, thumbnailImg);
                    }}
                  />
                  <span>Remove</span>
                </div>
              </div>
            </div>
          );
        })}
        {posts.length > 8 && (
          <Link href="/user/adverts">
            <a className="console__profile-frame-adverts-anchor">
              View all posted adverts
            </a>
          </Link>
        )}
      </div>
    </Fragment>
  );
};
