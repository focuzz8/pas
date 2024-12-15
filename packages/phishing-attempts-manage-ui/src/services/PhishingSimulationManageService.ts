import axios, { AxiosInstance } from "axios";

export interface PhishingSimulationAttempt {
	_id: string;
	recipientEmail: string;
	subject: string;
	body: string;
	status: string;
}

class PhishingSimulationManageService {
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

	fetchPhishingAttempts = async (): Promise<PhishingSimulationAttempt[]> => {
		try {
			const response = await this.axiosInstance.get("/phishing/attempts");
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
}

export const phishingSimulationManageService = new PhishingSimulationManageService();
