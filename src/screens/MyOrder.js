import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PathwayModal from '../Modal2'; // Import the modal component

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pathwayData, setPathwayData] = useState(null);

    useEffect(() => {
        // Check if the page has already been reloaded
        if (!sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload();
        }
    }, []);

    const fetchMyOrder = async () => {
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const handleCardClick = (arrayData) => {
        setPathwayData(arrayData);
        setModalIsOpen(true);
    };

    return (
        <div>
            <div><Navbar fixedTop={false}/></div>
            <div className='container'>
                {Object.keys(orderData).length !== 0 ?
                    orderData.careerData ?
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
                                        arrayData.Career_date ? null : (
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
                        )) : <div className="text-center mt-5"><h4>No orders found</h4></div>
                    : <div className="text-center mt-5"><h4>Loading...</h4></div>}
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
