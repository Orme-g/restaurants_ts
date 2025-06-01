import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import autoprefixer from "autoprefixer";

export default defineConfig({
    assetsInclude: ["**/*.JPG"],
    base: "/",
    plugins: [react(), svgr()],
    css: {
        postcss: {
            plugins: [
                autoprefixer({}), // add options if needed
            ],
        },
    },
});
