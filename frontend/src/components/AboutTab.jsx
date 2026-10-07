import React from 'react';

export default function AboutTab() {
  return (
    <div className="tab-page">
      <div className="tab-header-box">
        <h2 className="box-title">About the Project</h2>
        <p className="box-subtitle">
          Intelligent Satellite Communication Quality Prediction System (SatLink AI).
        </p>
      </div>

      <div className="about-grid">
        {/* Project Overview */}
        <div className="about-card">
          <h3>1. Project Aim &amp; Motivation</h3>
          <p>
            Satellite-to-ground communication links are subject to various atmospheric and electromagnetic disruptions, such as rain fade, cloud absorption, antenna pointing errors, and terrestrial RF interference.
          </p>
          <p>
            The objective of this project is to build an end-to-end Machine Learning prototype capable of predicting link degradation in advance. By ingesting real-time telemetry, ground operators can take proactive steps—such as increasing transmit power or switching modulation schemes—to prevent link drops.
          </p>
        </div>

        {/* Machine Learning Pipeline */}
        <div className="about-card">
          <h3>2. Machine Learning Pipeline</h3>
          <p>
            The model uses a <strong>Random Forest Classifier</strong> trained on 17 engineered features. The pipeline transforms continuous RF metrics and one-hot encodes categorical environmental variables:
          </p>
          <ul className="about-list">
            <li><strong>RF Parameters:</strong> Carrier Frequency, Received Signal Strength (dBm), Channel Bandwidth.</li>
            <li><strong>Atmospheric Data:</strong> Temperature, Humidity, Wind Speed, Precipitation rate, Barometric Air Pressure.</li>
            <li><strong>Categorical Features:</strong> Weather Condition (Sunny, Cloudy, Rainy) and Interference Type (None, Adjacent-channel, Co-channel, Intermodulation).</li>
            <li><strong>Local Noise:</strong> Ambient Wi-Fi/terrestrial noise floor and Ground Station Altitude.</li>
          </ul>
        </div>

        {/* System Architecture */}
        <div className="about-card">
          <h3>3. System Architecture</h3>
          <p>
            The prototype follows a decoupled client-server architecture:
          </p>
          <ul className="about-list">
            <li><strong>Backend API:</strong> Built with <strong>FastAPI</strong> in Python, exposing a high-speed <code>/predict</code> POST endpoint that validates incoming telemetry with Pydantic and generates model predictions in real time.</li>
            <li><strong>Frontend Application:</strong> Built using <strong>React</strong> and <strong>Vite</strong>, providing a tabbed dashboard with live parameter input, probability visualization, and session test history.</li>
          </ul>
        </div>

        {/* Project Team & Evaluation Details */}
        <div className="about-card">
          <h3>4. Project Details</h3>
          <div className="project-meta-table">
            <div className="meta-row">
              <span className="meta-key">Project Title:</span>
              <span className="meta-val">SatLink AI: Satellite Communication Quality Prediction</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Algorithm:</span>
              <span className="meta-val">RandomForestClassifier (scikit-learn 1.6.1)</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Backend:</span>
              <span className="meta-val">Python 3.11 / FastAPI (Port 8000)</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Frontend:</span>
              <span className="meta-val">React + Vite (Port 5173)</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Academic Context:</span>
              <span className="meta-val">Major Project / Capstone Presentation (2025&ndash;2026)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
