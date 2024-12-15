import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	define: {
		"process.env": {},
	},
	envPrefix: "VITE_",
	plugins: [react()],
});