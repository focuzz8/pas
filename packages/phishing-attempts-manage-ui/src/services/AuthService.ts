import axios, { AxiosInstance } from "axios";

class AuthService {
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

	registerUser = async (username: string, email: string, password: string) => {
		try {
			const response = await this.axiosInstance.post("/user/register", { username, email, password });
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	loginUser = async (email: string, password: string) => {
		try {
			const response = await this.axiosInstance.post("/auth/login", { email, password });
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};
}

export const authService = new AuthService();
