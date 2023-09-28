import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photo?.length) {
    return "";
  }

  if (!className) {
    className = "w-[100%]";
  }

  return (
    <>
      <img
        src={"http://localhost:4000/uploads/" + place.photo[index]}
        alt=""
        className={className}
      />
    </>
  );
};

export default PlaceImg;
