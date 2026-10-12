import React, { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [mode, setMode]                 = useState('signin'); // 'signin' | 'register'
  const [username, setUsername]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPass, setConfirmPass]   = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const handleTabSwitch = (newMode) => {
    setMode(newMode);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }

    if (mode === 'register') {
      if (!email.trim()) {
        setError('Please enter your email address.');
        return;
      }
      if (!password.trim()) {
        setError('Please enter a password.');
        return;
      }
      if (password !== confirmPass) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!password.trim()) {
        setError('Please enter your password.');
        return;
      }
    }

    setError('');
    setLoading(true);

    // Simulate brief authentication/registration delay, then accept credentials
    setTimeout(() => {
      setLoading(false);
      onLogin(username.trim());
    }, 700);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Brand */}
        <div className="login-brand">
          <span className="login-brand-badge">SAT</span>
          <div>
            <span className="login-brand-title">SatLink AI</span>
            <span className="login-brand-sub">Satellite Link Quality Prediction System</span>
          </div>
        </div>

        {/* Tab switch between Sign In and Register */}
        <div className="auth-tab-group">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('register')}
          >
            Register
          </button>
        </div>

        <h2 className="login-heading">
          {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="login-subheading">
          {mode === 'signin'
            ? 'Access satellite link analytics & prediction engine'
            : 'Register for research & real-time telemetry access'}
        </p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="login-field">
            <label htmlFor="auth-username">Username</label>
            <input
              id="auth-username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              autoComplete="username"
              autoFocus
            />
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                autoComplete="email"
              />
            </div>
          )}

          <div className="login-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {mode === 'register' && (
            <div className="login-field">
              <label htmlFor="auth-confirm-password">Confirm Password</label>
              <input
                id="auth-confirm-password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="login-input"
                autoComplete="new-password"
              />
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? (mode === 'signin' ? 'Authenticating...' : 'Creating Account...')
              : (mode === 'signin' ? 'Sign In' : 'Register Account')}
          </button>
        </form>

        <div className="auth-switch-footer">
          {mode === 'signin' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => handleTabSwitch('register')}
              >
                Register now
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => handleTabSwitch('signin')}
              >
                Sign in here
              </button>
            </span>
          )}
        </div>

        <p className="login-hint">
          Any credentials are accepted for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
