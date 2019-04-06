import { LocationOptions } from "../shared";
import { searchFormSubmit } from "../../helpers/form-handles.js";

export default () => (
  <form className="banner__form" id="searchForm" onSubmit={searchFormSubmit}>
    <h2>Search for property in Ghana</h2>
    <select name="location">{LocationOptions}</select>
    <div className="banner__form-radios">
      <div className="banner__form-radios-radio">
        <input
          id="forRent"
          type="radio"
          name="advert_type"
          value="sale"
          defaultChecked={true}
        />
        <label htmlFor="forRent">For sale</label>
      </div>
      <div className="banner__form-radios-radio">
        <input id="forSale" type="radio" name="advert_type" value="rent" />
        <label htmlFor="forSale">To rent</label>
      </div>
    </div>
    <button type="submit">search</button>
  </form>
);
