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
      <div><Navbar fixedTop={true}/></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit : "contain !important"}}>
  <div className="carousel-inner" id ="carousel">
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img src="https://www.unrevealedfiles.com/wp-content/uploads/2023/07/Illustration-of-Theory-of-knowledge.webp" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://cdn.corporatefinanceinstitute.com/assets/knowledge-economy.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg" className="d-block w-100" style={{ filter: "brightness(30%)"}} alt="..."/>
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
      <div className="fs-3 text-success fw-semibold text-center">Choose your most liked course</div>
      <div className="fst-italic text-center">Stars rating is based on the current market trends</div>
      <div className="container">
        {
          category !== [] 
          ? category.map((data) =>{
            return(
              <div className="row mb-3">
              <div key={data._id} className="fs-3 fw-bold m-3">
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
