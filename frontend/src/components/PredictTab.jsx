import React from 'react';

export default function PredictTab({
  formData,
  onChange,
  onSubmit,
  isLoading,
  result,
  onReset,
  onLoadPreset,
  onGoToGraphs
}) {
  const isGood = result?.prediction === 'Good';
  const isWeak = result?.prediction === 'Weak';
  const isDanger = result && !isGood && !isWeak;

  return (
    <div className="tab-page">
      {/* Quick Preset Selector */}
      <div className="preset-bar">
        <span className="preset-bar-title">Quick Test Inputs:</span>
        <button
          type="button"
          className="btn-sample"
          onClick={() => onLoadPreset('good')}
        >
          Sample 1: Clear Sky (Good)
        </button>
        <button
          type="button"
          className="btn-sample"
          onClick={() => onLoadPreset('rain')}
        >
          Sample 2: Rainy Weather (Weak/Risk)
        </button>
        <button
          type="button"
          className="btn-sample"
          onClick={() => onLoadPreset('interference')}
        >
          Sample 3: High Interference
        </button>
      </div>

      <div className="predict-layout">
        {/* Left Side: Clean Form */}
        <div className="form-card-simple">
          <h2 className="box-title">Enter Satellite Link Telemetry</h2>
          <p className="box-subtitle">
            Fill in the measured or simulated RF and weather parameters below.
          </p>

          <form onSubmit={onSubmit}>
            <div className="form-grid-simple">
              {/* Frequency */}
              <div className="form-group">
                <label>Carrier Frequency (Hz)</label>
                <input
                  type="number"
                  name="frequency"
                  value={formData.frequency}
                  onChange={(e) => onChange('frequency', Number(e.target.value))}
                  className="form-input"
                  required
                />
                <small className="input-hint">e.g. 120000000 (120 MHz)</small>
              </div>

              {/* Signal Strength */}
              <div className="form-group">
                <label>Signal Strength (dBm)</label>
                <input
                  type="number"
                  name="signal_strength"
                  value={formData.signal_strength}
                  onChange={(e) => onChange('signal_strength', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">e.g. -45 (higher is stronger)</small>
              </div>

              {/* Bandwidth */}
              <div className="form-group">
                <label>Bandwidth (Hz)</label>
                <input
                  type="number"
                  name="bandwidth"
                  value={formData.bandwidth}
                  onChange={(e) => onChange('bandwidth', Number(e.target.value))}
                  className="form-input"
                  required
                />
                <small className="input-hint">e.g. 500000 (500 kHz)</small>
              </div>

              {/* Weather Condition */}
              <div className="form-group">
                <label>Weather Condition</label>
                <select
                  value={formData.weather_condition}
                  onChange={(e) => onChange('weather_condition', e.target.value)}
                  className="form-input"
                >
                  <option value="Sunny">Sunny</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                </select>
                <small className="input-hint">Sky &amp; cloud coverage</small>
              </div>

              {/* Precipitation */}
              <div className="form-group">
                <label>Precipitation (mm/h)</label>
                <input
                  type="number"
                  name="precipitation"
                  value={formData.precipitation}
                  onChange={(e) => onChange('precipitation', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Rain rate (0 for dry)</small>
              </div>

              {/* Temperature */}
              <div className="form-group">
                <label>Temperature (°C)</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={(e) => onChange('temperature', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Ground temperature</small>
              </div>

              {/* Humidity */}
              <div className="form-group">
                <label>Humidity (%)</label>
                <input
                  type="number"
                  name="humidity"
                  value={formData.humidity}
                  onChange={(e) => onChange('humidity', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Relative humidity 0-100</small>
              </div>

              {/* Wind Speed */}
              <div className="form-group">
                <label>Wind Speed (m/s)</label>
                <input
                  type="number"
                  name="wind_speed"
                  value={formData.wind_speed}
                  onChange={(e) => onChange('wind_speed', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Wind velocity</small>
              </div>

              {/* Air Pressure */}
              <div className="form-group">
                <label>Air Pressure (hPa)</label>
                <input
                  type="number"
                  name="air_pressure"
                  value={formData.air_pressure}
                  onChange={(e) => onChange('air_pressure', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Standard is 1013 hPa</small>
              </div>

              {/* WiFi Strength / Local Noise */}
              <div className="form-group">
                <label>WiFi Strength (dBm)</label>
                <input
                  type="number"
                  name="wifi_strength"
                  value={formData.wifi_strength}
                  onChange={(e) => onChange('wifi_strength', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Local ambient RF noise</small>
              </div>

              {/* Altitude */}
              <div className="form-group">
                <label>Altitude (m)</label>
                <input
                  type="number"
                  name="altitude"
                  value={formData.altitude}
                  onChange={(e) => onChange('altitude', Number(e.target.value))}
                  className="form-input"
                  step="any"
                  required
                />
                <small className="input-hint">Height above sea level</small>
              </div>

              {/* Interference Type */}
              <div className="form-group">
                <label>Interference Type</label>
                <select
                  value={formData.interference_type}
                  onChange={(e) => onChange('interference_type', e.target.value)}
                  className="form-input"
                >
                  <option value="None/Unknown">None / Unknown</option>
                  <option value="Adjacent-channel">Adjacent-channel</option>
                  <option value="Co-channel">Co-channel</option>
                  <option value="Intermodulation">Intermodulation</option>
                </select>
                <small className="input-hint">Channel interference type</small>
              </div>
            </div>

            <div className="form-buttons-row">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-submit-main"
              >
                {isLoading ? 'Running Model...' : 'Predict Link Quality'}
              </button>
              <button
                type="button"
                onClick={onReset}
                className="btn-reset"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Simple Clean Result Box */}
        <div className="result-card-simple">
          <h2 className="box-title">Prediction Result</h2>
          <p className="box-subtitle">
            Model inference output from Random Forest algorithm.
          </p>

          {!result ? (
            <div className="empty-box">
              <p>No prediction made yet.</p>
              <small>Click &quot;Predict Link Quality&quot; to test the telemetry inputs.</small>
            </div>
          ) : (
            <div className="result-content">
              {/* Main Badge */}
              <div className={`alert-result ${isGood ? 'alert-good' : isWeak ? 'alert-weak' : 'alert-danger'}`}>
                <span className="alert-result-label">PREDICTED LINK QUALITY</span>
                <div className="alert-result-value">{result.prediction}</div>
              </div>

              {/* Probabilities Table */}
              <div className="prob-box">
                <h3 className="section-label">Prediction Probabilities:</h3>
                <div className="prob-list">
                  {Object.entries(result.probabilities).map(([key, val]) => (
                    <div key={key} className="prob-row-simple">
                      <span className="prob-key">{key}:</span>
                      <div className="prob-bar-container">
                        <div
                          className={`prob-bar-fill ${key === 'Good' ? 'fill-good' : key === 'Weak' ? 'fill-weak' : 'fill-danger'}`}
                          style={{ width: `${val}%` }}
                        />
                      </div>
                      <span className="prob-num">{val}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation Box */}
              <div className="rec-box">
                <h3 className="section-label">Recommendation:</h3>
                <p className="rec-text">{result.recommendation}</p>
              </div>

              {/* Jump to Graphs Button */}
              <button
                type="button"
                className="btn-view-graphs"
                onClick={onGoToGraphs}
              >
                View Graphs &amp; Visualizations &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
