import React from "react";
import {
  Trees,
  Cloud,
  Store,
  Truck,
  BarChart,
  Users,
  ChevronRight,
  Sprout,
  Facebook,
  Twitter,
  Instagram,
  Menu,
} from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <Trees className="h-8 w-8 text-success" />,
      title: "Smart Crop Management",
      description:
        "AI-powered tracking and optimization of your entire crop lifecycle",
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Weather Analytics",
      description: "Precise forecasting and climate pattern analysis",
    },
    {
      icon: <Store className="h-8 w-8 text-purple-500" />,
      title: "Digital Marketplace",
      description: "Connect directly with buyers and optimize your pricing",
    },
    {
      icon: <Truck className="h-8 w-8 text-warning" />,
      title: "Supply Chain",
      description: "End-to-end logistics and transport optimization",
    },
    {
      icon: <BarChart className="h-8 w-8 text-danger" />,
      title: "Advanced Analytics",
      description: "Data-driven insights for better decision making",
    },
    {
      icon: <Users className="h-8 w-8 text-info" />,
      title: "Cooperative Hub",
      description: "Streamlined cooperative management and collaboration",
    },
  ];

  const testimonials = [
    {
      quote:
        "Agri-Tech has transformed our entire farming operation. The AI-driven insights have helped us increase yield by 40%.",
      author: "John Doe",
      role: "Commercial Farmer",
      image: "/api/placeholder/100/100",
    },
    {
      quote:
        "The weather predictions and crop management tools are incredibly accurate. It's like having an expert farmer in your pocket.",
      author: "Sarah Smith",
      role: "Cooperative Leader",
      image: "/api/placeholder/100/100",
    },
  ];

  return (
    <div className="min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Sprout className="h-8 w-8 text-success me-2" />
            <span className="fw-bold">Agri-Tech</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <button className="btn btn-success">
                  Get Started
                  <ChevronRight className="ms-2" size={16} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="py-5 position-relative bg-light"
        style={{ marginTop: "76px" }}
      >
        <div className="container py-5">
          <div className="text-center">
            <h1 className="display-4 fw-bold mb-4">
              Transform Your Farm with
              <span className="text-success"> Smart Technology</span>
            </h1>
            <p
              className="lead text-muted mb-5 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Revolutionize your agricultural practices with AI-powered
              insights, precision farming tools, and seamless market access.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button className="btn btn-success btn-lg">
                Download Mobile App
                <ChevronRight className="ms-2" size={16} />
              </button>
              <button className="btn btn-outline-success btn-lg">
                Explore Marketplace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5 bg-white">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">
            Comprehensive Agricultural Solutions
          </h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="d-flex justify-content-center mb-4">
                      <div className="p-3 bg-light rounded-circle">
                        {feature.icon}
                      </div>
                    </div>
                    <h5 className="card-title mb-3">{feature.title}</h5>
                    <p className="card-text text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5 bg-light">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">
            Trusted by Farmers Worldwide
          </h2>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <p className="card-text fs-5 fst-italic mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="d-flex align-items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="rounded-circle me-3"
                        width="48"
                        height="48"
                      />
                      <div>
                        <h6 className="mb-0">{testimonial.author}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-white">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Get in Touch</h3>
                  <p className="text-muted mb-4">
                    Have questions about our platform? We're here to help you
                    transform your agricultural business.
                  </p>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body p-4">
                  <h3 className="card-title mb-4">Connect With Us</h3>
                  <div className="d-grid gap-3">
                    <button className="btn btn-outline-primary d-flex align-items-center">
                      <Facebook className="me-2" />
                      Follow us on Facebook
                    </button>
                    <button className="btn btn-outline-info d-flex align-items-center">
                      <Twitter className="me-2" />
                      Follow us on Twitter
                    </button>
                    <button className="btn btn-outline-danger d-flex align-items-center">
                      <Instagram className="me-2" />
                      Follow us on Instagram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="d-flex align-items-center mb-3">
                <Sprout className="text-success me-2" size={24} />
                <span className="fw-bold fs-5">Agri-Tech</span>
              </div>
              <p className="text-muted">
                Empowering farmers with cutting-edge technology solutions.
              </p>
            </div>
            <div className="col-md-3">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="#features"
                    className="text-muted text-decoration-none"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-muted text-decoration-none"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-muted text-decoration-none"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted text-decoration-none"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="mb-3">Services</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Crop Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Weather Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Marketplace
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted text-decoration-none">
                    Supply Chain
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="mb-3">Contact</h5>
              <ul className="list-unstyled text-muted">
                <li>support@agritech.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Farm Street, Agri City</li>
              </ul>
            </div>
          </div>
          <hr className="my-4 bg-secondary" />
          <p className="text-center text-muted mb-0">
            &copy; {new Date().getFullYear()} Agri-Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
