import insertImageFrame from "../../helpers/insert-img-frames";

export default () => (
  <section className="town-nav mobile-desktop-frame">
    <div className="default-group">
      <h1>Property locations in Ghana</h1>
      <p>Our property collection for Ghana</p>
      <hr />
    </div>
    <div className="top">
      {insertImageFrame("#", "Accra", "accra-mobile.jpg", "accra-desktop.jpg")}
      {insertImageFrame(
        "#",
        "Kumasi",
        "kumasi-mobile.jpg",
        "kumasi-desktop.jpg"
      )}
    </div>
    <div className="middle">
      {insertImageFrame(
        "#",
        "Tamale",
        "tamale-mobile.jpg",
        "tamale-desktop.jpg"
      )}
      {insertImageFrame(
        "#",
        "Takoradi",
        "takoradi-mobile.jpg",
        "takoradi-desktop.jpg"
      )}
      {insertImageFrame(
        "#",
        "Sunyani",
        "sunyani-mobile.jpg",
        "sunyani-desktop.jpg"
      )}
    </div>
    <div className="bottom">
      {insertImageFrame(
        "#",
        "Obuasi",
        "obuasi-mobile.jpg",
        "obuasi-desktop.jpg"
      )}
    </div>
  </section>
);
