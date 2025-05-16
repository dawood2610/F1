import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import "../styles/navbar.css";

const Navbar = () => {
	const { admin, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
			<div className="navbar-racing-light left"></div>
			<div className="navbar-racing-light right"></div>

			<div className="navbar-container">
				<div className="navbar-logo">
					<NavLink
						to="/"
						className="logo-link"
					>
						<div className="logo-icon">🏎️</div>
						<div className="logo-text">
							<span className="f1-text">F1</span> Tracker
						</div>
					</NavLink>
				</div>

				<div
					className="navbar-toggle"
					onClick={toggleMobileMenu}
				>
					<div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
					<div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
					<div className={`toggle-bar ${mobileMenuOpen ? "open" : ""}`}></div>
				</div>

				<ul className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active-link" : ""}`
							}
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="link-text">Home</span>
							<span className="link-hover-effect"></span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/races"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active-link" : ""}`
							}
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="link-text">Races</span>
							<span className="link-hover-effect"></span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/about"
							className={({ isActive }) =>
								`nav-link ${isActive ? "active-link" : ""}`
							}
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="link-text">About</span>
							<span className="link-hover-effect"></span>
						</NavLink>
					</li>

					{admin && admin.isAdmin ? (
						<>
							<li>
								<NavLink
									to="/admin"
									className={({ isActive }) =>
										`nav-link admin-link ${isActive ? "active-link" : ""}`
									}
									onClick={() => setMobileMenuOpen(false)}
								>
									<span className="link-text">Admin</span>
									<span className="link-hover-effect"></span>
								</NavLink>
							</li>
							<li>
								<button
									className="logout-button"
									onClick={handleLogout}
								>
									<span className="button-text">Logout</span>
									<svg
										className="logout-icon"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M15 12H3.62"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</li>
						</>
					) : (
						<>
							<li className="auth-link">
								<NavLink
									to="/login"
									className={({ isActive }) =>
										`nav-link ${isActive ? "active-link" : ""}`
									}
									onClick={() => setMobileMenuOpen(false)}
								>
									<span className="link-text">Login</span>
									<span className="link-hover-effect"></span>
								</NavLink>
							</li>
							<li className="auth-link">
								<NavLink
									to="/register"
									className={({ isActive }) =>
										`nav-button signup-button ${
											isActive ? "active-button" : ""
										}`
									}
									onClick={() => setMobileMenuOpen(false)}
								>
									<span>Signup</span>
									<svg
										className="button-arrow"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3.5 12H20.33"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeMiterlimit="10"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>

			<div className="navbar-car-animation">🏎️</div>
		</nav>
	);
};

export default Navbar;
