import Link from "next/link";
import { searchFormSubmit } from "../../helpers/form-handles.js";

export default () => (
  <form className="banner__form" id="searchForm" onSubmit={searchFormSubmit}>
    <h2>Search for property in Ghana</h2>
    <select name="location">
      <option value="">Select location</option>
      <optgroup label="Towns">
        <option value="TOWN_accra">Accra</option>
        <option value="TOWN_kumasi">Kumasi</option>
        <option value="TOWN_sekondi">Sekondi</option>
        <option value="TOWN_sunyani">Sunyani</option>
        <option value="TOWN_tamale">Tamale</option>
        <option value="TOWN_takoradi">Takoradi</option>
        <option value="TOWN_obuasi">Obuasi</option>
        <option value="TOWN_tema">Tema</option>
        <option value="TOWN_ashaiman">Ashaiman</option>
      </optgroup>
      <optgroup label="Regions">
        <option value="REGION_greater_accra">Greater Accra</option>
        <option value="REGION_central">Central</option>
        <option value="REGION_eastern">Eastern</option>
        <option value="REGION_western">Western</option>
        <option value="REGION_ashanti">Ashanti</option>
        <option value="REGION_northern">Northern</option>
        <option value="REGION_upper_east">Upper East</option>
        <option value="REGION_upper_west">Upper West</option>
        <option value="REGION_bolta">Volta</option>
        <option value="REGION_brong_ahafo">Brong Ahafo</option>
      </optgroup>
    </select>
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
