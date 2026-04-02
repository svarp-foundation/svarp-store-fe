import React, { useState, useEffect } from 'react';
import './UnderDevelopment.css';

const UnderDevelopment = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set the target date (e.g., 30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="ud-container">
      <div className="ud-background">
        <div className="ud-shape ud-shape-1"></div>
        <div className="ud-shape ud-shape-2"></div>
        <div className="ud-shape ud-shape-3"></div>
      </div>

      <main className="ud-content">
        <header className="ud-header">
          <div className="ud-logo">SVARP</div>
        </header>

        <section className="ud-hero">
          <h1 className="ud-title">Something Great is <span className="ud-gradient-text">Coming Soon</span></h1>
          <p className="ud-subtitle">
            We're working hard to bring you a premium experience. Our store is undergoing some magical transformations.
          </p>
        </section>

        <section className="ud-countdown">
          <div className="ud-timer-item">
            <span className="ud-timer-value">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="ud-timer-label">Days</span>
          </div>
          <div className="ud-timer-item">
            <span className="ud-timer-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="ud-timer-label">Hours</span>
          </div>
          <div className="ud-timer-item">
            <span className="ud-timer-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="ud-timer-label">Minutes</span>
          </div>
          <div className="ud-timer-item">
            <span className="ud-timer-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="ud-timer-label">Seconds</span>
          </div>
        </section>

        <section className="ud-newsletter">
          {!isSubmitted ? (
            <form className="ud-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email for updates"
                className="ud-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="ud-button">Notify Me</button>
            </form>
          ) : (
            <div className="ud-success-message">
              <h3>You're on the list! ✨</h3>
              <p>We'll notify you the moment we go live.</p>
            </div>
          )}
        </section>

        <footer className="ud-footer">
          <div className="ud-social-links">
            <a href="#" className="ud-social-link">Twitter</a>
            <a href="#" className="ud-social-link">Instagram</a>
            <a href="#" className="ud-social-link">Discord</a>
          </div>
          <p className="ud-copyright">© 2026 SVARP. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default UnderDevelopment;
