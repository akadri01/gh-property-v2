import React, { Component, Fragment } from "react";
import approveFileUpload from "../helpers/approve-file-upload";
import { popupWindow } from "../helpers/popup";

export class RenderFileInput extends Component {
  onChange = e => {
    const { status, msg } = approveFileUpload(e.target.files);
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

export const renderCheckbox = ({ input, labelAndValue, id }) => (
  <div className="redux-checkbox-container">
    <input {...input} type="checkbox" id={id} value={labelAndValue} />
    <label htmlFor={id}>{labelAndValue}</label>
  </div>
);
