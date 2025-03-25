// src/pages/Admin.jsx
import { useState } from "react";
import { createRace } from "../services/raceService";
import PageWrapper from "../components/PageWrapper";
import "../styles/admin.css";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    drivers: [],
  });

  const [driverInput, setDriverInput] = useState({ name: "", team: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDriverChange = (e) => {
    setDriverInput({ ...driverInput, [e.target.name]: e.target.value });
  };

  const addDriver = () => {
    if (driverInput.name && driverInput.team) {
      setFormData({
        ...formData,
        drivers: [...formData.drivers, driverInput],
      });
      setDriverInput({ name: "", team: "" });
    }
  };

  const removeDriver = (index) => {
    const newDrivers = [...formData.drivers];
    newDrivers.splice(index, 1);
    setFormData({ ...formData, drivers: newDrivers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Log form data before submission
    console.log("Submitting race:", formData);

    const result = await createRace(formData);
    if (result.success) {
      setMessage("✅ Race added successfully!");
      setFormData({ name: "", location: "", date: "", drivers: [] });
    } else {
      setMessage("❌ Failed to add race. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <div className="admin-container">
        <h2>Add New Race</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="name"
            placeholder="Race Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <div className="driver-section">
            <h3>Drivers</h3>
            <div className="driver-inputs">
              <input
                type="text"
                name="name"
                placeholder="Driver Name"
                value={driverInput.name}
                onChange={handleDriverChange}
              />
              <input
                type="text"
                name="team"
                placeholder="Team"
                value={driverInput.team}
                onChange={handleDriverChange}
              />
              <button type="button" onClick={addDriver}>
                + Add Driver
              </button>
            </div>
            <ul className="driver-list-preview">
              {formData.drivers.map((driver, index) => (
                <li key={index}>
                  {driver.name} – {driver.team}
                  <button type="button" onClick={() => removeDriver(index)}>
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit">Add Race</button>
          {message && <p className="admin-message">{message}</p>}
        </form>
      </div>
    </PageWrapper>
  );
};

export default Admin;
