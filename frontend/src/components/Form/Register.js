import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    rooms: "",
    checkIn: "",
    checkOut: "",
  });

  const isDisabled =
    formData.email === "" ||
    formData.name === "" ||
    formData.phone === "" ||
    formData.phone.length !== 10 ||
    formData.rooms === "" ||
    formData.rooms < 1 ||
    formData.rooms > 10 ||
    formData.checkIn === "" ||
    formData.checkOut === "";

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      rooms: formData.rooms,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
    };
    try {
      const response = await fetch("http://localhost:4000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(responseData.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Form className="form" method="POST" onSubmit={submitHandler}>
      {error && <Form.Label className="form-error">{error}</Form.Label>}

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your Phone Number</Form.Label>
        <Form.Control
          type="number"
          minLength={10}
          maxLength={10}
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your Rooms</Form.Label>
        <Form.Control
          type="number"
          minLength={1}
          maxLength={10}
          placeholder="Select between 1 to 10"
          value={formData.rooms}
          onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Check in Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.checkIn}
          onChange={(e) =>
            setFormData({ ...formData, checkIn: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Check Out Date</Form.Label>
        <Form.Control
          type="date"
          value={formData.checkOut}
          onChange={(e) =>
            setFormData({ ...formData, checkOut: e.target.value })
          }
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isDisabled}>
        Submit
      </Button>
    </Form>
  );
};

export default Register;
