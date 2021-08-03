const Router = require("@koa/router");
const send = require("koa-send");
const path = require("path");

// Get koa-send options
function getSendOptions(customPath) {
	let dirPath = customPath || "../client";
	return {
		root: path.join(__dirname, dirPath),
	};
}

// Setup static content routes
const staticContentRouter = new Router();

staticContentRouter.get("/", async (ctx, next) => {
	await send(ctx, "controller.html", getSendOptions());
	await next();
});

staticContentRouter.get("/left", async (ctx, next) => {
	console.log("left");
	await send(ctx, "eye.html", getSendOptions());
	await next();
});

staticContentRouter.get("/right", async (ctx, next) => {
	await send(ctx, "eye.html", getSendOptions());
	await next();
});

staticContentRouter.get("/controller/:filename", async (ctx, next) => {
	await send(ctx, ctx.params.filename, getSendOptions("../client/controller"));
	await next();
});

staticContentRouter.get("/eye/:filename", async (ctx, next) => {
	await send(ctx, ctx.params.filename, getSendOptions("../client/eye"));
	await next();
});

staticContentRouter.get("/eye/styles/:filename", async (ctx, next) => {
	await send(ctx, ctx.params.filename, getSendOptions("../client/eye/styles"));
	await next();
});

staticContentRouter.get("/shared/:filename", async (ctx, next) => {
	if (ctx.params.filename === "websocket.js") {
		await send(ctx, "socket.io.js", getSendOptions("../../node_modules/socket.io/client-dist"));
		await next();
	} else {
		await send(ctx, ctx.params.filename, getSendOptions("../client/shared"));
		await next();
	}
});

module.exports = staticContentRouter;