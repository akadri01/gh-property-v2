import React, { Component, Fragment } from "react";
import { popupWindow } from "../helpers/popup";

// File input
export class RenderFileInput extends Component {
  approveFileUpload = files => {
    if (files.length > 6) {
      return {
        status: false,
        msg: "Maximum 6 images."
      };
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 786432) {
        return {
          status: false,
          msg: "Maximum image size is 750KB! Please reduce image size."
        };
      }
    }
    return {
      status: true
    };
  };
  onChange = e => {
    const { status, msg } = this.approveFileUpload(e.target.files);
    if (!status) {
      e.target.value = "";
      return popupWindow(undefined, msg);
    }
    const {
      input: { onChange }
    } = this.props;
    onChange(e.target.files);
  };
  render() {
    const {
      input,
      isMultiple,
      label,
      meta: { touched, error }
    } = this.props;
    const single = (
      <input type="file" accept=".jpg, .png, .jpeg" onChange={this.onChange} />
    );
    const multiple = (
      <input
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={this.onChange}
        multiple="multiple"
      />
    );
    return (
      <div className="redux-form-file-input-container">
        <label>{label}</label>
        <div>
          {isMultiple ? multiple : single}
          {error && touched && <span className="form-error">{error}</span>}
        </div>
      </div>
    );
  }
}

// text & password & number input
export const renderFormInput = ({
  input,
  meta: { touched, error },
  type,
  label,
  placeholder
}) => (
  <Fragment>
    <label>{label}</label>
    <div className="redux-input-container">
      <input {...input} placeholder={placeholder} type={type} />
      {error && touched && <span className="form-error">{error}</span>}
    </div>
  </Fragment>
);

// select menu
export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children
}) => (
  <Fragment>
    <label>{label}</label>
    <div className="redux-input-container">
      <select {...input}>{children}</select>
      {error && touched && <span className="form-error">{error}</span>}
    </div>
  </Fragment>
);

// Textarea
export const renderTextarea = ({
  input,
  label,
  placeholder,
  meta: { touched, error }
}) => (
  <Fragment>
    <label>{label}</label>
    <div className="redux-textarea-container">
      <textarea {...input} placeholder={placeholder} />
      {error && touched && <span className="form-error">{error}</span>}
    </div>
  </Fragment>
);

// Checkbox
export const renderCheckbox = ({ input, labelAndValue, id }) => (
  <div className="redux-checkbox-container">
    <input {...input} type="checkbox" id={id} value={labelAndValue} />
    <label htmlFor={id}>{labelAndValue}</label>
  </div>
);
