import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setcredentials] = useState({name:"",email:"",password:""})
  let navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email : credentials.email, password : credentials.password})
         });
          const json = await response.json()
          console.log(json);

          if(!json.success){
            alert("Enter Valid Credentials")
          }
          if(json.success){
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("authToken",json.authToken);
            alert("Success! Welcome Back!");
            navigate("/");
          }
          
    }
    const onChange = (event) =>{
      setcredentials({...credentials,[event.target.name] : event.target.value})
    }
  return (
    <>
    <style>{'body { background-image: url("https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg"); height : 100% ; background-size: cover; background-repeat: no-repeat;}'}</style>

    <div className='bg-dark m-5 rounded d-flex flex-column min-vh-100'>
      <form onSubmit={handleSubmit} className='m-5'>
            <div className="mb-3 ml-5">
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
          <div className="mb-3 ml-5">
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
          <button type="submit" className=" btn btn-success">
            Submit
          </button>
          <Link to = "/createuser" className = "m-3 btn btn-danger">I'm a new user</Link>
        </form>
        <div className='bg-dark mt-auto'><Footer/></div>
    </div>
  </>
  )
}
