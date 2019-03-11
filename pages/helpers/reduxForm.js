import {Fragment} from 'react';

export const renderFormInput = ({ input, meta, type, label, placeholder }) => {
  return (
    <Fragment>
      <label>{label}</label>
      <div className="redux-input-container">
        <input {...input} placeholder={placeholder} type={type}/>
        {meta.error && meta.touched && <span className="form-error">{meta.error}</span>}
      </div>
    </Fragment>
  )
}