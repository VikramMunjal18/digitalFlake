import React, { useEffect, useState } from 'react';
import './StateTable.css';

const StateModal = ({ isOpen, onClose, onSave, currentState }) => {
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (currentState) {
      console.log(currentState);
      setStateName(currentState.stateName);
      setStateCode(currentState.stateCode);
      setStatus(currentState.status);
    } else {
      setStateName('');
      setStateCode('');
      setStatus('Active');
    }
  }, [currentState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const stateData = { stateName, stateCode, status, _id: currentState?._id };
    onSave(stateData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h2>{currentState ? 'Edit State' : 'Add New State'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="stateName">State Name</label>
          <input
            type="text"
            id="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stateCode">State Code</label>
          <input
            type="text"
            id="stateCode"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="modal-buttons">
          <button type="submit">{currentState ? 'Update' : 'Save'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <h2>{currentState ? 'Edit State' : 'Add New State'}</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label>State Name</label>
    //         <input
    //           type="text"
    //           value={stateName}
    //           onChange={(e) => setStateName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>State Code</label>
    //         <input
    //           type="text"
    //           value={stateCode}
    //           onChange={(e) => setStateCode(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>Status</label>
    //         <select value={status} onChange={(e) => setStatus(e.target.value)}>
    //           <option value="Active">Active</option>
    //           <option value="Inactive">Inactive</option>
    //         </select>
    //       </div>
    //       <div className="modal-buttons">
    //         <button type="submit">{currentState ? 'Update' : 'Save'}</button>
    //         <button type="button" onClick={onClose}>Cancel</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default StateModal;
