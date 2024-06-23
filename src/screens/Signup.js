import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
const apiUrl = "https://chbackend-o4ne.onrender.com";

export default function Signup() {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", geolocation: ""});
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`${apiUrl}/api/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            alert("You're in!");
            navigate("/login");
        }
    };

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    };

    return (
        <>
            <style>{'body { background-image: url("https://source.unsplash.com/random/900x700/?book"); height: 100%; background-size: cover; background-repeat: no-repeat; }'}</style>

            <div className="bg-dark m-5 rounded d-flex flex-column min-vh-100">
                <form onSubmit={handleSubmit} className='m-5'>
                    <div className="mb-3 mt-5">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onChange} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} id="password" onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} required />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
                <div className='bg-dark mt-auto'><Footer/></div>
            </div>
        </>
    );
}
