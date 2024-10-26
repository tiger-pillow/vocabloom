import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPages/AdminPage';
import AddCardPage from './pages/AdminPages/AddCardPage';
import WaitlistPage from './pages/WaitlistPage';
import CardPage2 from './pages/CardPage2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path= "/" element = {<WaitlistPage></WaitlistPage>}></Route>
            <Route path="/cards" element={<HomePage />} />      {/* Home Route */}
            <Route path = "/cards2" element = {<CardPage2/>} />
            <Route path="/admin" element={<AdminPage />} /> {/* Admin Route */}
            <Route path= "/addcard" element = {<AddCardPage/>} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
