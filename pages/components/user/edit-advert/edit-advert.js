import { Component, Fragment } from "react";
import Router from "next/router";
import axios from 'axios';
import { popupWindow } from "../../../helpers/popup.js";
import { delay, retrieveFormValues } from "../../../helpers/utility-func.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import PreviousPage from "../../shared/previous-page.js";
import {
  premisesTypeSelectField,
  yesNoSelectField,
  purposeSelectField,
  balconyQtySelectField,
  bathroomQtySelectField,
  floorQtySelectField,
  postedBySelectField,
  premisesAgeSelectField,
  roomsSelectField,
  locationRegionSelectField,
  locationTownSelectField
} from "../../shared/data";

export default class EditAdvert extends Component {
  editAd = async e => {
    e.preventDefault();
    const values = retrieveFormValues(e.target.elements);
    values._id = this.props.property._id;
    displayLoader("#editAdvertSubmit");
    const { data } = await axios.put("/api/user/edit/advert", values); 
    removeLoader("#editAdvertSubmit"); 
    const redirectTo = data.success ? "/user/adverts?popup=Advert%20is%20updated!" : "/user/adverts?popup=Unfortunately%20we%20were%20not%20able%20to%20edit%20your%20ad.%20Please%20try%20again%20later.";
    return Router.push(redirectTo);
  };

  insertSelectMenu = (label, name, options, selected) => (
    <div className="desktop-flex">
      <label>{label}</label>
      <select name={name} required>
        {options.map(({value, text}) => { 
          return value == selected ? <option value={value} key={value} selected>{text}</option> :  <option value={value} key={value}>{text}</option>;
        })}
      </select>
    </div>
  )

  render() {
      const {
        phone,
        price,
        detail,
        advert_type,
        premises_type,
        rooms_qty,
        posted_by,
        region,
        town,
        age,
        located_floor,
        total_floor,
        total_bathroom,
        total_balcony,
        area, 
        furniture,
        garden,
        img_directory,
        images,
        title
      } = this.props.property;
     return (
      <Fragment>
        <section className="edit-advert mobile-desktop-frame">
          <h1 className="section-main-title">Edit Advert</h1>
          <p className="edit-advert--warning">
            * For security reasons you cannot change images and advert title
          </p>
          <div className="edit-advert__header">
            <img
              src={`/static/images/property-uploads/${img_directory}/${
                images[0]
              }`}
              alt="Advert main image"
              title="Advert main image"
              className="edit-advert__header-img"
            />
            <h3 className="edit-advert__header-title">{title}</h3>
          </div>
          <form
            onSubmit={this.editAd}
            id="editAdvertForm"
            className="console__post-advert-form default-form"
          >
            <h3 className="console__post-advert-form-section-title">
              General information
            </h3>
            <section className="desktop-flex-container">
              {this.insertSelectMenu('Type of the premises', 'premises_type', premisesTypeSelectField, premises_type)}
              {this.insertSelectMenu('Advert type', 'advert_type', purposeSelectField, advert_type)}
              {this.insertSelectMenu('Advert posted by', 'posted_by', postedBySelectField, posted_by)}
              {this.insertSelectMenu('Rooms quantity', 'rooms_qty', roomsSelectField, rooms_qty)}
              {this.insertSelectMenu('Region of the premises', 'region', locationRegionSelectField, region)}
              {this.insertSelectMenu('Town of the premise', 'town', locationTownSelectField, town)}
              {this.insertSelectMenu('Age of the premises', 'age', premisesAgeSelectField, age)}
              {this.insertSelectMenu('Located floor of the premises', 'located_floor', floorQtySelectField, located_floor)}
              {this.insertSelectMenu('Total floor of the building', 'total_floor', floorQtySelectField, total_floor)}
              {this.insertSelectMenu('Bathroom quantity', 'total_bathroom', bathroomQtySelectField, total_bathroom)}
              {this.insertSelectMenu('Balcony quantity', 'total_balcony', balconyQtySelectField, total_balcony)}
              {this.insertSelectMenu('Garden', 'garden', yesNoSelectField, garden)}
              {this.insertSelectMenu('Furnished', 'furniture', yesNoSelectField, furniture)}
              <div className="desktop-flex">
                <label>Phone number</label>
                <input id="phoneInput" type="number" name="phone" placeholder=" e.g.  0200 290 823" minLength="8" maxLength="14" required/>
              </div>
              <div className="desktop-flex">
                <label>Price (GH₵)</label>
                <input id="priceInput" type="number" name="price" placeholder=" e.g. 85000" minLength="2" maxLength="11" required/>
              </div>
              <div className="desktop-flex">
                <label>Area of the premises (m2)</label>
                <input id="areaInput" type="number" name="area" placeholder=" e.g. 130" minLength="1" maxLength="9" required/>
              </div>
            </section>
            <h3 className="console__post-advert-form-section-title">
              Description
            </h3>
            <label>Tell more about the premises</label>
            <textarea name="detail" placeholder=" ..." minLength="10" maxLength="4000">{detail}</textarea>
            <button
              className="console__post-advert-form-submit-btn"
              id="editAdvertSubmit"
              type="submit"
            >
              Post
            </button>
          </form>
          <br />
          <br />
          <br />
        </section>
        <PreviousPage />
      </Fragment>
    );
  }

  componentDidMount() {
    document.getElementById('phoneInput').value = this.props.property.phone;
    document.getElementById('priceInput').value = this.props.property.price;
    document.getElementById('areaInput').value = this.props.property.area;
  }
}
