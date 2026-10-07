import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => setActiveTab('home')}>
          <span className="brand-icon">🛰️</span>
          <div>
            <span className="brand-title">SatLink AI</span>
            <span className="brand-tag">B.Tech Project</span>
          </div>
        </div>

        <div className="nav-tabs">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'predict' ? 'active' : ''}`}
            onClick={() => setActiveTab('predict')}
          >
            Predict Link
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'graphs' ? 'active' : ''}`}
            onClick={() => setActiveTab('graphs')}
          >
            Graphs &amp; Charts
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Test History
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About Project
          </button>
        </div>
      </div>
    </nav>
  );
}
