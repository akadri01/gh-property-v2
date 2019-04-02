import {
  MaxPriceOptionsForSale,
  MinPriceOptionsForSale
} from "../shared/index.js";
import { locationTownSelectField } from "../shared/data.js";
import handleFilterFormSubmit from "../../helpers/filter-form-submit";

export default () => {
  return (
    <section className="listing__filter">
      <form
        className="listing__filter-form default-redux-form"
        id="filterForm"
        onSubmit={handleFilterFormSubmit}
      >
        <div className="redux-input-container">
          <label>Premises type</label>
          <select name="premises_type">
            <option value="house" selected>
              House
            </option>
            <option value="flat">Flat</option>
            <option value="office">Office</option>
            <option value="land">Land</option>
            <option value="building">Building</option>
          </select>
        </div>
        <div className="redux-input-container">
          <label>Advert type</label>
          <select name="advert_type">
            <option value="sale" selected>
              For sale
            </option>
            <option value="rent">Rental</option>
          </select>
        </div>
        <div className="redux-input-container">
          <label>Min price</label>
          <select name="minPrice">{MinPriceOptionsForSale}</select>
        </div>
        <div className="redux-input-container">
          <label>Max price</label>
          <select name="maxPrice">{MaxPriceOptionsForSale}</select>
        </div>
        <div className="redux-input-container">
          <label>Town</label>
          <select name="town">
            {locationTownSelectField.map(townObj => {
              return <option value={townObj.value}>{townObj.text}</option>;
            })}
          </select>
        </div>
        <button>Filter</button>
      </form>
    </section>
  );
};
