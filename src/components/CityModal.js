// frontend/src/components/CityModal.js
import React, { useEffect, useState } from "react";
import "./CityTable.css";
import axios from "axios";

const CityModal = ({ isOpen, onClose, onSave, currentCity }) => {
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [stateName, setStateName] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (currentCity) {
      setCityName(currentCity.cityName);
      setCityCode(currentCity.cityCode);
      setStateName(currentCity.state.stateName);
      setStatus(currentCity.status);
    } else {
      setCityName("");
      setCityCode("");
      setStateName("");
      setStatus("Active");
    }
  }, [currentCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(currentCity);
    const cityData = {
      cityName,
      cityCode,
      stateName,
      status,
      _id: currentCity?._id,
      stateId: currentCity?.state?._id,
    };
    onSave(cityData);
  };

  // const getAllState = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:5006/api/getAllStates"
  //     );
  //     console.log("aa", response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("hh");
  //   getAllState();
  // }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{currentCity ? "Edit City" : "Add New City"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cityName">City Name</label>
            <input
              type="text"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cityCode">City Code</label>
            <input
              type="text"
              id="cityCode"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="modal-buttons">
            <button type="submit">{currentCity ? "Update" : "Save"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <h2>{currentCity ? 'Edit City' : 'Add New City'}</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label>City Name</label>
    //         <input
    //           type="text"
    //           value={cityName}
    //           onChange={(e) => setCityName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label>City Code</label>
    //         <input
    //           type="text"
    //           value={cityCode}
    //           onChange={(e) => setCityCode(e.target.value)}
    //           required
    //         />
    //       </div>
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
    //         <label>Status</label>
    //         <select value={status} onChange={(e) => setStatus(e.target.value)}>
    //           <option value="Active">Active</option>
    //           <option value="Inactive">Inactive</option>
    //         </select>
    //       </div>
    //       <div className="modal-buttons">
    //         <button type="submit">{currentCity ? 'Update' : 'Save'}</button>
    //         <button type="button" onClick={onClose}>Cancel</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CityModal;
