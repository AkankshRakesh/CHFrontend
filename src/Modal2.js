import React from 'react';
import Modal from 'react-modal';
import { CloseIcon, ArrowDownIcon } from '@chakra-ui/icons';

Modal.setAppElement('#root'); // This is to avoid screen readers issues.

const MODAL_STYLES = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '90%',
    width: '90%',
    overflow: 'hidden',
    borderRadius: '10px',
    padding: '0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  }
};

const BUTTON_STYLES = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const HEADER_STYLES = {
  position: 'relative',
  padding: '20px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const HEADING_STYLES = {
  margin: 0,
  textAlign: 'center',
};

const CONTENT_STYLES = {
  flex: '1',
  overflowY: 'auto',
  padding: '20px',
  textAlign: 'center',
};

const PATHWAY_STYLES = {
  textAlign: 'center',
  lineHeight: '2.5',
};

const LINK_STYLES = {
  color: '#e74c3c',
  textDecoration: 'none',
  marginTop: '20px',
};

const PathwayModal = ({ isOpen, onRequestClose, pathwayData }) => {
  const renderPathway = (pathwayString) => {
    if (!pathwayString) return null;
    const pathwayArray = pathwayString.split(',').map(path => path.trim());
    return (
      <div style={PATHWAY_STYLES}>
        {pathwayArray.map((step, index) => (
          <div key={index}>
            <div>{step}</div>
            {index < pathwayArray.length - 1 && <ArrowDownIcon />}
          </div>
        ))}
      </div>
    );
  };

  // Check if pathwayData exists before accessing its properties
  if (!pathwayData) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Pathway Details"
        style={MODAL_STYLES}
      >
        <div>Loading...</div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Pathway Details"
      style={MODAL_STYLES}
    >
      <div style={HEADER_STYLES}>
        <h2 style={HEADING_STYLES}>{pathwayData.name}</h2>
        <button style={BUTTON_STYLES} onClick={onRequestClose}>
          <CloseIcon />
        </button>
      </div>
      <div style={CONTENT_STYLES}>
        {renderPathway(pathwayData.pathway)}
        <hr className="bg-danger border-2 border-top border-danger" />
        <span>To know in greater depth, </span>
        <a href={pathwayData.link} target='_blank' rel='noopener noreferrer' style={LINK_STYLES}>
          Click here
        </a>
      </div>
    </Modal>
  );
};

export default PathwayModal;
