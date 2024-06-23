import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
const apiUrl = "https://chbackend-o4ne.onrender.com";


export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([]);
  const [stream, setStream] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(false); // Added error state

  useEffect(() => {
    const loadData = async () => {
      try {
        let response = await fetch(`${apiUrl}/api/streamData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          response = await response.json();
          setCategory(response[1]);
          setStream(response[0]);
        } else {
          setError(true); // Set error state if fetch fails
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Set error state if fetch throws an error
      } finally {
        setLoading(false); // Always set loading to false after fetch
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="ms-2">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="alert alert-danger" role="alert">
          Error fetching data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar fixedTop={true} />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://www.unrevealedfiles.com/wp-content/uploads/2023/07/Illustration-of-Theory-of-knowledge.webp" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://cdn.corporatefinanceinstitute.com/assets/knowledge-economy.jpeg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://s29814.pcdn.co/wp-content/uploads/2022/12/shutterstock_1847661151.jpg.optimal.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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
        </div>
      </div>
      <div className="fs-3 text-success fw-semibold text-center">Choose your most liked job career</div>
      <hr></hr>
      <div className="fs-5 text-warning text-center">This site is designed to guide you towards your career and what you need to achieve your goal</div>
      <div className="fst-italic text-center"><strong>Stars rating</strong> :- overall rating for that job career</div>
      <div className="fst-italic text-center"><strong>Avg Pay</strong> :- Beginner-Expert salary in that field</div>
      <div className="fst-italic text-center"><strong>Login</strong> to see a detailed pathway for the field!</div>
      <hr></hr>
      <div className="container">
        {category.length > 0 ? (
          category.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 fw-bold m-3">{data.CategoryName}</div>
              <hr />
              {stream.filter((streamItem) => streamItem.CategoryName === data.CategoryName && streamItem.name.toLowerCase().includes(search.toLowerCase())).map(filterItems => (
                <div key={filterItems._id} className="col-s-12 col-md-6 col-lg-3 col-lg-gutters">
                  <Card courseItems={filterItems} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <div>Error 404</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
