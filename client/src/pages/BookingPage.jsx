import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../assets/AddressLink";
import BookingDates from "../assets/BookingDates";
import PlaceGallery from "../assets/PlaceGallery";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/bookings", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const foundBooking = data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <>
      <div className="my-8">
        <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink className="my-2 block">
          {booking.place.address}
        </AddressLink>
        <div className="bg-gray-200 p-4 mb-4 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl">Your Booking Information:</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="bg-primary rounded-2xl p-6">
            <div>Total Price</div>
            <div className="text-3xl">${booking.price}</div>
          </div>
        </div>
        <PlaceGallery place={booking.place} />
      </div>
    </>
  );
};

export default BookingPage;
