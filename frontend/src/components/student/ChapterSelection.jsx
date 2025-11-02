import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentStyles.css';

const ChapterSelection = () => {
  const [chapters, setChapters] = useState([]);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(true);
  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchChapters();
    fetchClassName();
  }, [classId]);

  const fetchClassName = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes');
      const selectedClass = response.data.find(c => c._id === classId);
      if (selectedClass) {
        setClassName(selectedClass.name);
      }
    } catch (error) {
      console.error('Error fetching class name:', error);
    }
  };

  const fetchChapters = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chapters/class/${classId}`);
      setChapters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="student-container">
        <div className="loading">Loading chapters...</div>
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
          <button onClick={() => navigate('/select-class')} className="breadcrumb-link">
            Select Class
          </button>
          <span className="breadcrumb-separator">›</span>
          <span>{className}</span>
        </div>

        <h1 className="selection-title">Select Chapter</h1>
        <p className="selection-subtitle">Choose a chapter from {className}</p>

        <div className="selection-grid">
          {chapters.map((chapter) => (
            <div
              key={chapter._id}
              className="selection-card slide-in"
              onClick={() => navigate(`/select-topic/${chapter._id}`)}
            >
              <div className="card-icon">📚</div>
              <h3>{chapter.name}</h3>
              {chapter.description && <p>{chapter.description}</p>}
            </div>
          ))}
        </div>

        {chapters.length === 0 && (
          <div className="empty-state">
            <p>No chapters available for this class.</p>
            <button onClick={() => navigate('/select-class')} className="back-button">
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterSelection;
