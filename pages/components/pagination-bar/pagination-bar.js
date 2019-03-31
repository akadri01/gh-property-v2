import _times from "lodash.times";
import { PAGINATION_QUANTITY } from "../../../globals/globals.json";
import paginate from "../../helpers/paginate.js";

export default ({ searchResultsQty, searchQuery }) => {
  const pageQty = Math.ceil(searchResultsQty / PAGINATION_QUANTITY);
  const currentPageNumber = parseInt(searchQuery.slice(-1));
  const paginated = searchQuery.includes("&page=");
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
        {_times(pageQty, i => {
          // to style selected page button
          let cssClass = "pagination-bar__pages-btn ";
          // if first time landed to page, style first button (button number 1)
          if (!paginated && i === 0) {
            cssClass += "active-page";
            // user already did pagination
          } else {
            // find out page number
            const currentPage = currentPageNumber;
            // if page number and button number matches, style it
            if (currentPage === i) {
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
        })}
      </div>
      {/*dont show next button if user on last page*/}
      {pageQty !== currentPageNumber + 1 && (
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
    </section>
  );
};
