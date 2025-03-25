// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getRaces } from "../services/raceService";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "../styles/home.css";

const Home = () => {
  const [upcomingRaces, setUpcomingRaces] = useState([]);

  useEffect(() => {
    const fetchUpcomingRaces = async () => {
      const allRaces = await getRaces();
      const now = new Date();
      const filtered = allRaces
        .filter((race) => new Date(race.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2);
      setUpcomingRaces(filtered);
    };

    fetchUpcomingRaces();
  }, []);

  return (
    <PageWrapper>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-overlay">
            <h1 className="hero-title">F1 Race Tracker</h1>
            <p className="hero-subtitle">
              Follow every lap. Every race. In real-time.
            </p>
            <Link to="/races">
              <button className="cta-button">View Races</button>
            </Link>
          </div>
        </section>

        <section className="upcoming-races">
          <h2 className="section-title">Next Up on the Grid</h2>
          <div className="race-cards">
            {upcomingRaces.length === 0 ? (
              <p>No upcoming races scheduled.</p>
            ) : (
              upcomingRaces.map((race) => (
                <div className="race-card" key={race._id}>
                  <h3>{race.name}</h3>
                  <p>{new Date(race.date).toLocaleDateString()}</p>
                  <p>{race.location}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
