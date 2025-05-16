import { useState, useEffect } from "react";
import Select from "react-select";
import { createRace, getRaces } from "../../services/raceService";
import { getTeams } from "../../services/teamService";
import { getDrivers } from "../../services/driverService";
import "../../styles/admin.css";

const ManageRaces = () => {
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		date: "",
		teams: [],
		drivers: [],
	});

	const [teams, setTeams] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [races, setRaces] = useState([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		loadTeams();
		loadDrivers();
		loadRaces();
	}, []);

	const loadTeams = async () => {
		const data = await getTeams();
		setTeams(data || []);
	};

	const loadDrivers = async () => {
		const data = await getDrivers();
		setDrivers(data || []);
	};

	const loadRaces = async () => {
		const data = await getRaces();
		setRaces(data || []);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleTeamsChange = (selected) => {
		setFormData({ ...formData, teams: selected.map((item) => item.value) });
	};

	const handleDriversChange = (selected) => {
		setFormData({ ...formData, drivers: selected.map((item) => item.value) });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await createRace(formData);
			if (result.success) {
				setMessage("✅ Race added successfully!");
				setFormData({
					name: "",
					location: "",
					date: "",
					teams: [],
					drivers: [],
				});
				loadRaces();
			} else {
				setMessage("❌ Failed to add race.");
			}
		} catch (err) {
			console.error("Error creating race:", err);
			setMessage("❌ Error submitting form.");
		}
	};

	const handleDeleteRace = async (id) => {
		if (window.confirm("Are you sure you want to delete this race?")) {
			await fetch(`/api/races/${id}`, { method: "DELETE" });
			loadRaces();
		}
	};

	const teamOptions = teams.map((team) => ({
		value: team._id,
		label: team.name,
	}));

	const driverOptions = drivers.map((driver) => ({
		value: driver._id,
		label: `${driver.name} (${driver.team?.name || "No Team"})`,
	}));

	const customSelectStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "#222",
			borderColor: "#444",
			color: "#fff",
		}),
		menu: (provided) => ({
			...provided,
			backgroundColor: "#111",
			color: "#fff",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "#ff1e1e" : "#111",
			color: "#fff",
			cursor: "pointer",
		}),
		multiValue: (provided) => ({
			...provided,
			backgroundColor: "#333",
		}),
		multiValueLabel: (provided) => ({
			...provided,
			color: "#fff",
		}),
		multiValueRemove: (provided) => ({
			...provided,
			color: "#ff4d4d",
			":hover": {
				backgroundColor: "#ff1e1e",
				color: "#fff",
			},
		}),
		placeholder: (provided) => ({
			...provided,
			color: "#888",
		}),
		input: (provided) => ({
			...provided,
			color: "#fff",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#fff",
		}),
	};

	return (
		<div className="admin-container">
			<h2>Add New Race</h2>
			<form
				onSubmit={handleSubmit}
				className="admin-form"
			>
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

				<label>Teams Competing:</label>
				<Select
					isMulti
					options={teamOptions}
					onChange={handleTeamsChange}
					value={teamOptions.filter((t) => formData.teams.includes(t.value))}
					placeholder="Select teams..."
					styles={customSelectStyles}
				/>

				<label>Drivers Participating:</label>
				<Select
					isMulti
					options={driverOptions}
					onChange={handleDriversChange}
					value={driverOptions.filter((d) =>
						formData.drivers.includes(d.value)
					)}
					placeholder="Select drivers..."
					styles={customSelectStyles}
				/>

				<button type="submit">Add Race</button>
				{message && <p className="admin-message">{message}</p>}
			</form>

			<hr style={{ margin: "2rem 0", borderColor: "#333" }} />

			<h2>All Races</h2>
			<ul className="driver-list-preview">
				{races.map((race) => (
					<li key={race._id}>
						<div>
							<strong>{race.name}</strong> –{" "}
							{new Date(race.date).toLocaleDateString()}
							<br />
							<em>{race.location}</em>
							<br />
							<small>
								<strong>Teams:</strong>{" "}
								{(race.teams || []).map((t) => t.name).join(", ") || "—"}
							</small>
							<br />
							<small>
								<strong>Drivers:</strong>{" "}
								{(race.drivers || [])
									.map((d) => `${d.name} (${d.team?.name || "No Team"})`)
									.join(", ") || "—"}
							</small>
						</div>
						<button onClick={() => handleDeleteRace(race._id)}>🗑️</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ManageRaces;
