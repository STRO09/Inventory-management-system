import React, { useState } from "react";
import "./Contact.css";

export default function BasicForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    alert("Successfully Submitted!!");

    fetch(" ", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Response received:", response);
        if (response.code === 200) {
          alert("We received your submission, thank you!");
          setName("");
          setEmail("");
          setMessage("");
        } else if (response.code === 422) {
          setError(response.message);
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message ? error.message : error);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-data">
        <div className="formcarry-block">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Your first and last name"
          />
        </div>
        <div className="formcarry-block">
          <label htmlFor="email">Your Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="john@doe.com"
          />
        </div>
        <div className="formcarry-block">
          <label htmlFor="message">Your message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            placeholder="Enter your message..."
          ></textarea>
        </div>
        <div className="formcarry-block">
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
}
