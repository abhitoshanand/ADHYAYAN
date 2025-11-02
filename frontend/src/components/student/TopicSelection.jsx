import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './StudentStyles.css';

const TopicSelection = () => {
  const [topics, setTopics] = useState([]);
  const [chapterName, setChapterName] = useState('');
  const [loading, setLoading] = useState(true);
  const { chapterId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopics();
    fetchChapterName();
  }, [chapterId]);

  const fetchChapterName = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/chapters');
      const selectedChapter = response.data.find(c => c._id === chapterId);
      if (selectedChapter) {
        setChapterName(selectedChapter.name);
      }
    } catch (error) {
      console.error('Error fetching chapter name:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/topics/chapter/${chapterId}`);
      setTopics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching topics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="student-container">
        <div className="loading">Loading topics...</div>
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
          <button onClick={() => navigate(-1)} className="breadcrumb-link">
            Select Chapter
          </button>
          <span className="breadcrumb-separator">›</span>
          <span>{chapterName}</span>
        </div>

        <h1 className="selection-title">Select Topic</h1>
        <p className="selection-subtitle">Choose a topic from {chapterName}</p>

        <div className="selection-grid">
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="selection-card slide-in"
              onClick={() => navigate(`/quiz/${topic._id}`)}
            >
              <div className="card-icon">🎯</div>
              <h3>{topic.name}</h3>
              {topic.description && <p>{topic.description}</p>}
            </div>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="empty-state">
            <p>No topics available for this chapter.</p>
            <button onClick={() => navigate(-1)} className="back-button">
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicSelection;
