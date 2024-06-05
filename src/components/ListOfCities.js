// frontend/src/components/ListOfCities.js
import React, { useEffect, useState } from 'react';
import './StateTable.css';
import axios from 'axios';
import CityModal from './CityModal';

const ListOfCities = () => {
  const [cities, setCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);
  const handleAddCity = async (newCity) => {
    try {
      const response = await axios.post('http://localhost:5006/api/cities', newCity);
      setCities([...cities, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };
  const handleUpdateCity = async (updatedCity) => {
    try {
      const response = await axios.put(`http://localhost:5006/api/cities/${updatedCity._id}`, updatedCity);
      setCities(cities.map(city => (city._id === updatedCity._id ? response.data : city)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:5006/api/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);


  const handleDeleteCity = async (cityId) => {
    try {
      await axios.delete(`http://localhost:5006/api/cities/${cityId}`);
      setCities(cities.filter((city) => city._id !== cityId));
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };



  const handleEditCity = (city) => {
    setCurrentCity(city);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <button className="add-new-btn" onClick={() => {
        setCurrentCity(null);
        setIsModalOpen(true);
      }}>Add New City</button>
      <CityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={currentCity ? handleUpdateCity : handleAddCity}
        currentCity={currentCity}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>City Name</th>
            <th>City Code</th>
            <th>State Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, idx) => (
            <tr key={city._id}>
              <td>{idx + 1}</td>
              <td>{city.cityName}</td>
              {
                console.log(city)
              }
              <td>{city.cityCode}</td>
              <td>{city?.state?.stateName}</td>
              <td className={city.status === 'Active' ? 'active-status' : 'inactive-status'}>
                {city.status}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEditCity(city)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDeleteCity(city._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfCities;
