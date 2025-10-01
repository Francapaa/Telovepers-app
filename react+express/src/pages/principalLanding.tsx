import type React from "react"
import '../style/principalLanding.css'; 
import { Link } from "react-router-dom";

export function CreateLandingPage() {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1 className="logo-text">Telovepers</h1>
          </div>
          <nav className="nav">
            <Link to ={'/login'}className="nav-button login-btn">Login</Link>
            <Link to ={'/register'} className="nav-button register-btn">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">
              Connect with developers
              <span className="highlight"> like never before</span>
            </h2>
            <p className="hero-description">
              Find your perfect co-founder, build incredible teams, and create the next big SaaS. Telovepers is where
              developers connect to build successful startups.
            </p>
            <div className="hero-buttons">
              <Link to ={'/login'} className="cta-button primary">Get Started</Link>
              <button className="cta-button secondary">Watch Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="connection-animation">
              <div className="dev-card card-1">
                <div className="dev-avatar"></div>
                <div className="dev-info">
                  <div className="dev-name"></div>
                  <div className="dev-skills"></div>
                </div>
              </div>
              <div className="connection-line"></div>
              <div className="dev-card card-2">
                <div className="dev-avatar"></div>
                <div className="dev-info">
                  <div className="dev-name"></div>
                  <div className="dev-skills"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <h3 className="features-title">Why choose Telovepers?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon match-icon">
                <img src="../assets/conexion.png" alt="Imagen de matching" />
              </div>
              <h4 className="feature-title">Smart Matching</h4>
              <p className="feature-description">
                Advanced algorithm that connects developers with complementary skills
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon team-icon">
                <img src="../assets/grupo.png" alt="Imagen de equipo" />
              </div>
              <h4 className="feature-title">Build Teams</h4>
              <p className="feature-description">Create balanced teams with frontend, backend, design and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon project-icon">
                <img src="../assets/concepto.png" alt="Imagen de idea " />
              </div>
              <h4 className="feature-title">Manage Projects</h4>
              <p className="feature-description">Integrated tools to take your startup from concept to launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h3 className="cta-title">Ready to find your co-founder?</h3>
          <p className="cta-description">Join thousands of developers who are already building the future</p>
          <Link to ={'/register'} className="cta-button primary large">Start Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h4 className="footer-logo-text">Telovepers</h4>
              <p className="footer-tagline">Where developers connect to build the future</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h5 className="footer-column-title">Product</h5>
                <a href="#" className="footer-link">
                  Features
                </a>
                <a href="#" className="footer-link">
                  Pricing
                </a>
                <a href="#" className="footer-link">
                  How it works
                </a>
              </div>
              <div className="footer-column">
                <h5 className="footer-column-title">Company</h5>
                <a href="#" className="footer-link">
                  About
                </a>
                <a href="#" className="footer-link">
                  Blog
                </a>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </div>
              <div className="footer-column">
                <h5 className="footer-column-title">Support</h5>
                <a href="#" className="footer-link">
                  Help Center
                </a>
                <a href="#" className="footer-link">
                  Contact
                </a>
                <a href="#" className="footer-link">
                  Privacy
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">© 2025 Telovepers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


