import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { UploadVideo } from './pages/UploadVideo';
import { UploadAudio } from './pages/UploadAudio';
import { Misinfo } from './pages/Misinfo';
import { Chatbot } from './pages/Chatbot';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload-video" element={<UploadVideo />} />
          <Route path="upload-audio" element={<UploadAudio />} />
          <Route path="misinfo" element={<Misinfo />} />
          <Route path="chat" element={<Chatbot />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
