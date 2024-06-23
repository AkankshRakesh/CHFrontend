import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PathwayModal from '../Modal2'; // Import the modal component
const apiUrl = "https://chbackend-o4ne.onrender.com";

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pathwayData, setPathwayData] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                alert("Please log in to view your orders.");
                navigate('/login'); // Redirect to login page
            }
        };

        checkAuth();
    }, [navigate]);

    const fetchMyOrder = async () => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await fetch(`${apiUrl}/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order data');
            }

            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const handleCardClick = (arrayData) => {
        setPathwayData(arrayData);
        setModalIsOpen(true);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const textStyle = {
        color: isHovered ? 'white' : '#007bff',
    };

    return (
        <div>
            <Navbar fixedTop={false} />
            <div className='container'>
                <div className="text-center mt-3">
                    <button 
                        className="btn btn-outline-primary" 
                        onClick={fetchMyOrder}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 1 1 .832-.554A4 4 0 1 0 8 4V2.5a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H8z"/>
                        </svg>
                        <span 
                            style={textStyle} 
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave}
                        >
                            Refresh if you dont see recent additions
                        </span>
                    </button>
                    <div className='fs-4 mt-2 text-success'>Click on the card!</div>
                </div>
                {loading ? (
                    <div className="text-center mt-5"><h4>Loading...</h4></div>
                ) : (
                    Object.keys(orderData).length !== 0 && orderData.careerData ? (
                        orderData.careerData.career_data.slice(0).reverse().map((item, index) => (
                            <div key={index}>
                                {item.some(arrayData => arrayData.Career_date) && (
                                    <div className='w-100 mt-5'>
                                        <h4 className='text-center'>{item.find(arrayData => arrayData.Career_date).Career_date}</h4>
                                        <hr />
                                    </div>
                                )}
                                <div className="row">
                                    {item.map((arrayData, idx) => (
                                        !arrayData.Career_date && (
                                            <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                                <div className="card card-container mt-3" style={{ width: "100%", maxHeight: "360px" }} onClick={() => handleCardClick(arrayData)}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "100%" }}>
                                                            <h6>The skills you'll need for sure</h6>
                                                            <span className='m-1'>{arrayData.skills}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5"><h4>No orders found</h4></div>
                    )
                )}
            </div>
            <Footer />
            <PathwayModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                pathwayData={pathwayData}
            />
        </div>
    );
}
