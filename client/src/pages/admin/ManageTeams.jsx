import { useState, useEffect } from "react";
import {
	createTeam,
	getTeams,
	deleteTeam,
	updateTeam,
} from "../../services/teamService";
import "../../styles/admin.css";

const ManageTeams = () => {
	const [teams, setTeams] = useState([]);
	const [formData, setFormData] = useState({ name: "" });
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		loadTeams();
	}, []);

	const loadTeams = async () => {
		const data = await getTeams();
		setTeams(data || []);
	};

	const handleChange = (e) => {
		setFormData({ name: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEditing) {
				await updateTeam(editId, formData);
				setMessage("✅ Team updated!");
			} else {
				await createTeam(formData);
				setMessage("✅ Team created!");
			}
			setFormData({ name: "" });
			setIsEditing(false);
			setEditId(null);
			loadTeams();
		} catch (err) {
			console.error("Error saving team:", err); // ✅ use the variable
			setMessage("❌ Failed to save team.");
		}
	};

	const handleEdit = (team) => {
		setFormData({ name: team.name });
		setEditId(team._id);
		setIsEditing(true);
	};

	const handleDelete = async (id) => {
		await deleteTeam(id);
		loadTeams();
	};

	return (
		<div className="admin-container">
			<h2>{isEditing ? "Edit Team" : "Add New Team"}</h2>
			<form
				onSubmit={handleSubmit}
				className="admin-form"
			>
				<input
					type="text"
					name="name"
					placeholder="Team Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<button type="submit">{isEditing ? "Update" : "Add"} Team</button>
				{message && <p className="admin-message">{message}</p>}
			</form>

			<ul className="driver-list-preview">
				{teams.map((team) => (
					<li key={team._id}>
						{team.name}
						<div>
							<button onClick={() => handleEdit(team)}>✏️</button>
							<button onClick={() => handleDelete(team._id)}>🗑️</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageTeams;
