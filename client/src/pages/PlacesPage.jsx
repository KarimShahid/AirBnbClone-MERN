import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlaceImg from "../assets/PlaceImg";
import AccountNav from "./AccountNav";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  // to display all the places added by the user
  const getPlacesData = () => {
    fetch("http://localhost:4000/api/user-places", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setPlaces(data);
      });
  };
  useEffect(() => {
    getPlacesData();
  }, []);

  return (
    <>
      <div>
        <AccountNav />
        <div className="text-center">
          List of all added places
          <br />
          <Link
            className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Places
          </Link>
        </div>
        <div className="mt-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="max-w-7xl mx-auto flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl my-4"
              >
                <div className="flex w-64 h-64 bg-gray-300 shrink-0">
                  <PlaceImg place={place} />
                </div>

                <div className="min-w-4xl">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
