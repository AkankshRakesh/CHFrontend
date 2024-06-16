import React, { useState, useEffect } from 'react';
import { Collapse, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatchCart, useCart } from './ContextReducer';
import { StarIcon } from '@chakra-ui/icons';

const Card = React.memo((props) => {
  const courseItem = props.courseItems || {};
  const dispatch = useDispatchCart();
  const data = useCart();
  const collapseId = `collapse-${courseItem.index}`;
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      setAlertMessage('This feature needs login!');
      setShowAlert(true);
      return;
    }

    // Check if the item is already in the cart
    const alreadyAdded = data.some(item => item.id === props.courseItems._id);
    if (alreadyAdded) {
      setAlertMessage('Already Selected!');
      setShowAlert(true);
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.courseItems._id,
      name: props.courseItems.name,
      skills: props.courseItems.skills,
      pathway: props.courseItems.pathway,
      link: props.courseItems.link
    });
    setAlertMessage('Added to List!');
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div>
      <style>
        {`
          .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease-out;
          }
          .fade-in {
            opacity: 1;
            transition: opacity 0.5s ease-in;
          }
        `}
      </style>
      {showAlert && (
        <div className={`alert alert-success alert-dismissible ${showAlert ? 'fade-in' : 'fade-out'}`} role="alert">
          {alertMessage}
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}></button>
        </div>
      )}
      
      <div className="card mt-3 card-container">
        <img src={props.courseItems.img} className="card-img-top rounded" alt="..." style={{height: '180px', objectFit: "fill"}} />
        <div className="card-body">
          <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-${courseItem._id}`} className="custom-tooltip">{props.courseItems.name}</Tooltip>}
            >
              <h5 className="card-title text-truncate">{props.courseItems.name}</h5>
          </OverlayTrigger>
          
          <div className="ratings ml-5">
            <StarIcon className={`rating-color ${props.courseItems.star1 === 'true' ? 'text-warning' : ''}`} />
            <StarIcon className={`rating-color ${props.courseItems.star2 === 'true' ? 'text-warning' : ''}`} />
            <StarIcon className={`rating-color ${props.courseItems.star3 === 'true' ? 'text-warning' : ''}`} />
            <StarIcon className={`rating-color ${props.courseItems.star4 === 'true' ? 'text-warning' : ''}`} />
            <StarIcon className={`rating-color ${props.courseItems.star5 === 'true' ? 'text-warning' : ''}`} />
          </div>

          <p className='card-text'>{props.courseItems.pay}</p>
          <Button
            className="btn btn-primary"
            aria-expanded={open}
            aria-controls={collapseId}
            onClick={() => setOpen(!open)}
          >
            Learn More
          </Button>
          <Collapse in={open}>
            <div id={collapseId}>
              <div className="card card-body">
                {props.courseItems.para ? props.courseItems.para : `No content provided`}
              </div>
            </div>
          </Collapse>
        </div>
        <button className={`btn btn-success justify-center`} onClick={handleAddToCart}>
          Add to List
        </button>
      </div>
    </div>
  );
});

export default Card;
