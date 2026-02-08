import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>Learn Smarter with <span>CodiAI</span></h1>
          <p>
            Ask questions, get instant answers, write better, and solve problems
            — all in one intelligent AI assistant.
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/learning")}
            >
              Start Chatting
            </button>

            <button className="secondary-btn">Explore Features</button>
          </div>
        </div>

        <div className="hero-preview">
          <div className="chat-box">
            <p><strong>You:</strong> Help me with my assignment</p>
            <p><strong>AI:</strong> Sure! Tell me the topic and requirements.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>What Can CodiAI Do?</h2>
        <div className="cards">
          <div className="card">💬 Smart Conversations</div>
          <div className="card">✍️ Writing Assistance</div>
          <div className="card">🧠 Problem Solving</div>
          <div className="card">🌍 Deep Thinking</div>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps">
        <h2>How It Works</h2>
        <div className="step-container">
          <div className="step-card">
            <span>1️⃣</span> Type your question
          </div>
          <div className="step-card">
            <span>2️⃣</span> AI processes it
          </div>
          <div className="step-card">
            <span>3️⃣</span> Get instant smart answers
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to try your AI assistant?</h2>
        <button className="primary-btn large">Try It Free</button>
      </section>

      <Footer />
    </>
  );
};

export default Home;
