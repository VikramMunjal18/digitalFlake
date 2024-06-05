import React, { useEffect, useState } from "react";
import "./WarehouseTable.css";
import axios from "axios";
import WarehouseModal from "./WarehouseModal";

const ListOfWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5006/api/warehouses"
        );
        console.log("response", response);
        setWarehouses(response.data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleAddWarehouse = async (newWarehouse) => {
    console.log(newWarehouse, "new wearhouse");
    try {
      const response = await axios.post(
        "http://localhost:5006/api/warehouses",
        newWarehouse
      );
      setWarehouses([...warehouses, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding warehouse:", error);
    }
  };

  const handleDeleteWarehouse = async (warehouseId) => {
    try {
      await axios.delete(`http://localhost:5006/api/warehouses/${warehouseId}`);
      setWarehouses(
        warehouses.filter((warehouse) => warehouse._id !== warehouseId)
      );
    } catch (error) {
      console.error("Error deleting warehouse:", error);
    }
  };

  const handleUpdateWarehouse = async (updatedWarehouse) => {
    console.log("updatedWarehouse", updatedWarehouse, warehouses);
    try {
      const response = await axios.put(
        `http://localhost:5006/api/warehouses/${updatedWarehouse._id}`,
        updatedWarehouse
      );
      setWarehouses(
        warehouses.map((warehouse) =>
          warehouse._id === updatedWarehouse._id ? response.data : warehouse
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating warehouse:", error);
    }
  };

  const handleEditWarehouse = (id) => {
    setCurrentWarehouse(id);
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <button
        className="add-new-btn"
        onClick={() => {
          setCurrentWarehouse(null);
          setIsModalOpen(true);
        }}
      >
        Add New Warehouse
      </button>
      <WarehouseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={currentWarehouse ? handleUpdateWarehouse : handleAddWarehouse}
        currentWarehouse={currentWarehouse}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>State</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse, idx) => (
            <tr key={warehouse._id}>
              {
                console.log(warehouse.state.stateName,"warehouse")
              }
              <td>{idx + 1}</td>
              <td>{warehouse.name}</td>
              <td>{warehouse?.state?.stateName}</td>
              <td>{warehouse.city}</td>
              <td
                className={
                  warehouse.status === "Active"
                    ? "active-status"
                    : "inactive-status"
                }
              >
                {warehouse.status}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditWarehouse(warehouse)}
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteWarehouse(warehouse._id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfWarehouses;
