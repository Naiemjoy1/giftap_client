import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_3h95eyv', 'template_u91rm9i', form.current, {
        publicKey: '3kMI3jYOG-YMZYYbp',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Email Send Successfully!")
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error("Error!")
        },
      );
  };



  // Title
  document.title = "GifTap || Contact";

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-wrap justify-between">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
        <h1 className="text-4xl font-semibold text-center mb-4 ">
          We Are Here To Help!
        </h1>
        <h2 className="text-3xl font-light text-center mb-8">Get in Touch</h2>
        <p className="text-center mb-6">
          Contact us to find out more or how we can help you better.
        </p>

        <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto space-y-6">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-400" />
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaEnvelopeOpenText className="text-gray-400" />
            <input
              type="text"
              name="user_subject"
              placeholder="Subject"
              required
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Say something..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
            />
          </div>

          <button
            type="submit"
            value="Send"
            className={`w-full px-4 py-2 text-white font-semibold bg-primary rounded-md transition-colors duration-300 `}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Info Section */}
      <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="w-full ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.301105939981!2d90.40035027362796!3d23.84343928520141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c691ba478fbd%3A0xd1b3f71371eb15ec!2sHazrat%20Shahjalal%20International%20Airport!5e0!3m2!1sen!2sbd!4v1728324696742!5m2!1sen!2sbd"
            width="540"
            height="270"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Our Company Information</h2>
        <p className="mb-2">
          <strong>Address:</strong> 1234 Business St, Suite 100, YourCity, Country
        </p>
        <p className="mb-2">
          <strong>Phone:</strong> +123 456 7890
        </p>
        <p className="mb-2">
          <strong>Email:</strong> info@company.com
        </p>
        <p className="mb-2">
          <strong>Opening Hours:</strong> 9:00 AM - 6:00 PM (Mon - Fri)
        </p>
        <p>
          <strong>Closing Hours:</strong> Closed on weekends
        </p>
      </div>
    </div>
  );
};

export default Contact;

