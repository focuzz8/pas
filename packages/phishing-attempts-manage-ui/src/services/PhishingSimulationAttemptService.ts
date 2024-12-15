import axios, { AxiosInstance } from "axios";

class PhishingSimulationAttemptService {
	private readonly axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({ baseURL: import.meta.env.VITE_APP_MANAGE_API_URL });
		this.axiosInstance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem("access_token");
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
	}

	sendPhishingEmail = async (email: string, subject: string, body: string) => {
		try {
			const response = await this.axiosInstance.post("/phishing/create", { email, subject, body });
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
}

export const phishingSimulationAttemptService = new PhishingSimulationAttemptService();
