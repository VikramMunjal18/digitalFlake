// frontend/src/components/AddCityForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCityForm = () => {
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [stateName, setStateName] = useState("");
  // const [allState, setAllState] = useState()
  const [status, setStatus] = useState("Active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5006/api/cities", {
        cityName,
        cityCode,
        stateName,
        status,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h2>Add City</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cityName">City Name:</label>
          <input
            type="text"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cityCode">City Code:</label>
          <input
            type="text"
            id="cityCode"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stateName">State Name:</label>
          <input
            type="text"
            id="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          {/* <select
            id="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}
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

export default AddCityForm;
