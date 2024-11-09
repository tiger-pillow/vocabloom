import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPages/AdminCardPage';
import AddCardPage from './pages/AdminPages/AddCardPage';
import WaitlistPage from './pages/WaitlistPage';
import CardPage2 from './pages/CardPage2';
import AdminDeckPage from './pages/AdminPages/AdminDeckPage';
import SignUpPage from './pages/SignUpPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthProvider>
        <Router>
          <Routes>
            <Route path= "/" element = {<WaitlistPage></WaitlistPage>}></Route>
              <Route path="/cards" element={<HomePage />} />      {/* Home Route */}
              <Route path="/cards2" element={<ProtectedRoute>  <CardPage2 /></ProtectedRoute>} />
              <Route path="/admin/cards" element={<AdminPage />} /> {/* Admin Route */}
              <Route path= "/addcard" element = {<AddCardPage/>} />
              <Route path="/admin/deck" element={<AdminDeckPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
