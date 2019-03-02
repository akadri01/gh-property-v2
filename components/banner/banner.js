import { Picture } from "react-responsive-picture";
import {LocationOptions, MaxPriceOptions, MinPriceOptions} from '../shared';

export default () => {
  return (
    <section className="banner">
      <Picture
        sources={[
          {
            srcSet: "/static/images/photos/banner-tablet.jpg",
            media: "(max-width: 890px)"
          },
          {
            srcSet: "/static/images/photos/banner-desktop.jpg",
            type: "image/jpg"
          }
        ]}
        style={{ width: "100%" }}
        alt="Search for property in Ghana"
      />
      <form className="banner__form">
        <h2>Search for property in Ghana</h2>
        <select name="location">
          {LocationOptions}
        </select>
        <div className="banner__form-radios">
          <div>
            <input id="forRent" type="radio" name="status" value="SALE" checked/> 
            <label for="forRent">For sale</label>
          </div>
          <div>
            <input id="forSale" type="radio" name="status" value="RENT"/>
            <label for="forSale">To rent</label>
          </div>
        </div>
        <button>search</button>
      </form>
    </section>
  );
};

