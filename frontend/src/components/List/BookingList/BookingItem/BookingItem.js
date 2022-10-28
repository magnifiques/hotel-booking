import React from "react";
import "./BookingItem.css";

const BookingItem = ({ email, name, phone, rooms, checkIn, checkOut }) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  console.log(checkInDate.getDate());
  return (
    <li className="user-item">
      <div>
        <p className="main-details">Email: {email}</p>
        <p className="main-details">name: {name}</p>
        <p className="main-details">phone: {phone}</p>
        <p className="main-details">rooms: {rooms}</p>
        <div className="sub-details">
          <p>
            check In:{" "}
            {`${checkInDate.getDate()}/${checkInDate.getMonth()}/${checkInDate.getFullYear()}`}
          </p>
          <p>
            check Out:{" "}
            {`${checkOutDate.getDate()}/${checkOutDate.getMonth()}/${checkOutDate.getFullYear()}`}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BookingItem;
