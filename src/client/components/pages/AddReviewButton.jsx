import React from "react";

export default function AddReviewButton(props) {
  return (
    <button
      className="button"
      onClick={() => {
        props.reviewButtonAction();
      }}
    >
      Add Review
    </button>
  );
}
