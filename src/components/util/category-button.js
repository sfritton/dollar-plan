import React from "react";

("use strict");

class CategoryButton extends React.Component {
  render() {
    return (
      <div
        className={this.props.subCategory ? "sub-category" : "category"}
        onClick={this.props.onClick}
      >
        <div
          className={
            this.props.subCategory ? "sub-category-title" : "category-title"
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CategoryButton;
