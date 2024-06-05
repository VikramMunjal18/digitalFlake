//frontend/src/components/ListOfStates.js
import React, { useEffect, useState } from 'react';
import './StateTable.css';
import axios from 'axios';
import StateModal from './StateModal';

const ListOfStates = () => {
  const [states, setStates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentState, setCurrentState] = useState(null);

  // console.log(currentState,"currentState");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:5006/api/states');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);
  // useEffect(() => {
  //   const fetchStates = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/states');
  //       setStates(response.data);
  //     } catch (error) {
  //       console.error('Error fetching states:', error);
  //     }
  //   };

  //   fetchStates();
  // }, []);

  const handleAddState = async (newState) => {
    try {
      const response = await axios.post('http://localhost:5006/api/states', newState);
      setStates([...states, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding state:', error);
    }
  };


  const handleDeleteState = async (stateId) => {
    try {
      await axios.delete(`http://localhost:5006/api/states/${stateId}`);
      setStates(states.filter((state) => state._id !== stateId));
    } catch (error) {
      console.error('Error deleting state:', error);
      
    }
  };

  const handleUpdateState = async (updatedState) => {
    try {
      const response = await axios.put(`http://localhost:5006/api/states/${updatedState._id}`, updatedState);
      console.log(response,"response");
      setStates(states.map(state => (state._id === updatedState._id ? response.data : state)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };
  const handleEditState = (id) => {
    setCurrentState(id);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <button className="add-new-btn" onClick={() => {
        setCurrentState(null);
        setIsModalOpen(true);
      }}>Add New State</button>
      <StateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={currentState ? handleUpdateState : handleAddState}
        currentState={currentState}
      />
     

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>State Name</th>
            <th>State Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state, idx) =>
           (
            <tr key={state.id}>          
              <td>{idx + 1}</td>
              <td>{state.stateName}</td>
              <td>{state.stateCode}</td>
              <td className={state.status === 'Active' ? 'active-status' : 'inactive-status'}>
                {state.status}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEditState(state)}>✏️</button>

                <button className="delete-btn" onClick={() => handleDeleteState(state._id)}>🗑️</button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfStates;
