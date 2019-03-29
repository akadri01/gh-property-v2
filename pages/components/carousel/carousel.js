import React, { Component } from "react";
const Carousel = require("react-responsive-carousel").Carousel;

export default class Gallery extends Component {
  render() {
    return (
      <section className="gallery">
        <Carousel
          showArrows={true}
          onChange={this.onChange}
          onClickItem={this.onClickItem}
          onClickThumb={this.onClickThumb}
        >
          {this.props.images.slice(1, this.props.images.length).map(img => {
            return (
              <div>
                <img
                  src={`/static/images/property-uploads/${
                    this.props.directory
                  }/${img}`}
                />
              </div>
            );
          })}
        </Carousel>
      </section>
    );
  }
}
