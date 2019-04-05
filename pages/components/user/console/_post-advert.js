import React, { Component, Fragment } from "react";
import Router from "next/router";
import { reduxForm, Field } from "redux-form";
import { required, email, length, confirmation } from "redux-form-validators";
import { popupWindow, checkForPopup } from "../../../helpers/popup.js";
import { displayLoader, removeLoader } from "../../../helpers/btn-loader.js";
import { saveUserDataToLocalStorage } from "../../../helpers/localStorage.js";
import {
  RenderFileInput,
  renderFormInput,
  renderSelectField,
  renderTextarea,
  renderCheckbox
} from "../../../helpers/reduxForm";
import { postAdvert } from "../../../redux/actions";
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

class PostAdvert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  postAd = async formValues => {
    displayLoader("#postAdvertSubmit");
    const { payload } = await this.props.dispatch(postAdvert(formValues));
    removeLoader("#postAdvertSubmit");
    if (!payload._id) {
      return popupWindow(
        "postAdvertForm",
        "Unfortunately we were not able to post your ad. Please try again later."
      );
    }
    saveUserDataToLocalStorage(payload);
    popupWindow("postAdvertForm", "Congratulations, your advert is live!");
    setTimeout(() => {
      payload.posts_allowed < 1
        ? Router.push("/user/topup")
        : window.location.reload(false);
    }, 3500);
  };

  componentDidMount() {
    checkForPopup();
  }
  render() {
    return (
      <Fragment>
        <h1 className="section-main-title">Create new advert</h1>
        <form
          onSubmit={this.props.handleSubmit(this.postAd)}
          id="postAdvertForm"
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
            name="title"
            label=" Advert title"
            placeholder=" e.g. Spacious modern flat in Accra"
            type="text"
            component={renderFormInput}
            validate={[required(), length({ min: 10, max: 110 })]}
          />
          <Field
            name="detail"
            label=" Tell more about the premises"
            placeholder=" ..."
            type="textarea"
            component={renderTextarea}
            validate={[required(), length({ min: 10, max: 3000 })]}
          />
          <h3 className="console__post-advert-form-section-title">Features</h3>
          <div className="console__post-advert-form-features-container">
            {featuresCheckboxFieldList.map(({ labelAndValue, idAndName }) => {
              return (
                <Field
                  key={idAndName}
                  name={idAndName}
                  labelAndValue={labelAndValue}
                  id={idAndName}
                  component={renderCheckbox}
                />
              );
            })}
          </div>
          <h3 className="console__post-advert-form-section-title">
            Upload images
          </h3>
          <Field
            name="mainImage"
            label=" Main image"
            component={RenderFileInput}
          />
          <Field
            name="images"
            label=" Other images (maximum 6)"
            isMultiple={true}
            component={RenderFileInput}
          />
          <button
            className="console__post-advert-form-submit-btn"
            id="postAdvertSubmit"
            type="submit"
            disabled={this.props.submitting}
          >
            Post
          </button>
        </form>
      </Fragment>
    );
  }
}

PostAdvert = reduxForm({
  form: "PostAdvertForm"
})(PostAdvert);

export default PostAdvert;
