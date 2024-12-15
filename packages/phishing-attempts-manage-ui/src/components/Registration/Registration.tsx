import React, { useState } from "react";
import { authService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Registration: React.FC = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await authService.registerUser(username, email, password);
			alert("Registration successful!");
		} catch (error) {
			console.error(error);
		}
	};

	const gotoLogin = async () => {
		navigate("/login");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<form onSubmit={handleRegister} className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
						Register
					</button>
					<button
						type="button"
						className="w-full border border-gray-300 text-gray-800 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={gotoLogin}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Registration;
