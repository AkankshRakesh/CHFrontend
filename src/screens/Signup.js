import React,{ useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name : credentials.name , email : credentials.email, password : credentials.password, location : credentials.geolocation})
         });
          const json = await response.json()
          console.log(json);

          if(!json.success){
            alert("Enter Valid Credentials")
          }
          if(json.success){
            alert("You're in!");
          }
    }
    const onChange = (event) =>{
      setcredentials({...credentials,[event.target.name] : event.target.value})
    }
    return (
    <>
      <style>{'body { background-image: url("https://source.unsplash.com/random/900x700/?book"); height : 100% ; background-size: cover; background-repeat: no-repeat;}'}</style>

      <div className="bg-dark m-5 rounded d-flex flex-column min-vh-100">
        <form onSubmit={handleSubmit} className='m-5'>
          <div className="mb-3 mt-5">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name= 'name' value={credentials.name} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name = 'email'
              value={credentials.email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              id="exampleInputPassword1"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" name= 'geolocation' value={credentials.geolocation} onChange={onChange}/>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to = "/login" className = "m-3 btn btn-danger">Already a User</Link>
        </form>
        <div className='bg-dark mt-auto'><Footer/></div>
      </div>
      
    </>
  );
}
