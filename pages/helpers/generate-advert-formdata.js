import { getUserDataFromLocalStorage } from "./localStorage";
import sortFeatures from "./sort-property-features";

export default formValues => {
  const formData = new FormData();
  const { _id, name, email } = getUserDataFromLocalStorage();

  formData.append(
    "inputValues",
    JSON.stringify({
      advert_type: formValues.advert_type,
      age: formValues.age,
      area: formValues.area,
      detail: formValues.detail,
      features: sortFeatures(formValues),
      furniture: formValues.furniture,
      garden: formValues.garden,
      located_floor: formValues.located_floor,
      phone: formValues.phone,
      posted_by: formValues.posted_by,
      premises_type: formValues.premises_type,
      price: formValues.price,
      region: formValues.region,
      rooms_qty: formValues.rooms_qty,
      title: formValues.title,
      total_balcony: formValues.total_balcony,
      total_bathroom: formValues.total_bathroom,
      total_floor: formValues.total_floor,
      town: formValues.town,
      userName: name,
      userId: _id,
      userEmail: email
    })
  );
  // append if any image uploaded
  if (formValues.mainImage || formValues.images) {
    formValues.mainImage =
      !formValues.mainImage || !formValues.mainImage.length
        ? [formValues.images[0]]
        : formValues.mainImage;
    const allImages =
      formValues.images && formValues.images.length
        ? [formValues.mainImage[0], ...formValues.images]
        : [formValues.mainImage[0]];
    allImages.forEach((singleImg, i) => {
      const imgName = "img" + i;
      formData.append(imgName, singleImg);
    });
  }
  return formData;
};
