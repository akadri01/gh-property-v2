export default (advertType, premisesType, town) => {
  const incompleteTitle = advertType === "rent" ? "Rental " : "For Sale ";
  return incompleteTitle + `${premisesType} in ${town}`;
};
