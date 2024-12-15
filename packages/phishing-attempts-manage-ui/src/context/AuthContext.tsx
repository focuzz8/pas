import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	defaultAuthorizedUrl: string;
	defaultUnauthorizedUrl: string;
	login: (jwt: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	defaultAuthorizedUrl: "",
	defaultUnauthorizedUrl: "",
	login: () => {},
	logout: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
	defaultAuthorizedUrl: string;
	defaultUnauthorizedUrl: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
	const [token, setToken] = useState<string | null>(() => {
		const storedToken = localStorage.getItem("access_token");
		return storedToken || null;
	});

	const login = (jwt: string) => {
		try {
			setToken(jwt);
			localStorage.setItem("access_token", jwt);
			window.history.pushState(null, "", props.defaultAuthorizedUrl);
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const logout = () => {
		try {
			setToken(null);
			localStorage.removeItem("access_token");
			window.history.pushState(null, "", props.defaultUnauthorizedUrl);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	useEffect(() => {
		if (token) {
			console.log("Token was set, redirecting to default authorized URL");
			window.history.pushState(null, "", props.defaultAuthorizedUrl);
		} else {
			console.log("Token was unset, redirecting to default unauthorized URL");
			window.history.pushState(null, "", props.defaultUnauthorizedUrl);
		}
	}, [token, props.defaultAuthorizedUrl, props.defaultUnauthorizedUrl]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!token,
				defaultAuthorizedUrl: props.defaultAuthorizedUrl,
				defaultUnauthorizedUrl: props.defaultUnauthorizedUrl,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
