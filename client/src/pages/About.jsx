// src/pages/About.jsx
import PageWrapper from "../components/PageWrapper";
import "../styles/about.css";

const About = () => {
	return (
		<PageWrapper>
			<div className="about-container reveal fade-up">
				<div className="about-header">
					<h2>About the App</h2>
					<p>
						F1 Race Tracker is a real-time Formula 1 companion app that lets you
						follow upcoming races, view driver and track details, and stay
						up-to-date with the championship season. Built with passion for
						speed, precision, and performance.
					</p>
				</div>

				<div className="creator-section">
					<h3>Created By</h3>
					<div className="creator-card">
						<img
							src="/images/pic.JPG"
							alt="Muhammad Dawood"
							className="creator-avatar"
						/>
						<div className="creator-info">
							<h4>Muhammad Dawood</h4>
							<p>BSCS Student - COMSATS University</p>
							<p>
								<strong>Roll No:</strong> SP22-BCS-056
							</p>
							<p>
								This project is developed as part of a web development practice
								demonstrating full-stack MERN skills with racing-inspired UI.
							</p>
						</div>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default About;
