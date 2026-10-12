import React from 'react';

export default function HomeTab({ onNavigate, onLoadPreset, result }) {
  const currentPrediction = result?.prediction || 'Good';
  const isGood = currentPrediction === 'Good';
  const isWeak = currentPrediction === 'Weak';
  const statusColor = isGood ? '#10b981' : isWeak ? '#f59e0b' : '#ef4444';

  return (
    <div className="tab-page home-page-container">
      {/* Hero Section */}
      <section className="home-hero-section">
        <div className="hero-badge-pill">
          <span className="pulsing-green-dot"></span>
          <span>AI-Driven Satellite Telemetry Suite &bull; B.Tech Final Year Project</span>
        </div>

        <h1 className="home-hero-title">
          Intelligent Satellite Communication <br />
          <span className="hero-gradient-text">Quality &amp; Degradation Prediction</span>
        </h1>

        <p className="home-hero-subtitle">
          Real-time Machine Learning platform analyzing RF propagation, atmospheric rain fade,
          and co-channel interference to predict satellite link viability and protect mission-critical downlinks.
        </p>

        <div className="home-hero-actions">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={() => onNavigate('predict')}
          >
            <span>Launch Predictor</span>
          </button>

          <button
            type="button"
            className="btn-hero-secondary"
            onClick={() => {
              onLoadPreset('good');
              onNavigate('predict');
            }}
          >
            <span>Run Instant Simulation</span>
          </button>

          <button
            type="button"
            className="btn-hero-ghost"
            onClick={() => onNavigate('graphs')}
          >
            <span>View Spectral Analytics</span>
          </button>
        </div>
      </section>



      {/* Metrics Counter Bar */}
      <section className="home-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">LEO</div>
          <div className="stat-info">
            <div className="stat-num">LEO 400km</div>
            <div className="stat-desc">Orbital Tracking Altitude</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">ms</div>
          <div className="stat-info">
            <div className="stat-num">&lt; 15 ms</div>
            <div className="stat-desc">FastAPI Model Inference</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">RF</div>
          <div className="stat-info">
            <div className="stat-num">Random Forest</div>
            <div className="stat-desc">Multi-Class Classifier</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">17</div>
          <div className="stat-info">
            <div className="stat-num">17 Features</div>
            <div className="stat-desc">RF &amp; Atmospheric Parameters</div>
          </div>
        </div>
      </section>

      {/* Quick Test Scenarios (1-Click Viva Presets) */}
      <section className="home-section-presets">
        <div className="section-heading-row">
          <div>
            <h2 className="section-title">One-Click Demonstration Scenarios</h2>
            <p className="section-subtitle">
              Instantly test and verify trained machine learning model responses under standard satellite operating environments.
            </p>
          </div>
        </div>

        <div className="presets-cards-grid">
          <div
            className="preset-action-card preset-good-card"
            onClick={() => {
              onLoadPreset('good');
              onNavigate('predict');
            }}
          >
            <div className="preset-card-top">
              <span className="preset-pill pill-good">Nominal Link</span>
            </div>
            <h3 className="preset-card-title">Clear Sky Pass</h3>
            <p className="preset-card-desc">
              Sunny atmosphere, 0 mm precipitation, high SNR (-38 dBm), zero RF interference. Expected classification: <strong>Good</strong>.
            </p>
            <div className="preset-card-footer">
              <span>Load &amp; Predict &rarr;</span>
            </div>
          </div>

          <div
            className="preset-action-card preset-rain-card"
            onClick={() => {
              onLoadPreset('rain');
              onNavigate('predict');
            }}
          >
            <div className="preset-card-top">
              <span className="preset-pill pill-warn">Rain Fade</span>
            </div>
            <h3 className="preset-card-title">Monsoon Storm</h3>
            <p className="preset-card-desc">
              Heavy 42 mm/hr precipitation, 95% humidity, high attenuation (-89 dBm). Demonstrates rapid link degradation: <strong>Weak / Degraded</strong>.
            </p>
            <div className="preset-card-footer">
              <span>Load &amp; Predict &rarr;</span>
            </div>
          </div>

          <div
            className="preset-action-card preset-jam-card"
            onClick={() => {
              onLoadPreset('interference');
              onNavigate('predict');
            }}
          >
            <div className="preset-card-top">
              <span className="preset-pill pill-danger">RF Jamming</span>
            </div>
            <h3 className="preset-card-title">Co-Channel Interference</h3>
            <p className="preset-card-desc">
              Severe overlapping RF signals, terrestrial Wi-Fi bleed (-24 dBm). Demonstrates signal collision: <strong>Weak / Degraded</strong>.
            </p>
            <div className="preset-card-footer">
              <span>Load &amp; Predict &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section className="home-bento-section">
        <h2 className="section-title">Core System Capabilities</h2>
        <p className="section-subtitle">
          How SatLink AI bridges radio frequency engineering with predictive data science.
        </p>

        <div className="bento-grid">
          <div className="bento-card">
            <h3>Atmospheric Loss &amp; Rain Fade</h3>
            <p>
              Quantifies electromagnetic signal absorption caused by precipitation, ambient moisture, and barometric pressure drops across satellite slant paths.
            </p>
          </div>

          <div className="bento-card">
            <h3>Random Forest Inference Engine</h3>
            <p>
              Employs an ensemble of decision trees trained on normalized frequency spectra to output probabilistic confidence scores across Good, Weak, and Degraded classes.
            </p>
          </div>

          <div className="bento-card">
            <h3>Automated Quality Mitigation</h3>
            <p>
              Instantly recommends remedial countermeasures—including transmit power stepping, antenna realignment, or adaptive coding—before a link outage occurs.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Workflow Strip */}
      <section className="home-workflow-section">
        <h2 className="section-title">End-to-End Operational Pipeline</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <span className="step-badge">01</span>
            <h4>Telemetry Ingestion</h4>
            <p>Captures carrier frequency, signal power, weather, and altitude.</p>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="workflow-step">
            <span className="step-badge">02</span>
            <h4>Feature Vectorization</h4>
            <p>One-hot encodes weather conditions and interference types into 17 features.</p>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="workflow-step">
            <span className="step-badge">03</span>
            <h4>Random Forest Model</h4>
            <p>Evaluates multi-variable regression trees to calculate class probabilities.</p>
          </div>
          <div className="step-arrow">&rarr;</div>
          <div className="workflow-step">
            <span className="step-badge">04</span>
            <h4>Assessment &amp; Advisory</h4>
            <p>Outputs classification report with actionable engineering recommendations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
