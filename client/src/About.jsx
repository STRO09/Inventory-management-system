import React from 'react';
import "./About.css"

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="about-box">
        <p className="about-text">
          Welcome to WarehouseMaster, your comprehensive solution for efficient warehouse management. Our system is designed to streamline inventory operations, optimize storage space, and enhance overall productivity for warehouses of all sizes.
        </p>
      </div>
      <h2 className="about-heading-secondary">Our Mission</h2>
      <div className="about-box">
        <p className="about-text">
          At WarehouseMaster, our mission is to empower businesses with cutting-edge technology to manage their inventory effectively, reduce operational costs, and improve customer satisfaction.
        </p>
      </div>
      <h2 className="about-heading-secondary">Key Features</h2>
      <div className="about-box">
        <ul className="about-list">
          <li className="about-list-item">Inventory Tracking: Real-time tracking of inventory levels and locations.</li>
          <li className="about-list-item">Order Management: Efficient processing of orders and shipments.</li>
          <li className="about-list-item">Reporting and Analytics: Insights to make informed decisions and optimize operations.</li>
          <li className="about-list-item">Barcode Scanning: Easy scanning of barcodes for quick identification and management.</li>
          <li className="about-list-item">User Management: Customizable user roles and permissions for secure access.</li>
        </ul>
      </div>
      <h2 className="about-heading-secondary">Our Team</h2>
      <div className="about-box">
        <ul className="about-list">
          <li className="about-list-item">
            <strong>John Doe - CEO & Founder:</strong> With over 15 years of experience in logistics and technology, John is passionate about revolutionizing warehouse management.
          </li>
          <li className="about-list-item">
            <strong>Jane Smith - Chief Technology Officer:</strong> Jane leads our development team with expertise in software architecture and system design.
          </li>
          <li className="about-list-item">
            <strong>Michael Johnson - Lead Developer:</strong> Michael is responsible for implementing innovative features and ensuring the reliability of our system.
          </li>
          <li className="about-list-item">
            <strong>Emily Brown - UX/UI Designer:</strong> Emily crafts intuitive user experiences to make warehouse management effortless for our clients.
          </li>
        </ul>
      </div>
      <div className="about-box">
        <p className="about-text">
          We are committed to delivering exceptional software and unparalleled support to help you succeed in your warehouse operations.
        </p>
      </div>
      <h2 className="about-heading-secondary">Contact Us</h2>
      <div className="about-box">
        <p className="about-contact">
          Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:contact@warehousemaster.com">contact@warehousemaster.com</a>.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
