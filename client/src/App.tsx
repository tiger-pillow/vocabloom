import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPages/AdminPage';
import AddCardPage from './pages/AdminPages/AddCardPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />      {/* Home Route */}
            <Route path="/admin" element={<AdminPage />} /> {/* Admin Route */}
            <Route path = "/addcard" element = {<AddCardPage/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
