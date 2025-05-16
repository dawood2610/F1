import { useState } from "react";
import ManageRaces from "./admin/ManageRaces";
import ManageTeams from "./admin/ManageTeams";
import ManageDrivers from "./admin/ManageDrivers";
import PageWrapper from "../components/PageWrapper";
import "../styles/admin.css";

const Admin = () => {
	const [section, setSection] = useState("races");

	return (
		<PageWrapper>
			<div className="admin-dashboard">
				<h1>Admin Dashboard</h1>

				<div className="admin-tabs">
					<button onClick={() => setSection("races")}>Races</button>
					<button onClick={() => setSection("teams")}>Teams</button>
					<button onClick={() => setSection("drivers")}>Drivers</button>
				</div>

				<div className="admin-section">
					{section === "races" && <ManageRaces />}
					{section === "teams" && <ManageTeams />}
					{section === "drivers" && <ManageDrivers />}
				</div>
			</div>
		</PageWrapper>
	);
};

export default Admin;
