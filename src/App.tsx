import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './components/LandingPage';
import ResumeUpload from './components/ResumeUpload';
import InternshipList from './components/InternshipList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/internships" element={<InternshipList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;