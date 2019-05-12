import { Fragment } from "react";
import Link from "next/link";
import {isPlural} from "../../../helpers/utility-func.js";

export default ({ name, posts_allowed }) => 
  <Fragment>
    <div className="console__topup-text-container">
      <span className="console__topup-text-container-text">Hello {name}</span>
      <span className="console__topup-text-container-text">
        You've <b>{posts_allowed}</b> {isPlural(posts_allowed, "advert")}{" "}
        allowence
      </span>
    </div>
    <Link href="/user/topup">
      <a className="console__topup-text-container-btn">Top up</a>
    </Link>
  </Fragment>
