import _times from "lodash.times";
import Router from "next/router";
import { PAGINATION_QUANTITY } from "../../../globals/globals.json";
import { getPropertySearchQueryFromLocalStorage } from "../../helpers/localStorage";

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
      <button className="pagination-bar--large-btn next">Next</button>
    </section>
  );
};

async function paginate(pageNumber) {
  // new page query
  const pageQuery = `&page=${pageNumber}`;

  // previous search query
  let activeQuery = getPropertySearchQueryFromLocalStorage();

  // remove prev page query
  const previousPageQueryIndex = activeQuery.indexOf("&page=");
  if (previousPageQueryIndex !== -1) {
    activeQuery = activeQuery.substring(0, previousPageQueryIndex);
  }

  // remove base url
  activeQuery = activeQuery.replace("/properties", "");

  // insert ? if doesn't exist
  activeQuery = activeQuery.charAt(0) !== "?" ? `?${activeQuery}` : activeQuery;

  Router.push(`/properties${activeQuery}${pageQuery}`);
}
