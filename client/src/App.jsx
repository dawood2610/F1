// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Races from "./pages/Races";
import Admin from "./pages/Admin";
import About from "./pages/About";
import RaceDetails from "./pages/RaceDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import "./styles/app.css";

const App = () => {
	const location = useLocation();

	return (
		<div className="app-layout">
			<Navbar />
			<main className="app-main">
				<AnimatePresence mode="wait">
					<Routes
						location={location}
						key={location.pathname}
					>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/races"
							element={<Races />}
						/>
						<Route
							path="/admin"
							element={<Admin />}
						/>
						<Route
							path="/races/:id"
							element={<RaceDetails />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/about"
							element={<About />}
						/>
						<Route
							path="/register"
							element={<Register />}
						/>
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<Admin />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</AnimatePresence>
			</main>
			<Footer />
		</div>
	);
};

export default App;
