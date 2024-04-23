import React from "react";
import "./Project.css"; // Import CSS for styling

function Project() {
  return (
    <div className="project-container">
      <div className="project-box">
        <h2>Warehouse Visualization</h2>
        <a
          href="http://127.0.0.1:5500/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Go Visualization</button>
        </a>
      </div>
    </div>
  );
}

export default Project;
