import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/loginuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        alert('Success! Welcome Back!');
        navigate('/');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Failed to login. Please try again later.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <style>
        {`
          body {
            background-image: url("https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg");
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>

      <div className='bg-dark m-5 rounded d-flex flex-column min-vh-100'>
        <form onSubmit={handleSubmit} className='m-5'>
          <div className='mb-3 ml-5'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              onChange={onChange}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className='mb-3 ml-5'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={credentials.password}
              id='exampleInputPassword1'
              onChange={onChange}
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Submit
          </button>
          <Link to='/createuser' className='m-3 btn btn-danger'>
            I'm a new user
          </Link>
        </form>
        <div className='bg-dark mt-auto'>
          <Footer />
        </div>
      </div>
    </>
  );
}
