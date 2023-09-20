import React, { Component } from "react";
import { SORT_TYPE, SORT_TYPE_PROPOSALS } from "../../utils/const";

class SortHolder extends Component {
  onMouseEnter = () => {
    window.dispatchEvent(new CustomEvent("CUSTOM_FX", { detail: { type: "SORT_ENTER" } }));
  };

  onMouseLeave = () => {
    window.dispatchEvent(new CustomEvent("CUSTOM_FX", { detail: { type: "SORT_LEAVE" } }));
  };

  handleSortChange = (count) => {
    this.props.onSortChange(count); // Pass the selected count to the parent
  }

  render() {
    const SORT_TYPE_ARRAY = this.props.type === "PROPOSALS" ? SORT_TYPE_PROPOSALS : SORT_TYPE;

    return (
      <div className="sort-holder" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <p>
          {this.props.count}
          <span>(Show)</span>
          <em className="img"></em>
        </p>
        <ul>
          {SORT_TYPE_ARRAY.map((count, index) => (
            <li
              key={index}
              onClick={() => {
                this.props.getData(count);
                this.handleSortChange(count);
              }}
            >
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SortHolder;
