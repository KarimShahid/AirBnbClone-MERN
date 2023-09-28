import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../assets/Perks";
import PhotosUploader from "./PhotosUploader";
import AccountNav from "./AccountNav";

const PlacesFormPage = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch("http://localhost:4000/api/places/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photo);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4 pl-2">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="pl-3 text-sm text-gray-500">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update the existing place if id exists
      const response = await fetch(`http://localhost:4000/api/places/`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...placeData }),
      });
      await response.json();
      setRedirect(true);
    } else {
      // adding new place to database
      const response = await fetch(`http://localhost:4000/api/places`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(placeData),
      });
      const json = await response.json();
      console.log(json);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {/* Title */}
          {preInput("Title", "Title should be catchy like in an advertisement")}
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Address */}
          {preInput("Address")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Photo */}
          {preInput("Photo", "More = Better")}

          {/* Linkbox for photoupload */}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {/* Description */}
          {preInput("Description", "Description of the place")}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Perks */}
          {preInput("Perks", "Select all the perks of your place")}
          <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {<Perks selected={perks} onChange={setPerks} />}
          </div>

          {/* Extra Info */}
          {preInput("Extra", "House Rules, etc")}

          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {/* CheckIn&Out, MaxGuests */}
          {preInput(
            "Check in & Out Times, max guests",
            "Add check in and out times. Remember to have some time window for cleaning the rooms between guests."
          )}

          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div className="">
              <h3 className="pl-2 mt-2 -mb-2">Check in Time</h3>
              <input
                type="number"
                placeholder="14:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="pl-2 mt-2 -mb-2">Check Out Time</h3>
              <input
                type="number"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="pl-2 mt-2 -mb-2">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="pl-2 mt-2 -mb-2">Price per Night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
