import { Component, Fragment } from "react";
import Router from "next/router";
import { reduxForm, Field } from "redux-form";
import { required, email, length, confirmation } from "redux-form-validators";
import { popupWindow } from "../../../helpers/popup.js";
import { delay } from "../../../helpers/delay.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import PreviousPage from "../../shared/previous-page.js";
import {
  renderFormInput,
  renderSelectField,
  renderTextarea
} from "../../../helpers/reduxForm";
import { editAdvert } from "../../../redux/actions";
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

class EditAdvert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  editAd = async formValues => {
    displayLoader("#editAdvertSubmit");
    const { payload } = await this.props.dispatch(editAdvert(formValues));
    removeLoader("#editAdvertSubmit");
    if (!payload.success) {
      return Router.push(
        "/user/adverts?popup=Unfortunately%20we%20were%20not%20able%20to%20edit%20your%20ad.%20Please%20try%20again%20later."
      );
    }
    Router.push("/user/adverts?popup=Advert%20is%20updated!");
  };
  componentWillMount() {
    // initialize form values
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
      _id
    } = this.props.property;
    this.props.initialize({
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
      _id
    });
  }

  render() {
    const { img_directory, images, title } = this.props.property;
    return [
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
          onSubmit={this.props.handleSubmit(this.editAd)}
          id="editAdvertForm"
          className="console__post-advert-form default-redux-form"
        >
          <h3 className="console__post-advert-form-section-title">
            General information
          </h3>
          <section className="desktop-flex-container">
            <div className="desktop-flex">
              <Field
                name="premises_type"
                component={renderSelectField}
                label="Type of the premises"
                validate={required()}
              >
                {premisesTypeSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="advert_type"
                component={renderSelectField}
                label="Advert type"
                validate={required()}
              >
                {purposeSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="posted_by"
                component={renderSelectField}
                label="Advert posted by"
                validate={required()}
              >
                {postedBySelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="rooms_qty"
                component={renderSelectField}
                label="Rooms quantity"
                validate={required()}
              >
                {roomsSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="region"
                component={renderSelectField}
                label="Region of the premises"
                validate={required()}
              >
                {locationRegionSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="town"
                component={renderSelectField}
                label="Town of the premises"
                validate={required()}
              >
                {locationTownSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="age"
                component={renderSelectField}
                label="Age of the premises"
                validate={required()}
              >
                {premisesAgeSelectField.map((option, i) => (
                  <option value={option.value} key={option.value + i}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="located_floor"
                component={renderSelectField}
                label="Located floor of the premises"
                validate={required()}
              >
                {floorQtySelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="total_floor"
                component={renderSelectField}
                label="Total floor of the building"
                validate={required()}
              >
                {floorQtySelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="total_bathroom"
                component={renderSelectField}
                label="Bathroom quantity"
                validate={required()}
              >
                {bathroomQtySelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="total_balcony"
                component={renderSelectField}
                label="Balcony quantity"
                validate={required()}
              >
                {balconyQtySelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="garden"
                component={renderSelectField}
                label="Garden"
                validate={required()}
              >
                {yesNoSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="furniture"
                component={renderSelectField}
                label="Furnished"
                validate={required()}
              >
                {yesNoSelectField.map(option => (
                  <option value={option.value} key={option.value}>
                    {option.text}
                  </option>
                ))}
              </Field>
            </div>
            <div className="desktop-flex">
              <Field
                name="phone"
                label=" Phone number"
                placeholder=" e.g.  0200 290 823"
                type="number"
                component={renderFormInput}
                validate={[required(), length({ min: 8, max: 14 })]}
              />
            </div>
            <div className="desktop-flex">
              <Field
                name="price"
                label=" Price (GH₵)"
                placeholder=" e.g. 85000"
                type="number"
                component={renderFormInput}
                validate={[required(), length({ min: 2, max: 11 })]}
              />
            </div>
            <div className="desktop-flex">
              <Field
                name="area"
                label=" Area of the premises (m2)"
                placeholder=" e.g. 130"
                type="number"
                component={renderFormInput}
                validate={[required(), length({ min: 1, max: 9 })]}
              />
            </div>
          </section>
          <h3 className="console__post-advert-form-section-title">
            Description
          </h3>
          <Field
            name="detail"
            label=" Tell more about the premises"
            placeholder=" ..."
            type="textarea"
            component={renderTextarea}
            validate={[required(), length({ min: 10, max: 3000 })]}
          />
          <button
            className="console__post-advert-form-submit-btn"
            id="editAdvertSubmit"
            type="submit"
            disabled={this.props.submitting}
          >
            Post
          </button>
        </form>
        <br />
        <br />
        <br />
      </section>,
      <PreviousPage />
    ];
  }
}

EditAdvert = reduxForm({
  form: "EditAdvertForm"
})(EditAdvert);

export default EditAdvert;
