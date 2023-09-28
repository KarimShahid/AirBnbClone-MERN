import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddressLink from "../assets/AddressLink";
import BookingWidgets from "../assets/BookingWidgets";
import PlaceGallery from "../assets/PlaceGallery";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`http://localhost:4000/api/places/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlace(data);
      });
  }, [id]); //run func, everytime the id changes

  if (!place) {
    return "";
  }

  if (showAllPhotos) {
    return (
      <div className="bg-black absolute inset-0">
        <div className="bg-black p-8 grid gap-4 text-white">
          <div className="flex items-center">
            <h2 className="text-3xl mr-36 ">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 text-black bg-white flex gap-1 py-2 px-4 rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close
            </button>
          </div>
          {place?.photo.length > 0 &&
            place.photo.map((pic) => (
              <div className="">
                <img
                  src={"http://localhost:4000/uploads/" + pic}
                  alt=""
                  className="w-full"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mt-4 bg-gray-100 -mx-8 px-8 py-t">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>
        {/* displaying the images */}
        <PlaceGallery place={place} />
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            {/* Description */}
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            {/* CheckIn, out and MaxGuests */}
            Check-in: {place.checkIn} hours.
            <br />
            Check-out: {place.checkOut} hours.
            <br />
            Max number of guests: {place.maxGuests}
          </div>
          <div>
            <BookingWidgets place={place} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
