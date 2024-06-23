import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container py-3 my-4 border-top">
      <div className="d-flex justify-content-center align-items-center">
        <ul className="nav">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
          <li className="nav-item">
              <img src="https://imgdb.net/storage/uploads/81189a12e8e2f654bc12df3f9e4421e929e8916882cf0d10355828b72110e8f1.png" alt="" width="90" height="70" />
          </li>
          <li className="nav-item"><Link to="/about" className="nav-link px-2 text-muted">About</Link></li>
        </ul>
      </div>
    </footer>
  );
}
