import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

const Aboutus = () => {
  return (
    <>
      <Navbar />

      <section className="about-container">
        <h2>About Us</h2>

        <p className="about-intro">
          Welcome! We are passionate about building simple, useful, and modern
          web applications that make life easier.
        </p>

        <div className="about-content">
          <div className="about-card">
            <h3>🌟 Our Mission</h3>
            <p>
              Our goal is to create user-friendly digital solutions that are
              fast, reliable, and enjoyable to use.
            </p>
          </div>

          <div className="about-card">
            <h3>💡 What We Do</h3>
            <p>
              We design and develop websites and applications using modern
              technologies like React and JavaScript.
            </p>
          </div>

          <div className="about-card">
            <h3>🚀 Our Vision</h3>
            <p>
              To keep learning, improving, and building projects that solve
              real-world problems.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Aboutus;
