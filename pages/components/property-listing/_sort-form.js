import { Component } from "react";
import { sortPropertyListing } from "../../helpers/form-handles.js";

export default class SortForm extends Component {
  render() {
    return (
      this.props.searchResultsQty > 0 && (
        <form className="listing__sort" id="sortForm">
          <label>Sort by:</label>
          <select name="sort" onClick={sortPropertyListing}>
            <option value="latest">Latest adverts</option>
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
          </select>
        </form>
      )
    );
  }
  componentDidMount() {
    // show selected menu option
    if (this.props.searchResultsQty > 0) {
      const sortPreference = window.location.pathname.replace(
        "/properties/",
        ""
      );
      if (sortPreference) {
        const options = document
          .getElementById("sortForm")
          .getElementsByTagName("option");
        [].forEach.call(options, option => {
          if (option.value === sortPreference) {
            option.selected = "selected";
          } else {
            option.removeAttribute("selected");
          }
        });
      }
    }
  }
}
