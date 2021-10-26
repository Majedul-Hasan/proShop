import React from "react";
import PropTypes from "prop-types";

const Ratings = ({ ratingValue, text, color }) => {
  return (
    <div className='rating my-3'>
      <span>
        <i
          style={{ color }}
          className={
            ratingValue >= 1
              ? "fas fa-star"
              : ratingValue >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingValue >= 2
              ? "fas fa-star"
              : ratingValue >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingValue >= 3
              ? "fas fa-star"
              : ratingValue >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingValue >= 4
              ? "fas fa-star"
              : ratingValue >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            ratingValue >= 5
              ? "fas fa-star"
              : ratingValue >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }></i>
      </span>
      <span className='px-2'>
        {" "}
        {ratingValue} {text ? text : ""}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "#e8861f",
};

Ratings.prototype = {
  ratingValue: PropTypes.number.isRequired,
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Ratings;
