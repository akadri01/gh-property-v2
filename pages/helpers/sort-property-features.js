import {featuresCheckboxFieldList} from '../components/shared/data';

export default formValues => {
  const arr = [];
  featuresCheckboxFieldList.forEach(obj => {
    if (formValues.hasOwnProperty(obj.idAndName)) {
      arr.push(obj.labelAndValue)
    }
  });
  return arr;
}

