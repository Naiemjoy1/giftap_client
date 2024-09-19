import { useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa'; // Icons for name and email

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',  // Empty by default
    email: '',  // Empty by default
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          color: '#333',
          fontSize: '36px',
          textAlign: 'center',  // Centering heading
          marginBottom: '20px',
          letterSpacing: '2px'
        }}
        className="italic"
      >
        We Here To Help!
      </h1>
      <h1 className="flex justify-center font-bold font-mono text-4xl italic">Contact Us</h1>

      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2' style={styles.container}>
        <div style={styles.formSection}>
          <h2 className="text-3xl font-extralight mt-4 mb-4">Get in Touch</h2>
          <p>Contact us to find out more or how we can help you better.</p>
          {submitted ? (
            <div>
              <h2>Thank you for your message!</h2>
              <p>We will get back to you at {formData.email} soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={styles.formGroupInline}>
                <label htmlFor="name" style={styles.iconLabel}>
                  <FaUser style={styles.icon} />
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  style={styles.inputInline}
                />
              </div>
              <div style={styles.formGroupInline}>
                <label htmlFor="email" style={styles.iconLabel}>
                  <FaEnvelope style={styles.icon} />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  style={styles.inputInline}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message:</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Say something..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                />
              </div>
              <button type="submit" style={styles.button}>Submit</button>
            </form>
          )}
        </div>

        <div style={styles.infoSection}>
          <img
            src="https://img.freepik.com/free-photo/information-data-goals-development_53876-124495.jpg"
            alt="Gift Image"
            className="hover:scale-105 transition-transform duration-500 ease-in-out"
            style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
          />
          <h2>Our Company Information</h2>
          <p><strong>Address:</strong> 1234 Business St, Suite 100, YourCity, Country</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Email:</strong> info@company.com</p>
          <p><strong>Opening Hours:</strong> 9:00 AM - 6:00 PM (Mon - Fri)</p>
          <p><strong>Closing Hours:</strong> Closed on weekends</p>
        </div>
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    flexDirection: 'row',
    flexWrap: 'wrap', // For responsive design
  },
  formSection: {
    flex: '1',
    marginRight: '40px',
    marginBottom: '20px',  // Space between columns on smaller devices
  },
  infoSection: {
    flex: '1',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formGroupInline: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  iconLabel: {
    marginRight: '10px',
  },
  inputInline: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderBottom: '2px solid #ccc', // Only bottom border
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    border: '2px solid #ccc',  // Full border for textarea
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow
    backgroundColor: '#f7f7f7', // Added background color
    outline: 'none',
    minHeight: '150px',
    transition: 'border-color 0.3s',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: 'transparent',  // No color styling
    border: 'none',  // Removed border
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: '20px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  icon: {
    marginRight: '8px',
  }
};

export default Contact;
