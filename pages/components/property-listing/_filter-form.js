import { locationTownSelectField, minPrice, maxPrice } from "../shared/data.js";
import { filterFormSubmit } from "../../helpers/form-handles.js";

export default () => {
  return (
    <section className="listing__filter">
      <button
        className="listing__filter--expose-filter-btn"
        onClick={() => {
          document
            .getElementById("filterForm")
            .classList.toggle("display-filter-options");
        }}
      >
        Filter
      </button>
      <form
        className="listing__filter-form default-redux-form"
        id="filterForm"
        onSubmit={filterFormSubmit}
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
          <select name="minPrice">
            {minPrice.map(({ value, text }) => (
              <option value={value}>{text}</option>
            ))}
          </select>
        </div>
        <div className="redux-input-container">
          <label>Max price</label>
          <select name="maxPrice">
            {maxPrice.map(({ value, text }) => (
              <option value={value}>{text}</option>
            ))}
          </select>
        </div>
        <div className="redux-input-container">
          <label>Town</label>
          <select name="town">
            {locationTownSelectField.map(townObj => {
              return <option value={townObj.value}>{townObj.text}</option>;
            })}
          </select>
        </div>
        <button className="listing__filter-form-btn">Filter</button>
      </form>
    </section>
  );
};
