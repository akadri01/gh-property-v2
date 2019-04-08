import { Fragment, Component } from "react";
import Router from "next/router";
import Link from "next/link";
import PreviousPage from "../../shared/previous-page.js";
import { popupWindow } from "../../../helpers/popup.js";
import { removeAdvert } from "../../../helpers/form-handles.js";
const trashImg = "/static/images/icons/bin.svg";
const editImg = "/static/images/icons/edit.svg";

export default class UserAdvertsList extends Component {
  state = {
    msg: "",
    posts: [],
    shouldUpdate: false
  };
  render() {
    const { posts, _id } = this.props;
    return (
      <Fragment>
        <section className="posted mobile-desktop-frame">
          <h1 className="section-main-title">Posted Adverts</h1>
          {(this.state.shouldUpdate ? this.state.posts : posts).map(
            ({ url, title, thumbnailImg }) => (
              <div className="console__profile-frame-property">
                <Link href={`/property/${url}`}>
                  <a className="console__profile-frame-property-content">
                    <h4>{title.slice(0, 63)}...</h4>
                  </a>
                </Link>
                <div className="console__profile-frame-property-controls">
                  <Link href={`/user/advert/edit/${url}`}>
                    <a className="console__profile-frame-property-controls-edit">
                      <img
                        src={editImg}
                        title="Edit this advert"
                        alt="Edit this advert"
                      />
                      <span>Edit</span>
                    </a>
                  </Link>
                  <div
                    className="console__profile-frame-property-controls-remove"
                    onClick={async () => {
                      const posts = await removeAdvert(url, _id, thumbnailImg);
                      return posts
                        ? this.setState({
                            posts,
                            shouldUpdate: true,
                            msg: "Post is removed!"
                          })
                        : this.setState({
                            msg:
                              "Due to a technical issue, we are not able to remove your post, please try again later."
                          });
                    }}
                  >
                    <img
                      src={trashImg}
                      title="Remove this advert"
                      alt="Remove this advert"
                    />
                    <span>Remove</span>
                  </div>
                </div>
              </div>
            )
          )}
        </section>
        <PreviousPage />
      </Fragment>
    );
  }
  componentDidUpdate() {
    if (this.state.msg.length) {
      popupWindow(undefined, this.state.msg);
      this.setState({ msg: "" });
    }
  }
}
