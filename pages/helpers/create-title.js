export default (advertType, premisesType, town) => {
  const str = advertType === "rent" ? "Rental " : "For Sale ";
  return str + `${premisesType} in ${town}`;
};
