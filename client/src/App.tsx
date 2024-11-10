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
import Navbar from './components/NavBarRole';
import NavbarRoleBased from './components/NavBarRole';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Router>
        <AuthProvider>
          <NavbarRoleBased></NavbarRoleBased>
          <Routes>
            <Route path= "/" element = {<WaitlistPage></WaitlistPage>}></Route>
              <Route path="/cards" element={<HomePage />} />      {/* Home Route */}
              <Route path="/cards2" element={<ProtectedRoute>  <CardPage2 /></ProtectedRoute>} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/admin/addcard" element={<AddCardPage />} />
              <Route path="/admin/deck" element={<AdminDeckPage />} />
              <Route path="/admin/cards" element={<AdminPage />} /> {/* Admin Route */}
            </Routes>
        </AuthProvider>
        </Router>
      </header>
    </div>
  );
}

export default App;
