import { useState, useEffect } from "react";
import {
	getDrivers,
	createDriver,
	deleteDriver,
	updateDriver,
} from "../../services/driverService";
import { getTeams } from "../../services/teamService";
import "../../styles/admin.css";

const ManageDrivers = () => {
	const [drivers, setDrivers] = useState([]);
	const [teams, setTeams] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		team: "",
	});
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		loadDrivers();
		loadTeams();
	}, []);

	const loadDrivers = async () => {
		const data = await getDrivers();
		setDrivers(data || []);
	};

	const loadTeams = async () => {
		const data = await getTeams();
		setTeams(data || []);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEditing) {
				await updateDriver(editId, formData);
				setMessage("✅ Driver updated!");
			} else {
				await createDriver(formData);
				setMessage("✅ Driver created!");
			}
			setFormData({ name: "", team: "" });
			setIsEditing(false);
			setEditId(null);
			loadDrivers();
		} catch (err) {
			console.error("Error saving driver:", err);
			setMessage("❌ Failed to save driver.");
		}
	};

	const handleEdit = (driver) => {
		setFormData({ name: driver.name, team: driver.team._id });
		setEditId(driver._id);
		setIsEditing(true);
	};

	const handleDelete = async (id) => {
		await deleteDriver(id);
		loadDrivers();
	};

	return (
		<div className="admin-container">
			<h2>{isEditing ? "Edit Driver" : "Add New Driver"}</h2>
			<form
				onSubmit={handleSubmit}
				className="admin-form"
			>
				<input
					type="text"
					name="name"
					placeholder="Driver Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<select
					name="team"
					value={formData.team}
					onChange={handleChange}
					required
				>
					<option value="">Select Team</option>
					{teams.map((team) => (
						<option
							key={team._id}
							value={team._id}
						>
							{team.name}
						</option>
					))}
				</select>
				<button type="submit">{isEditing ? "Update" : "Add"} Driver</button>
				{message && <p className="admin-message">{message}</p>}
			</form>

			<ul className="driver-list-preview">
				{drivers.map((driver) => (
					<li key={driver._id}>
						{driver.name} – {driver.team?.name || "Unknown"}
						<div>
							<button onClick={() => handleEdit(driver)}>✏️</button>
							<button onClick={() => handleDelete(driver._id)}>🗑️</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageDrivers;
