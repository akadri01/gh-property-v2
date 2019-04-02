export default ({ searchResultsQty, notFoundStr }) =>
  searchResultsQty == 0 && (
    <img
      className="listing--no-result-img"
      src={"/static/images/photos/no-result.png"}
      alt="No results found"
      title={`No properties found for ${notFoundStr}`}
    />
  );
