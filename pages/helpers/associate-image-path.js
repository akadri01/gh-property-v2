/**
 **
 **  Determines correct image directory
 **
 **/
export default (directory, img) => {
  const base = "/static/images/";
  const directoryFor =
    directory === "icons" ? "icons" : "property-uploads/" + directory;
  return `${base}${directoryFor}/${img}`;
};
