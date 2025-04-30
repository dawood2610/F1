// src/pages/Races.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRaces } from "../services/raceService";
import PageWrapper from "../components/PageWrapper";
import "../styles/races.css";

const Races = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRaces = async () => {
      setLoading(true);
      const data = await getRaces();
      setRaces(data);
      setLoading(false);
    };

    fetchRaces();

    const handleScroll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const visible = 150;
        if (top < window.innerHeight - visible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredRaces = races.filter(
    (race) =>
      race.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      race.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="races-container">
        <div className="wave-top">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"
              fill="#111"
            />
          </svg>
        </div>

        <div className="races-header reveal fade-in">
          <h2 className="races-title">All Formula 1 Races</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search races..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading exciting races...</p>
          </div>
        ) : races.length === 0 ? (
          <div className="no-races-message reveal fade-up">
            <p>No races available.</p>
          </div>
        ) : (
          <>
            <div className="race-counter reveal fade-up">
              <span>{filteredRaces.length} races found</span>
            </div>
            <div className="races-list">
              {filteredRaces.map((race, index) => (
                <Link
                  to={`/races/${race._id}`}
                  key={race._id}
                  className={`race-card-link reveal fade-up card-${index + 1}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="race-detail-card">
                    <div className="race-card-flag"></div>
                    <div className="race-card-content">
                      <h3>{race.name}</h3>
                      <div className="race-info-grid">
                        <div className="race-info-item">
                          <div className="info-icon date-icon"></div>
                          <div className="info-text">
                            <span className="info-label">Date</span>
                            <span className="info-value">
                              {new Date(race.date).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="race-info-item">
                          <div className="info-icon location-icon"></div>
                          <div className="info-text">
                            <span className="info-label">Location</span>
                            <span className="info-value">{race.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="race-status">
                        {new Date(race.date) > new Date() ? (
                          <span className="status upcoming">Upcoming</span>
                        ) : (
                          <span className="status completed">Completed</span>
                        )}
                      </div>
                    </div>
                    <div className="view-details">
                      <span>View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default Races;
