import { defineConfig } from "@farmfe/core";
import compress from "koa-compress";

export default defineConfig({
	plugins: ["@farmfe/plugin-react"],
	clearScreen: false,
	server: { middlewares: [() => compress()] },
});
