import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_CLERK_PUBLISHABLE_KEY": JSON.stringify(
        env.REACT_APP_CLERK_PUBLISHABLE_KEY,
      ),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "@widgets": path.resolve("src/widgets"),
        "@features": path.resolve("src/features"),
        "@entities": path.resolve("src/entities"),
      },
    },
  };
});
