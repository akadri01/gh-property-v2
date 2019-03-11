import React from 'react'
import {reduxForm, Field} from 'redux-form'
import isValidEmail from 'sane-email-validation';


// dummy function simulates server latency after submit event
async function dummyAjaxCall() {
  await new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(window.alert('your ajax call returned from server :)'));
    }, 2000);
  })
}

// validate function is to validate form data (form won't be submited unless required fields filled)
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required'
    return errors;
  }
  if (!values.email) {
    errors.email = 'Required'
    return errors;
  } 
  if (!isValidEmail(values.email)) {
    errors.email = 'Invalid Email'
    return errors;
  }
  if (!values.age) {
    errors.age = 'Required'
    return errors;
  }
}

function renderInput({input, meta, label, placeholder}) {
  return (
    <div className={[
      meta.error && meta.touched ? 'error-css-class' : '',
      meta.active ? 'css-class-for-active-input' : ''
    ].join(' ')}>
      <label>{label}</label>
      <input {...input} placeholder={placeholder}/>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
}

function renderTextarea({input, meta, label, placeholder}) {
  return (
    <div>
      <label>{label}</label>
      <textarea {...input} placeholder={placeholder}></textarea>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
}


const optionsForSelectMenu = ['Twentyeight', 'Twentynine', 'Thirty'];
function renderSelectMenu({input, meta, label}) {
  return (
    <div>
      <label>{label}</label>
      <select {...input}>
        <option value=''>Please select your age</option>
        {optionsForSelectMenu.map(option => {
          return <option key={option} value={option.toUpperCase()}>{option}</option>
        })}
      </select>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  )
}

// Form
let DemoForm = ({handleSubmit, submitting}) => {
  return (
    <form onSubmit={handleSubmit(dummyAjaxCall)}>
      <Field name="name" label="Full name" placeholder=' Full name...' component={renderInput}/>
      <Field name="email" label="Email" placeholder=" @" component={renderInput}/>
      <Field name="address" placeholder=" Address..." component={renderTextarea}/>
      <Field name="age" component={renderSelectMenu}/>
      <button type="submit" disabled={submitting}>Submit</button>
    </form>
  )
}

// decorating form component with redux form wrapper
DemoForm = reduxForm({
  form: 'myDemoForm',
  validate
})(DemoForm);

// exporting form component
export default DemoForm;