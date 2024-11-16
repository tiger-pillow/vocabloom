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
import LoginPage from './pages/LoginPage';
import NavbarRoleBased from './components/NavBarRole';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Router>
        <AuthProvider>
          <NavbarRoleBased></NavbarRoleBased>
          <Routes>
              <Route path= "/" element = {<WaitlistPage></WaitlistPage>}></Route>
              <Route path="/cards2" element={<HomePage />} />      {/* Home Route */}
              <Route path="/cards" element={<ProtectedRoute>  <CardPage2 /></ProtectedRoute>} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/admin/addcard" element={<ProtectedRoute><AddCardPage /></ProtectedRoute>} />
              <Route path="/admin/deck" element={<ProtectedRoute><AdminDeckPage /></ProtectedRoute>} />
              <Route path="/admin/cards" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> {/* Admin Route */}
            </Routes>
        </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
