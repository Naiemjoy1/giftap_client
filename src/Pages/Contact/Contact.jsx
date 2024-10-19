import { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa"; // Icons for name and email

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to track hover effect

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

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

        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Thank you for your message!</h2>
            <p className="mt-2">
              We will get back to you at <strong>{formData.email}</strong> soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Say something..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-semibold bg-primary rounded-md transition-colors duration-300 ${isHovered ? "bg-red-500" : ""
                }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Submit
            </button>

            <hr className="border-t-2 border-red-400 border-dashed w-1/4 mx-auto my-4" />
          </form>
        )}
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
// check github
