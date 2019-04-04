import React, { Fragment } from "react";
import Link from "next/link";
import isPlural from "../../helpers/isPlural.js";

export default ({ name, email, posts, posts_allowed, joined_date }) => {
  return (
    <Fragment>
      <h3>{name}</h3>
      <div>
        <b>Remaining credit:</b> {posts_allowed}
      </div>
      <div>
        <b>Email:</b> {email}
      </div>
      <div>
        <b>Joined at:</b> {joined_date}
      </div>
      <div>
        {posts_allowed.map(({ url, title, thumbnailImg }) => {
          return (
            <Link href={`/property/${post.url}`}>
              <a>
                <img src={`/static/images/${thumbnailImg}`} />
                <h4>{title}</h4>
              </a>
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};
