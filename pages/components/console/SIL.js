import React, { Component } from "react";
import "../../../public/styles/Main.scss";
import { popupWindow } from "../../../helpers/client/popup.js";
import { displayLoader } from "../../../helpers/client/btn-loader.js";
import { saveUserDataToLocalStorage } from "../../../helpers/client/localStorage.js";
import {
  LocationSelectMenu,
  TypeSelectMenu,
  MakeSelectMenu,
  TransmissionSelectMenu,
  EngineSizeSelectMenu,
  ColorSelectMenu,
  DoorsSelectMenu,
  SeatsSelectMenu
} from "../../_shared/index.js";

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      carType: "",
      make: "",
      transmission: "",
      engineSize: "",
      color: "",
      doors: "",
      seats: "",
      year: "",
      km: "",
      location: "",
      price: "",
      phone: "",
      details: "",
      email: this.props.user.email,
      userName: this.props.user.name,
      userId: this.props.user._id,
      userEmail: this.props.user.email
    };
    this.popupMsg = "";
    this.mainImg = [];
    this.images = [];
  }

  render() {
    return (
      <section className="create-ad detailed-search">
        <form
          id="createAddForm"
          className="default-form"
          onSubmit={this.formOnSubmit}
        >
          <h2>Post New Advert</h2>
          <fieldset>
            <legend>Features</legend>
            <TypeSelectMenu required={true} bindThis={this.inputChange} />
            <MakeSelectMenu required={true} bindThis={this.inputChange} />
            <TransmissionSelectMenu
              required={true}
              bindThis={this.inputChange}
            />
            <EngineSizeSelectMenu required={true} bindThis={this.inputChange} />
            <ColorSelectMenu required={true} bindThis={this.inputChange} />
            <DoorsSelectMenu required={true} bindThis={this.inputChange} />
            <SeatsSelectMenu required={true} bindThis={this.inputChange} />
          </fieldset>
          <fieldset>
            <legend>Condition</legend>
            <label>Year</label>
            <input
              type="number"
              placeholder=" e.g. 2003"
              name="year"
              required="required"
              onChange={this.inputChange}
            />
            <label>Kilometers</label>
            <input
              type="number"
              placeholder=" e.g. 93600"
              name="km"
              minLength="3"
              required="required"
              maxLength="20"
              onChange={this.inputChange}
            />
          </fieldset>
          <fieldset>
            <legend>Tell more...</legend>
            <LocationSelectMenu required={true} bindThis={this.inputChange} />
            <label>Price as GH₵</label>
            <input
              type="number"
              placeholder=" e.g. 17000"
              name="price"
              minLength="3"
              required="required"
              maxLength="20"
              onChange={this.inputChange}
            />
            <label>Phone number</label>
            <input
              type="number"
              placeholder=" e.g. 0242223344"
              name="phone"
              minLength="3"
              required="required"
              maxLength="20"
              onChange={this.inputChange}
            />
            <label>More details</label>
            <textarea
              name="details"
              placeholder=" Give more details about your vehicle..."
              minLength="10"
              required="required"
              maxLength="1000"
              onChange={this.inputChange}
            />
          </fieldset>
          <fieldset>
            <legend>Upload images</legend>
            <label>Main image</label>
            <input
              type="file"
              className="file"
              name="mainImage"
              onChange={this.registerMainImg}
            />
            <label>Other images (maximum 5)</label>
            <input
              type="file"
              className="file"
              name="images"
              multiple
              onChange={this.registerImages}
            />
          </fieldset>
          <button
            className="red-button"
            id="createAdSubmitBtn"
            type="submit"
            onClick={this.buttonOnClick}
          >
            Post
          </button>
        </form>
      </section>
    );
  }

  registerMainImg = e => {
    const isFileSizeCorrect = this.checkFileSize(e.target.files[0].size);
    if (isFileSizeCorrect) {
      this.mainImg = [e.target.files[0]];
    } else {
      popupWindow(
        "createAddForm",
        "Your main image is too large, maximum size 1MB."
      );
      e.target.value = "";
    }
  };

  checkFileSize = file => {
    // 786432  Bytes = 750KB (0.75MB)
    return file > 786432 ? false : true;
  };

  registerImages = e => {
    const fileQty = e.target.files.length;
    if (fileQty > 5) {
      popupWindow("createAddForm", "Maximum 5 images!");
      e.target.value = "";
      this.state.images = "";
    } else {
      for (let i = 0; i < fileQty; i++) {
        const isFileSizeCorrect = this.checkFileSize(e.target.files[i].size);
        if (isFileSizeCorrect) {
          this.images = [...this.images, e.target.files[i]];
        } else {
          popupWindow(
            "createAddForm",
            "Maximum picture size is 1MB! Please choose smaller photos."
          );
          e.target.value = "";
        }
      }
    }
  };

  buttonOnClick = () => {
    const inputValues =
      this.state.carType &&
      this.state.make &&
      this.state.transmission &&
      this.state.engineSize &&
      this.state.color &&
      this.state.doors &&
      this.state.seats &&
      this.state.year &&
      this.state.km &&
      this.state.location &&
      this.state.phone &&
      this.state.price &&
      this.state.details;
    if (!inputValues) {
      this.popupMsg = "Please fill required form fields!";
    }
  };

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  formOnSubmit = async e => {
    e.preventDefault();
    if (!this.popupMsg.length) {
      displayLoader("#createAdSubmitBtn");
      const formData = new FormData();
      formData.append(
        "inputValues",
        JSON.stringify({
          carType: this.state.carType,
          make: this.state.make,
          transmission: this.state.transmission,
          engineSize: this.state.engineSize,
          color: this.state.color,
          doors: this.state.doors,
          seats: this.state.seats,
          year: this.state.year,
          km: this.state.km,
          location: this.state.location,
          price: this.state.price,
          email: this.state.email,
          phone: this.state.phone,
          details: this.state.details,
          userName: this.state.userName,
          userId: this.state.userId,
          userEmail: this.state.userEmail
        })
      );
      // if any image uploaded
      if (this.mainImg[0] || this.images.length) {
        /// append images
        const allImages = [this.mainImg[0], ...this.images];
        allImages.forEach((singleImg, i) => {
          const imgName = "img" + i;
          formData.append(imgName, singleImg);
        });
      }
      // post form data
      axios
        .post("/api/user/create/advert", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          if (data && data.posts) {
            saveUserDataToLocalStorage(data);
            popupWindow(
              "createAddForm",
              "Congratulations, your advert is live!"
            );
            setTimeout(() => {
              // refresh page
              window.location.href = "/user/console";
            }, 3500);
          } else if (data && data.error) {
            popupWindow(
              "createAddForm",
              "Due to a technical issue, we are not able to post your ad, please try again later."
            );
          } else {
            popupWindow(
              "createAddForm",
              "Unfortunately we were not able to post your ad."
            );
          }
        })
        .catch(thrown => {
          console.log(thrown.message);
          popupWindow(
            "createAddForm",
            "Due to a technical issue, we are not able to post your ad, please try again later."
          );
        });
    } else {
      popupWindow("createAddForm", this.popupMsg);
      this.popupMsg = "";
    }
  };
}
