import React, { useState } from 'react';
import { Collapse, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  let courseItem = props.courseItems;
  let dispatch = useDispatchCart();
  let data = useCart();
  const collapseId = `collapse-${props.courseItems.index}`;
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = async () => {
    let doIt = true;
    for (const item of data) {
      if (item.id === courseItem._id) {
        setShowAlert(true);
        doIt = false;
        break;
      }
    }
    if (doIt) {
      await dispatch({
        type: "ADD",
        id: props.courseItems._id,
        name: props.courseItems.name,
        skills: props.courseItems.skills
      });
      console.log(data);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Already Selected!</strong>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAlert}>
          </button>
        </div>
      )}
      
      <div className="card mt-3">
        <img src={props.courseItems.img} className="card-img-top rounded" alt="..." style={{height: '180px', objectFit: "fill"}} />
        <div className="card-body">
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${courseItem._id}`} className="custom-tooltip">{props.courseItems.name}</Tooltip>}
          >
            <h5 className="card-title text-truncate">{props.courseItems.name}</h5>
          </OverlayTrigger>
          
          <div className="ratings ml-5">
            <i className={`fa fa-star rating-color ${props.courseItems.star1 === 'true' ? 'text-warning' : ''}`}></i>
            <i className={`fa fa-star rating-color ${props.courseItems.star2 === 'true' ? 'text-warning' : ''}`}></i>
            <i className={`fa fa-star rating-color ${props.courseItems.star3 === 'true' ? 'text-warning' : ''}`}></i>
            <i className={`fa fa-star rating-color ${props.courseItems.star4 === 'true' ? 'text-warning' : ''}`}></i>
            <i className={`fa fa-star rating-color ${props.courseItems.star5 === 'true' ? 'text-warning' : ''}`}></i>
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
        <button className={`btn btn-success justify-center`} onClick={handleAddToCart}>Add to List</button>
      </div>
    </div>
  );
}
