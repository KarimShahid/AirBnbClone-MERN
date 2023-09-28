import React, { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Components/UserContext";

const BookingWidgets = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await fetch("http://localhost:4000/api/bookings", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      }),
    });
    const json = await response.json();
    console.log(json);
    const bookingId = json._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl px-4 py-3 my-1">
          <div className="md:flex">
            <div className="py-4 px-2">
              <label>Check In: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="py-4 px-2 md:border-l">
              <label>Check Out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setcheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="py-4 px-2 md:border-t">
            <label>Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="py-4 px-2 md:border-t">
              {/* FUllNAME */}
              <label>Your Full Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* PHONE NUMBER */}
              <label>Your phone Number: </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>

        <button onClick={bookThisPlace} className="primary mt-4">
          Book this Place: $
          {numberOfNights > 0 && <span>{numberOfNights * place.price}</span>}
        </button>
      </div>
    </>
  );
};

export default BookingWidgets;
