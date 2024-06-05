// AddStateForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddStateForm = () => {
  const [stateName, setStateName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/states', {
        stateName,
        stateCode,
        status
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add New State</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stateName">State Name:</label>
          <input
            type="text"
            id="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stateCode">State Code:</label>
          <input
            type="text"
            id="stateCode"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStateForm;
