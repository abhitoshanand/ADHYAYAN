import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentStyles.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="student-container">
      <div className="homepage-content fade-in">
        <div className="logo-section">
          <h1 className="app-title">ADHYAYAN</h1>
          <p className="app-subtitle">Learn. Practice. Excel.</p>
        </div>
        
        <div className="welcome-card">
          <h2>Welcome to ADHYAYAN</h2>
          <p>
            Enhance your learning journey with our comprehensive quiz platform. 
            Test your knowledge, identify areas for improvement, and track your progress 
            across various subjects and topics.
          </p>

          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <h3>Structured Learning</h3>
              <p>Organized by class, chapter, and topic</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <h3>Instant Feedback</h3>
              <p>Get immediate results for each question</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Track Progress</h3>
              <p>See your score after completing each quiz</p>
            </div>
          </div>

          <button 
            className="cta-button"
            onClick={() => navigate('/select-class')}
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
