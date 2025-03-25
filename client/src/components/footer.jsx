// src/components/Footer.jsx
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>F1 Race Tracker</h3>
        <p>
          Track your favorite races, follow teams, and stay in pole position 🏎️
        </p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} F1 Race Tracker. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
