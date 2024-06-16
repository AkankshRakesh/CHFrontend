import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useState } from 'react';
import { useCart } from './ContextReducer';

export default function Navbar({fixedTop}) {
  let data = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${fixedTop && !cartView ? 'fixed-top' : ''}`}>
  <div className="container-fluid">
  <Link  to="#">
      <img className="navbar-brand" src="https://imgdb.net/storage/uploads/81189a12e8e2f654bc12df3f9e4421e929e8916882cf0d10355828b72110e8f1.png" alt="" width="90" height="70"/>
    </Link>
    <Link className="navbar-brand fs-1 fst-italic fst-bold text-success mb-1" to="/" >Career<span className = "text-info">Hunt</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active fs-5 mt-3 mb-3" aria-current="page" to="/">Home</Link>
        </li>
        {(!localStorage.getItem("token")) ?
          <li className="nav-item">
              <Link className="nav-link fs-5 mt-3 mb-3 active nav-link-hover" aria-current="page" to="/myorder" >My Orders</Link>  
          </li> : ""
        }

      </ul>
      {(!localStorage.getItem("authToken")) ? 
      <div className='d-flex'>

          <Link className="btn bg-success text-white mr-5 mx-1 btn-outline-success" to="/login">Login</Link>

          <Link className="btn bg-success text-white ml-5 mx-1 btn-outline-success" to="/createuser">Signup</Link>

      </div>
      :
        <div>
          <div className="btn bg-white text-success mx - 2 m - 2" onClick={() => setCartView(true)}>
            My Careers  {" "}
            <Badge pill bg = "danger">{data.length}</Badge>
          </div>
          {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
          <div className="btn bg-danger text-white mr-5 mx-1 btn-outline-success" onClick={handleLogout}>
            Logout
          </div>
        </div>
      }
    </div>
  </div>
</nav>
    </div>
  )
}
