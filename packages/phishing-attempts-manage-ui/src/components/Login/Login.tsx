import React, { useState } from "react";
import { authService } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const auth = useAuthContext();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await authService.loginUser(email, password);
			auth.login(response.access_token);
		} catch (error) {
			console.error(error);
		}
	};

	const gotoRegister = async () => {
		navigate("/register");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<form onSubmit={handleLogin} className="space-y-4">
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
						Login
					</button>
					<button
						type="button"
						className="w-full border border-gray-300 text-gray-800 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						onClick={gotoRegister}
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
