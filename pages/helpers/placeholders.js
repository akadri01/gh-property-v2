/**
 **
 **  Generates placeholder properties
 **
 **/
import _times from "lodash.times";

export const placeholderProperties = (qty = 1, properties = []) => {
  _times(qty, () => {
    properties.push({
      advert_type: "...",
      premises_type: "...",
      town: "...",
      title: "...",
      img_directory: "icons",
      images: ["loader.gif"]
    });
  });
  return properties;
};
