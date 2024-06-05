// WarehouseModal.js
import React, { useEffect, useState } from 'react';
import './WarehouseTable.css';

const WerehouseModal = ({ isOpen, onClose, onSave, currentWarehouse }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (currentWarehouse) {
      console.log(currentWarehouse);
      setName(currentWarehouse.name);
      setState(currentWarehouse.state.stateName);
      setCity(currentWarehouse.city);
      setStatus(currentWarehouse.status);
    } else {
      setName('');
      setState('');
      setCity('');
      setStatus('Active');
    }
  }, [currentWarehouse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const warehouseData = { name, state, city, status, _id: currentWarehouse?._id };
    onSave(warehouseData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h2>{currentWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          <button type="submit">{currentWarehouse ? 'Update' : 'Save'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <h2>{currentWarehouse ? 'Edit Warehouse' : 'Add New Warehouse'}</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label>Name</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>State</label>
    //         <input
    //           type="text"
    //           value={state}
    //           onChange={(e) => setState(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>City</label>
    //         <input
    //           type="text"
    //           value={city}
    //           onChange={(e) => setCity(e.target.value)}
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
    //         <button type="submit">{currentWarehouse ? 'Update' : 'Save'}</button>
    //         <button type="button" onClick={onClose}>Cancel</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default WerehouseModal;
