export default files => {
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
