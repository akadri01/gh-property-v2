import { Fragment } from "react";
import isPlural from "../../helpers/isPlural.js";

export default ({ searchResultsQty, notFoundStr }) => (
  <h1 className="listing--title">
    {searchResultsQty == 0 ? (
      `No results to show ( ${notFoundStr} )`
    ) : (
      <Fragment>
        {searchResultsQty} {isPlural(searchResultsQty, "Property", "ies")} to
        view
      </Fragment>
    )}
  </h1>
);
