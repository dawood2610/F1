import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRaceById } from "../services/raceService";
import PageWrapper from "../components/PageWrapper";
import "../styles/raceDetails.css";

const RaceDetails = () => {
	const { id } = useParams();
	const [race, setRace] = useState(null);

	useEffect(() => {
		const fetchRace = async () => {
			try {
				const data = await getRaceById(id);
				setRace(data);
			} catch (err) {
				console.error("Failed to fetch race:", err);
			}
		};

		fetchRace();
	}, [id]);

	if (!race) {
		return (
			<PageWrapper>
				<div className="race-details-container reveal fade-up">
					<p className="loading-text">Loading race details...</p>
				</div>
			</PageWrapper>
		);
	}

	return (
		<PageWrapper>
			<div className="race-details-container reveal fade-up">
				<h2>{race.name}</h2>
				<p>
					<strong>Date:</strong>{" "}
					{new Date(race.date).toLocaleDateString(undefined, {
						weekday: "long",
						year: "numeric",
						month: "short",
						day: "numeric",
					})}
				</p>
				<p>
					<strong>Location:</strong> {race.location}
				</p>

				{race.drivers && race.drivers.length > 0 && (
					<div className="race-drivers-section">
						<h3>Drivers Competing</h3>
						<ul className="driver-list">
							{race.drivers.map((driver, index) => (
								<li key={index}>
									<strong>{driver.name}</strong> –{" "}
									{driver.team?.name || "No Team"}
								</li>
							))}
						</ul>
					</div>
				)}

				<Link
					to="/races"
					className="back-button"
				>
					← Back to Races
				</Link>
			</div>
		</PageWrapper>
	);
};

export default RaceDetails;
