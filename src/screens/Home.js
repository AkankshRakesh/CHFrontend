import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch ] = useState('');
  const [category, setCategory ] = useState([]);
  const [stream, setStream] = useState([]);

  const loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/streamData",{
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      }
    });
  
    response = await response.json();
    setCategory(response[1]);
    setStream(response[0]);
  }

  useEffect(() =>{
    loadData()
  },[])
  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
  
  <div className="carousel-inner" id ="carousel">
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://c4.wallpaperflare.com/wallpaper/828/823/723/success-career-growth-hd-wallpaper-preview.jpg" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://i.pinimg.com/736x/16/c9/56/16c956c36e419ed13704d7c5e2b647fc.jpg" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
      <div className="container">
        {
          category !== [] 
          ? category.map((data) =>{
            return(
              <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>
                <hr />
                {stream !== [] ? stream.filter((stream) => (stream.CategoryName === data.CategoryName) && (stream.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems =>{
                  return (
                    <div key = {filterItems._id} className="col-s-12 col-md-6 col-lg-3 col-lg-gutters"> 
                        <Card courseItems = {filterItems}
                        >
                        </Card>
                    </div>
                  )
                }
              ): <div> No such data </div>
          }
            </div>
            )
          }) : <div>Error 404</div>

        }
        
        
        </div>
      <div><Footer /></div>
    </div>
  );
}
