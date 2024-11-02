import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPages/AdminCardPage';
import AddCardPage from './pages/AdminPages/AddCardPage';
import WaitlistPage from './pages/WaitlistPage';
import CardPage2 from './pages/CardPage2';
import AdminDeckPage from './pages/AdminPages/AdminDeckPage';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path= "/" element = {<WaitlistPage></WaitlistPage>}></Route>
            <Route path="/cards" element={<HomePage />} />      {/* Home Route */}
            <Route path = "/cards2" element = {<CardPage2/>} />
            <Route path="/admin/cards" element={<AdminPage />} /> {/* Admin Route */}
            <Route path= "/addcard" element = {<AddCardPage/>} />
            <Route path="/admin/deck" element={<AdminDeckPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
