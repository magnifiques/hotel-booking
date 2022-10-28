import React, { useEffect, useState } from "react";
import BookingList from "./BookingList/BookingList";
import "./AllUsers.css";

const AllUsers = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setBooking([]);
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/users/", {
          method: "GET",
        });
        const responseData = await response.json();
        setBooking(responseData.contents);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {console.log(error)}
      {isLoading && <div className="center">Loading</div>}
      {!isLoading && booking.length === 0 ? (
        <h1 className="center">No Booking found!</h1>
      ) : (
        <BookingList items={booking} />
      )}
    </>
  );
};

export default AllUsers;
