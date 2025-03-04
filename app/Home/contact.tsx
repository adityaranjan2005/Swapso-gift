"use client";
import React, { useState, useRef } from "react";
import { FaEnvelope, FaMapMarker } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

import "./contact.css";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Send Message");

  const formRef: any = useRef();

  const sendEmail = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields");
      return;
    }

    if (name.length < 2) {
      setStatus("Name must have at least two letters!");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setStatus("Invalid email");
      return;
    }

    if (message.length < 2) {
      setStatus("Message must have at least two letters!");
      return;
    }

    const service_id = "service_2aoebun";
    const template_id = "template_qocuahb";
    const user_id = "OJ0t2oiCrc4ncv1_Y";
    try {
      // await emailjs.sendForm(service_id, template_id, formRef.current, user_id);

      setStatus("Email sent successfully");
      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => {
        setStatus("Send Message");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Error sending email. Try again!");
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info-card">
        <div className="contact-form-text">
          <h2>
            <strong>Contact Information</strong>
          </h2>
        </div>
        {/* <div className='contact-form-text-1'>
        <strong>Contact us for any inquiries or questions. We're here to help!</strong>
      </div> */}
        <div className="contact-info-list">
          <div className="contact-info-item">
            <IoMdCall />
            <p>+91 8000657709</p>
          </div>
          <div className="contact-info-item">
            <FaEnvelope />
            <p>contact@swapso.io</p>
          </div>
          <div className="contact-info-item">
            <FaMapMarker />
            <p>IIT Bombay, Powai, Mumbai.</p>
          </div>
        </div>
        <div className="circle-container">
          <div className="circle black"></div>
          <div className="circle white"></div>
          <div className="circle black"></div>
        </div>
      </div>
      <div className="contact-form">
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="message">
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="message"></label>
                <textarea
                  id="message"
                  placeholder="Write your message..."
                  value={message}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="send-button"
              style={{
                color: "aqua",
                backgroundColor: "black",
                border: "2px solid black",
                marginBottom: "10px",
              }}
            >
              {status ? <p>{status}</p> : "No Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
