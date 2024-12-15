import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import PhishingSimulation from "./components/PhishingSimulation/PhishingSimulation";
import { AuthProvider } from "./context/AuthContext";
import { AuthRoute } from "./context/AuthRoute";
import "./index.css";

const App: React.FC = () => {
	return (
		<AuthProvider defaultAuthorizedUrl="/phishing" defaultUnauthorizedUrl="/login">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<AuthRoute access="always">
								<Navigate to="/login" replace />
							</AuthRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<AuthRoute access="unauthenticated">
								<Login />
							</AuthRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<AuthRoute access="unauthenticated">
								<Registration />
							</AuthRoute>
						}
					/>
					<Route
						path="/phishing"
						element={
							<AuthRoute access="authenticated">
								<PhishingSimulation />
							</AuthRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
