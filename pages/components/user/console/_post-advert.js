import { Component, Fragment } from "react";
import axios from 'axios';
import Router from "next/router";
import { popupWindow } from "../../../helpers/popup.js";
import { delay } from "../../../helpers/utility-func.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";
import { saveUserDataToLocalStorage,getUserDataFromLocalStorage } from "../../../helpers/localStorage.js";
import {
  premisesTypeSelectField,
  featuresCheckboxFieldList,
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

export default class PostAdvert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mainImg = [];
    this.images = [];
  }

  postAd = async e => {
    e.preventDefault();
    const formData = new FormData();
    const { _id, name, email } = getUserDataFromLocalStorage();
    let values = {};
    const inputs = e.target.elements;

    // Extract form values
    for (let i = 0; i < inputs.length; i++) {
      const { value, name } = inputs.item(i);
      if (value.length && name !== 'mainImage' && name !== "images") {
        if (!name.includes('features')) {
          values[name] = value;
        }
        if (name.includes('features') && inputs.item(i).checked === true) {
          values[name] = value;
        }
      }
    } 

    // Add selected checkboxes
    values.features = this.sortCheckboxValues(values);

    // Add user information
    values.userName = name;
    values.userId = _id;
    values.userEmail = email;

    // Append all values
    formData.append("inputValues", JSON.stringify(values));

    // Append images
    if (this.mainImg.length || this.images.length) {
      this.mainImg =
        !this.mainImg || !this.mainImg.length
          ? [this.images[0]]
          : this.mainImg;
      const allImages =
        this.images && this.images.length
          ? [this.mainImg[0], ...this.images]
          : [this.mainImg[0]];
      allImages.forEach((singleImg, i) => {
        const imgName = "img" + i;
        formData.append(imgName, singleImg);
      });
    }

    // Send to form data server
    displayLoader("#postAdvertSubmit");
    const { data } = await axios.post("/api/user/create/advert", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    removeLoader("#postAdvertSubmit");
    if (!data._id) {
      return popupWindow(
        "postAdvertForm",
        "Unfortunately we were not able to post your ad. Please try again later."
      );
    }
    saveUserDataToLocalStorage(data);
    popupWindow("postAdvertForm", "Congratulations, your advert is live!");

    await delay(3500);
    return data.posts_allowed < 1 ? Router.push("/user/topup") : window.location.reload(false);
  };

  registerMainImg = e => {
    if (!e.target.files[0]) {
      this.mainImg = [];
      return;
    }
    if (!this.checkFileSize(e.target.files[0].size)) {
      e.target.value = "";
      this.mainImg = [];
      return popupWindow(
        "postAdvertForm",
        "Your main image is too large, maximum size 1MB."
      );
    }
    if (!this.checkFileType(e.target.files[0].name)) {
      e.target.value = "";
      this.mainImg = [];
      return popupWindow(
        "postAdvertForm",
        'Accepted image types: jpeg - jpg - png - gif'
      );
    }
    this.mainImg = [e.target.files[0]];
  };

  // 786432  Bytes = 750KB (0.75MB)
  checkFileSize = file => file > 786432 ? false : true;

  checkFileType = fileName => {
    const accepted = /jpeg|jpg|png|gif/;
    const extention = fileName.split('.').pop();
    return accepted.test(extention)
  }

  sortCheckboxValues = values => {
    const arr = [];
    featuresCheckboxFieldList.forEach(obj => {
      if (values.hasOwnProperty(obj.idAndName)) {
        arr.push(obj.labelAndValue);
      }
    });
    return arr;
  };

  registerImages = e => {
    if (!e.target.files[0]) {
      this.images = [];
      return;
    }
    const fileQty = e.target.files.length;
    if (fileQty > 5) {
      e.target.value = "";
      this.images = [];
      return popupWindow("postAdvertForm", "Maximum 5 images!");
    }
    for (let i = 0; i < fileQty; i++) {
      if (!this.checkFileSize(e.target.files[i].size)) {
        e.target.value = "";
        return popupWindow(
          "postAdvertForm",
          "Maximum picture size is 1MB! Please choose smaller photos."
        );
      }
      if (!this.checkFileType(e.target.files[i].name)) {
        e.target.value = "";
        this.images = [];
        return popupWindow(
          "postAdvertForm",
          'Accepted image types: jpeg - jpg - png - gif'
        );
      }
      this.images = [...this.images, e.target.files[i]];
    }
  };
  
  insertSelectMenu = (label, name, options) => (
    <div className="desktop-flex">
      <label>{label}</label>
      <select name={name}>
        {options.map(({value, text}) => (
          <option value={value} key={value}>{text}</option>
          ))}
      </select>
    </div>
  )

  render() {
    return (
      <Fragment>
        <h1 className="section-main-title">Create new advert</h1>
        <form
          onSubmit={this.postAd}
          id="postAdvertForm"
          className="console__post-advert-form default-form"
        >
          <h3 className="console__post-advert-form-section-title">
            General information
          </h3>
          <section className="desktop-flex-container">
            {this.insertSelectMenu('Type of the premises', 'premises_type', premisesTypeSelectField)}
            {this.insertSelectMenu('Advert type', 'advert_type', purposeSelectField)}
            {this.insertSelectMenu('Advert posted by', 'posted_by', postedBySelectField)}
            {this.insertSelectMenu('Rooms quantity', 'rooms_qty', roomsSelectField)}
            {this.insertSelectMenu('Region of the premises', 'region', locationRegionSelectField)}
            {this.insertSelectMenu('Town of the premises', 'town', locationTownSelectField)}
            {this.insertSelectMenu('Age of the premises', 'age', premisesAgeSelectField)}
            {this.insertSelectMenu('Located floor of the premises', 'located_floor', floorQtySelectField)}
            {this.insertSelectMenu('Total floor of the building', 'total_floor', floorQtySelectField)}
            {this.insertSelectMenu('Bathroom quantity', 'total_bathroom', bathroomQtySelectField)}
            {this.insertSelectMenu('Balcony quantity', 'total_balcony', balconyQtySelectField)}
            {this.insertSelectMenu('Garden', 'garden', yesNoSelectField)}
            {this.insertSelectMenu('Furnished', 'furniture', yesNoSelectField)}
            <div className="desktop-flex">
              <label>Phone number</label>
              <input type="number" name="phone" placeholder=" e.g.  0200 290 823" minLength="8" maxLength="14"/>
            </div>
            <div className="desktop-flex">
              <label>Price (GH₵)</label>
              <input type="number" name="price" placeholder=" e.g. 85000" minLength="2" maxLength="11"/>
            </div>
            <div className="desktop-flex">
              <label>Area of the premises (m2)</label>
              <input type="number" name="area" placeholder=" e.g. 130" minLength="1" maxLength="9"/>
            </div>
          </section>
          <h3 className="console__post-advert-form-section-title">
            Description
          </h3>
          <label>Advert title</label>
          <input type="text" name="title" placeholder=" e.g. Spacious modern flat in Accra" minLength="10" maxLength="110"/>
          <label>Tell more about the premises</label>
          <textarea name="detail" placeholder=" ..." minLength="10" maxLength="4000"></textarea>
          <h3 className="console__post-advert-form-section-title">Features</h3>
          <div className="console__post-advert-form-features-container">
            {featuresCheckboxFieldList.map(({ labelAndValue, idAndName }) => (
                <div className="checkbox-container default-checkbox-container">
                  <input type="checkbox" name={idAndName} id={idAndName} value={labelAndValue} />
                  <label htmlFor={idAndName}>{labelAndValue}</label>
                </div>
              )) 
            }
          </div>
          <h3 className="console__post-advert-form-section-title">
            Upload images
          </h3>
          <label>Main image</label>
          <input type="file" name="mainImage" onChange={this.registerMainImg}/>
          <label>Other images (maximum 6)</label>
          <input type="file" name="images" multiple onChange={this.registerImages}/>
          <button
            className="console__post-advert-form-submit-btn"
            id="postAdvertSubmit"
            type="submit"
          >
            Post
          </button>
        </form>
      </Fragment>
    );
  }
}