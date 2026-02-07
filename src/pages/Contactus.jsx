import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    console.log("Form Submitted:", formData);
    alert("Message sent successfully!");

    // reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <section className="contact-container">
        <h2>Contact Us</h2>
        <p>Have questions or feedback? We'd love to hear from you.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Contactus;
