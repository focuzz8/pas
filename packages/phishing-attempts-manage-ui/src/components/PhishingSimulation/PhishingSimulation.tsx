import React, { useState, useEffect } from "react";
import { phishingSimulationManageService, PhishingSimulationAttempt } from "../../services/PhishingSimulationManageService";
import { phishingSimulationAttemptService } from "../../services/PhishingSimulationAttemptService";
import { useAuthContext } from "../../context/AuthContext";

const PhishingSimulation: React.FC = () => {
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [attempts, setAttempts] = useState<PhishingSimulationAttempt[]>([]);
	const [refreshTS, setRefreshTS] = useState(new Date().getUTCMilliseconds());
	const auth = useAuthContext();

	const handleSendPhishing = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await phishingSimulationAttemptService.sendPhishingEmail(email, subject, body);
		} catch (error) {
			console.error(error);
		} finally {
			setRefreshTS(new Date().getUTCMilliseconds());
		}
	};

	const handleLogout = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			auth.logout();
		} catch (error) {
			console.error(error);
		}
	};

	const handleRefresh = () => {
		setRefreshTS(new Date().getUTCMilliseconds());
	};

	useEffect(() => {
		const fetchAttempts = async () => {
			const attempts = await phishingSimulationManageService.fetchPhishingAttempts();
			setAttempts(attempts);
		};
		fetchAttempts();
	}, [auth.isAuthenticated, refreshTS]);

	return (
		<div className="flex items-top justify-center min-h-screen bg-gray-100 h-full">
			<div className="flex h-full w-full max-w-7xl">
				<div className="bg-white p-8 rounded shadow-md w-96 h-full">
					<form onSubmit={handleSendPhishing} className="space-y-4 h-full">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							placeholder="Subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<textarea
							placeholder="Body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							rows={4}
						/>
						<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200">
							Send Phishing Email
						</button>
						<button
							type="button"
							className="w-full border border-gray-300 text-gray-800 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							onClick={handleLogout}
						>
							Log out
						</button>
					</form>
				</div>
				<div className="bg-white p-8 rounded shadow-md flex-1 h-full">
					<div className="flex justify-end mb-4">
						<button
							type="button"
							className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
							onClick={handleRefresh}
						>
							Refresh
						</button>
					</div>
					<table className="w-full text-left h-full">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								<th className="px-4 py-3">Email</th>
								<th className="px-4 py-3">Subject</th>
								<th className="px-4 py-3">Body</th>
								<th className="px-4 py-3">Status</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light h-full">
							{attempts.map((attempt) => (
								<tr key={attempt._id} className="border-b border-gray-200 hover:bg-gray-100">
									<td className="px-4 py-3">{attempt.recipientEmail}</td>
									<td className="px-4 py-3">{attempt.subject}</td>
									<td className="px-4 py-3">{attempt.body}</td>
									<td className="px-4 py-3">{attempt.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PhishingSimulation;
