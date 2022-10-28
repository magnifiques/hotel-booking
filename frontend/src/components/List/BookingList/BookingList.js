import React from "react";
import "./BookingList.css";
import BookingItem from "./BookingItem/BookingItem";

const BookingList = ({ items }) => {
  return (
    <ul className="users-list">
      {console.log(items)}
      {items.map((item) => (
        <BookingItem
          key={item.id}
          email={item.email}
          name={item.name}
          phone={item.phone}
          rooms={item.rooms}
          checkIn={item.checkIn}
          checkOut={item.checkOut}
        />
      ))}
    </ul>
  );
};

export default BookingList;
