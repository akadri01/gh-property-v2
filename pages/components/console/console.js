import React from "react";

export default props => {
  console.log(props)
  return (
    <section className="console mobile-desktop-frame">
      <div>{props.userData.name}</div>
      <div>{props.userData.email}</div>
      <div>{props.userData.posts_allowed}</div> 
    </section>
  );
};