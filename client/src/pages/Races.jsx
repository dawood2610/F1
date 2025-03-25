// src/pages/Races.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRaces } from "../services/raceService";
import PageWrapper from "../components/PageWrapper";
import "../styles/races.css";

const Races = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchRaces = async () => {
      const data = await getRaces();
      setRaces(data);
    };

    fetchRaces();
  }, []);

  return (
    <PageWrapper>
      <div className="races-container">
        <h2>All Formula 1 Races</h2>
        {races.length === 0 ? (
          <p>No races available.</p>
        ) : (
          <div className="races-list">
            {races.map((race) => (
              <Link
                to={`/races/${race._id}`}
                key={race._id}
                className="race-card-link"
              >
                <div className="race-detail-card">
                  <h3>{race.name}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(race.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {race.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Races;
