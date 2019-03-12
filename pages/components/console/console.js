import React from "react";
import Link from 'next/link';
import TopupLink from './_topup-link';
import PostAdvert from './_post-advert';

export default ({userData}) => {
  return (
    <section className="console mobile-desktop-frame">
      <div className="console__topup">
        <TopupLink {...userData}/>
      </div>
      <div className="console__post-advert">
        <PostAdvert/>
      </div>
    </section>
  );
};