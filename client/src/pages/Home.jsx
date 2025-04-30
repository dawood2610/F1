import { useEffect, useState } from "react";
import { getRaces } from "../services/raceService";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import "../styles/home.css";

const Home = () => {
  const [upcomingRaces, setUpcomingRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingRaces = async () => {
      try {
        setIsLoading(true);
        const allRaces = await getRaces();
        const now = new Date();
        const filtered = allRaces
          .filter((race) => new Date(race.date) > now)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3); // Show 3 upcoming races instead of 2
        setUpcomingRaces(filtered);
      } catch (error) {
        console.error("Failed to fetch races:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingRaces();

    // Add scroll animation handler
    const handleScroll = () => {
      const elements = document.querySelectorAll(".reveal");

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date for better display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Format time for countdown
  const timeUntilRace = (dateString) => {
    const race = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(race - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 1 ? "Tomorrow" : `In ${diffDays} days`;
  };

  return (
    <PageWrapper>
      <div className="home-container">
        <section className="hero-section">
          <div className="racing-line"></div>
          <div className="hero-content">
            <div className="hero-overlay reveal fade-in">
              <h1 className="hero-title">
                <span className="hero-title-f1">F1</span> Race Tracker
              </h1>
              <p className="hero-subtitle">
                Follow every lap. Every race. In real-time.
              </p>
              <Link to="/races">
                <button className="cta-button">
                  <span>View Races</span>
                  <svg
                    className="arrow-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
          <div className="speed-lines">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="speed-line"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                }}
              ></div>
            ))}
          </div>
        </section>

        <section className="upcoming-races">
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
          <div className="races-content">
            <h2 className="section-title reveal fade-up">
              Next Up on the Grid
            </h2>

            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="race-cards">
                {upcomingRaces.length === 0 ? (
                  <p className="no-races reveal fade-up">
                    No upcoming races scheduled.
                  </p>
                ) : (
                  upcomingRaces.map((race, index) => (
                    <div
                      className={`race-card reveal fade-up card-${index + 1}`}
                      key={race._id}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="race-flag"></div>
                      <div className="race-content">
                        <div className="countdown-badge">
                          {timeUntilRace(race.date)}
                        </div>
                        <h3>{race.name}</h3>
                        <div className="race-details">
                          <div className="race-detail">
                            <svg
                              className="detail-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{formatDate(race.date)}</span>
                          </div>
                          <div className="race-detail">
                            <svg
                              className="detail-icon"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                            <span>{race.location}</span>
                          </div>
                        </div>
                        <Link to={`/races/${race._id}`} className="race-link">
                          View details
                          <svg
                            className="link-arrow"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.08"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>

        <section className="features-section reveal fade-up">
          <div className="feature">
            <div className="feature-icon">🏎️</div>
            <h3>Real-time Updates</h3>
            <p>
              Follow race progress as it happens with live timing data and
              position updates.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">🏆</div>
            <h3>Championship Stats</h3>
            <p>Track driver and constructor standings throughout the season.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📊</div>
            <h3>Performance Analytics</h3>
            <p>Dive into detailed race statistics and performance metrics.</p>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Home;
