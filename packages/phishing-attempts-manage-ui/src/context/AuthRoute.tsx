import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface AuthRouteProps {
	children: React.ReactNode;
	access: "always" | "authenticated" | "unauthenticated";
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children, access }) => {
	const { isAuthenticated, defaultAuthorizedUrl, defaultUnauthorizedUrl } = useAuthContext();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (access === "always") return;

		if (access === "authenticated" && !isAuthenticated) {
			navigate(defaultUnauthorizedUrl, { replace: true, state: { from: location } });
		}

		if (access === "unauthenticated" && isAuthenticated) {
			navigate(defaultAuthorizedUrl, { replace: true });
		}
	}, [access, isAuthenticated, defaultAuthorizedUrl, defaultUnauthorizedUrl, navigate, location]);

	return <>{children}</>;
};
