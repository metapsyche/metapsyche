import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <header className="header">
        <div className="logo-brand">
          <div className="brand-icon">M</div>
          <span>Metapsyche Consulting</span>
        </div>
        <nav className="nav-links">
          <a href="#services" className="nav-link">Practices</a>
          <a href="#approach" className="nav-link">Approach</a>
          <a href="#contact" className="cta-button">Initiate Engagement</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="badge">
          <span>● Private Advisory &amp; Strategic Consulting</span>
        </div>
        <h1 className="hero-title">
          Clarity, Architecture &amp; <br />
          <span className="hero-gradient-text">High-Stakes Execution</span>
        </h1>
        <p className="hero-subtitle">
          We partner with founders, executives, and forward-looking teams to solve complex technical, 
          organizational, and strategic challenges with discretion and deep domain craftsmanship.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="cta-button">Schedule a Confidential Consultation</a>
          <a href="#services" className="btn-secondary">Explore Practice Areas</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="section-header">
          <div className="section-label">Core Capabilities</div>
          <h2 className="section-title">High-Impact Practice Areas</h2>
        </div>

        <div className="grid-3">
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Technology &amp; System Architecture</h3>
            <p className="card-desc">
              Designing resilient, scalable cloud architectures and modernized software infrastructure. 
              Translating business vision into sound technical strategy.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">Strategic Growth &amp; Advisory</h3>
            <p className="card-desc">
              Fractional advisory for executive leadership. Navigating pivotal platform decisions, 
              evaluating emerging tech adoption, and optimizing technical operations.
            </p>
          </div>

          <div className="card">
            <div className="card-icon">🛡️</div>
            <h3 className="card-title">Risk, Diligence &amp; Security</h3>
            <p className="card-desc">
              Technical due diligence for acquisitions and strategic investments. Hardening critical infrastructure 
              and identifying systemic operational bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="section">
        <div className="approach-container">
          <div>
            <div className="section-label">Why Partner With Us</div>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>
              Direct access to senior expertise. No fluff.
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Unlike traditional consultancies that delegate client deliverables to junior teams, 
              every engagement with Metapsyche is led directly by principal consultants with proven execution track records.
            </p>
          </div>

          <div className="approach-list">
            <div className="approach-item">
              <span className="bullet-num">01</span>
              <div>
                <h4 className="approach-item-title">Principals First</h4>
                <p className="approach-item-text">
                  Direct partnership with seasoned experts who take end-to-end accountability.
                </p>
              </div>
            </div>

            <div className="approach-item">
              <span className="bullet-num">02</span>
              <div>
                <h4 className="approach-item-title">Pragmatic &amp; Objective</h4>
                <p className="approach-item-text">
                  Actionable guidance tailored to your exact organizational context and stage.
                </p>
              </div>
            </div>

            <div className="approach-item">
              <span className="bullet-num">03</span>
              <div>
                <h4 className="approach-item-title">Discretion &amp; Speed</h4>
                <p className="approach-item-text">
                  Strict confidentiality, fast onboarding, and high-velocity execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="contact-card">
          <h2>Start the Conversation</h2>
          <p>
            Tell us about your organization and current priorities. 
            We review every inquiry within 24 hours.
          </p>

          {submitted ? (
            <div className="form-success-message">
              <h3>Thank you for reaching out</h3>
              <p style={{ margin: "0.5rem 0 0 0", color: "#bbf7d0" }}>
                We have received your message and will be in touch shortly to schedule a preliminary discussion.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Work Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@organization.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="company">Company / Organization</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  className="form-input"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Engagement Overview</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Briefly describe your objectives, timeline, or key challenges..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Confidential Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Metapsyche Consulting. All rights reserved. Confidential &amp; Proprietary.</p>
      </footer>
    </div>
  );
}
