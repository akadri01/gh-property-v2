import React,{Component,Fragment} from "react";
import { reduxForm, Field } from 'redux-form';
import { required, email, length, confirmation } from 'redux-form-validators';
import { popupWindow, checkForPopup } from "../../helpers/popup.js";
import { displayLoader, removeLoader } from "../../helpers/btn-loader.js";
import { saveUserDataToLocalStorage } from "../../helpers/localStorage.js";
import {renderFormInput, renderSelectField} from '../../helpers/reduxForm';
import { postAdvert } from "../../redux/actions";
import {premisesTypeSelectField,yesNoSelectField,purposeSelectField,balconyQtySelectField,bathroomQtySelectField,floorQtySelectField,postedBySelectField, premisesAgeSelectField, roomsSelectField, locationRegionSelectField, locationTownSelectField} from '../shared/data';

class PostAdvert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.mainImg = [];
    this.images = [];
  }

  render() {
    return(
      <Fragment>
        <h1>Post new advert</h1>
        <form onSubmit={this.props.handleSubmit(this.userRegister)} id="postAdverForm" className="default-redux-form">
          <Field name="premises_type" component={renderSelectField} label="Type of the premises" validate={required()}>
            { premisesTypeSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="advert_type" component={renderSelectField} label="Advert type">
            { purposeSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="posted_by" component={renderSelectField} label="Advert posted by" validate={required()}>
            { postedBySelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="rooms_qty" component={renderSelectField} label="Rooms quantity" validate={required()}>
            { roomsSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="region" component={renderSelectField} label="Region of the premises" validate={required()}>
            { locationRegionSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="town" component={renderSelectField} label="Town of the premises" validate={required()}>
            { locationTownSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="age" component={renderSelectField} label="Age of the premises" validate={required()}>
            { premisesAgeSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="located_floor" component={renderSelectField} label=" Located floor of the premises" validate={required()}>
            { floorQtySelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="total_floor" component={renderSelectField} label=" Total floor of the building" validate={required()}>
            { floorQtySelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="total_bathroom" component={renderSelectField} label=" Bathroom quantity" validate={required()}>
            { bathroomQtySelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="total_balcony" component={renderSelectField} label=" Balcony quantity" validate={required()}>
            { balconyQtySelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="garden" component={renderSelectField} label=" Garden" validate={required()}>
            { yesNoSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <Field name="furniture" component={renderSelectField} label=" Furnished" validate={required()}>
            { yesNoSelectField.map(option => <option value={option.value}>{option.text}</option>) }
          </Field>
          <button type="submit" disabled={this.props.submitting} id="postAdvertSubmit">Post</button>
        </form>
      </Fragment>
    )
  }
  userRegister = async formValues => {
    displayLoader("#postAdvertSubmit");
    const {payload} = await this.props.dispatch(postAdvert(formValues));
    removeLoader("#registerSubmitBtn");
    // carry on with payload data
  }

  componentDidMount() {
    checkForPopup();
  }
}

PostAdvert = reduxForm({
  form: 'PostAdvertForm'
})(PostAdvert);

export default PostAdvert;