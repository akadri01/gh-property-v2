import _times from "lodash.times";
import { PAGINATION_QUANTITY } from "../../../globals/globals.json";
import paginate from "../../helpers/paginate.js";
import isPlural from "../../helpers/isPlural.js";

export default ({ searchResultsQty, searchQuery }) => {
  const totalPageQty = Math.ceil(searchResultsQty / PAGINATION_QUANTITY);
  const url = new URL("https://" + searchQuery);
  const currentPageNumber = url.searchParams.get("page");
  const paginated = searchQuery.includes("&page=");

  // max 7 page numbers (suitable for mobile)
  const buttonQty = totalPageQty < 7 ? totalPageQty : 7;

  return (
    <section className="pagination-bar">
      {/*don't show previous button if user on first page*/}
      {!paginated ||
        (currentPageNumber !== 0 && (
          <button
            className="pagination-bar--large-btn previous"
            onClick={() => {
              paginate(currentPageNumber - 1);
            }}
          >
            Prev
          </button>
        ))}
      <div className="pagination-bar__pages">
        {_times(buttonQty, i => {
          // make the number bar dynamic and keep the active page always in the middle
          i +=
            currentPageNumber && currentPageNumber > 2
              ? currentPageNumber - 3
              : 0;
          // do not create button more than page quantity
          if (i < totalPageQty) {
            // to style selected page button
            let cssClass = "pagination-bar__pages-btn ";
            // if first time landed to page, style first button (button number 1)
            if (!paginated && i === 0) {
              cssClass += "active-page";
              // user already did pagination
            } else {
              // if page number and button number matches, style it
              if (currentPageNumber === i) {
                cssClass += "active-page";
              }
            }
            return (
              <button
                className={cssClass}
                onClick={() => {
                  paginate(i);
                }}
              >
                {i + 1}
              </button>
            );
          }
        })}
      </div>
      {/*dont show next button if user on last page*/}
      {totalPageQty !== currentPageNumber + 1 && (
        <button
          className="pagination-bar--large-btn next"
          onClick={() => {
            !isNaN(currentPageNumber)
              ? paginate(currentPageNumber + 1)
              : paginate(1);
          }}
        >
          Next
        </button>
      )}
      <p className="pagination-bar--results">
        <b>{totalPageQty}</b> {isPlural(totalPageQty, "page")} and{" "}
        <b>{searchResultsQty}</b>{" "}
        {isPlural(searchResultsQty, "property", "ies")} to view
      </p>
    </section>
  );
};
