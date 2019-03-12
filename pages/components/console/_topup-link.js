import React,{Fragment} from "react";
import Link from 'next/link';
import isPlural from '../../helpers/isPlural.js';

export default ({name, posts_allowed}) => {
  return (
    <Fragment>
      <span>Hello {name}, you have <b>{posts_allowed}</b> {isPlural(posts_allowed, 'post')} allowance</span>
      <Link href="/user/topup"><a>Top up</a></Link>
    </Fragment>
  )
}