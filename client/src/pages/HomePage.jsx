import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/places", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
      });
  }, []);
  return (
    <>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link key={place._id} to={"/place/" + place._id}>
              <div className="bg-red-800 rounded-2xl flex mb-2">
                {place.photo?.[0] && (
                  <img
                    src={"http://localhost:4000/uploads/" + place.photo?.[0]}
                    alt=""
                    className="rounded-2xl aspect-square object-cover"
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;
