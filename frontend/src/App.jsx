import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Student Components
import Homepage from './components/student/Homepage';
import ClassSelection from './components/student/ClassSelection';
import ChapterSelection from './components/student/ChapterSelection';
import TopicSelection from './components/student/TopicSelection';
import QuizInterface from './components/student/QuizInterface';
import QuizResults from './components/student/QuizResults';

// Admin Components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ClassManagement from './components/admin/ClassManagement';
import ChapterManagement from './components/admin/ChapterManagement';
import TopicManagement from './components/admin/TopicManagement';
import QuestionManagement from './components/admin/QuestionManagement';
import AdvertisementManagement from './components/admin/AdvertisementManagement';

function App() {
  return (
    
      
        {/* Student Routes */}
        } />
        } />
        } />
        } />
        } />
        } />
{/* Admin Routes */}
        } />
        } />
        } />
        } />
        } />
        } />
        } />
      
    
  );
}

export default App;
