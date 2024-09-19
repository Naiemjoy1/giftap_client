import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h1
          style={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#333',
            fontSize: '36px',
            textAlign: 'center',
            marginBottom: '20px',
            letterSpacing: '2px'
          }}
          className="italic"
        >
          We Are Here To Help!
        </h1>
        <h1 className="flex justify-center font-bold font-mono text-4xl italic">Contact Us</h1>

        <div>
          <h2 className="text-3xl font-extralight mt-4 mb-4">Get in Touch</h2>
          <p>Contact us to find out more or how we can help you better.</p>
          {submitted ? (
            <div>
              <h2>Thank you for your message!</h2>
              <p>We will get back to you at {formData.email} soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                />
              </div>
              <button type="submit" style={styles.button}>Send Message</button>
            </form>
          )}
        </div>
      </div>

      <div style={styles.infoSection}>
      <img
        src="https://img.freepik.com/free-photo/information-data-goals-development_53876-124495.jpg?t=st=1726739429~exp=1726743029~hmac=9fedc85606cfd18781cc466631ae7c13cfed15da6887f8bf642814e62cddffa6&w=826"
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
  },
  formSection: {
    flex: '1',
    marginRight: '40px',
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
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid #ccc',
    outline: 'none',
    minHeight: '100px',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    marginTop: '20px',
  }
};

export default Contact;
