import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import MyOrder from './screens/MyOrder';
import About from './screens/About';
import { CartProvider } from './components/ContextReducer';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const apiUrl = "https://chbackend-o4ne.onrender.com";
function App() {
  const [message, setMessage] = useState("");

  
  useEffect(() => {
    fetch(apiUrl) 
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <CartProvider>
      <Router>
        <div>
          <h1>{message}</h1>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/about" element={<About />}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
