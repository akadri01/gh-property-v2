import {Fragment} from 'react';

export const renderFormInput = ({ input, meta: {touched, error}, type, label, placeholder }) => {
  return (
    <Fragment>
      <label>{label}</label>
      <div className="redux-input-container">
        <input {...input} placeholder={placeholder} type={type}/>
        {error && touched && <span className="form-error">{error}</span>}
      </div>
    </Fragment>
  )
}
export const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => {
  return (
    <Fragment>
      <label>{label}</label>
      <div className="redux-input-container">
        <select {...input}>
          {children}
        </select>
        {error && touched && <span className="form-error">{error}</span>}
      </div>
    </Fragment>
  )
}
