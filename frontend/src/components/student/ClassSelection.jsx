import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentStyles.css';

const ClassSelection = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      setClasses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="student-container">
        <div className="loading">Loading classes...</div>
      </div>
    );
  }

  return (
    <div className="student-container">
      <div className="selection-content fade-in">
        <div className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            Home
          </button>
          <span className="breadcrumb-separator">›</span>
          <span>Select Class</span>
        </div>

        <h1 className="selection-title">Select Your Class</h1>
        <p className="selection-subtitle">Choose your class to begin</p>

        <div className="selection-grid">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="selection-card slide-in"
              onClick={() => navigate(`/select-chapter/${cls._id}`)}
            >
              <div className="card-icon">📖</div>
              <h3>{cls.name}</h3>
              {cls.description && <p>{cls.description}</p>}
            </div>
          ))}
        </div>

        {classes.length === 0 && (
          <div className="empty-state">
            <p>No classes available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassSelection;
