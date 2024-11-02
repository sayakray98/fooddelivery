import './App.css';
import Header from './common/header/Header';
import Home from './components/homepge/Home';
import Cart from './components/homepge/Cart';
import Login from './common/header/Login';
import { AppProvider } from './components/AppContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const userName = localStorage.getItem('userName');

  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Header  /> {/* Pass userName as a prop to Header */}
          <Routes>
            <Route path="/" element={<Home userName={userName} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
