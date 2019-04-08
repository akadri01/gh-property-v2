import Router from "next/router";

export default () => (
  <div className="go-to-previous-page mobile-desktop-frame">
    <button
      onClick={() => {
        Router.back();
      }}
    >
      Previous page
    </button>
  </div>
);
