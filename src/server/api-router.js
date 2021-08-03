const Router = require("@koa/router");

module.exports = function (controller) {
	// Setup API routes
	const apiRouter = new Router({
		prefix: "/api",
	});

	apiRouter.get("/health", async (ctx, next) => {
		ctx.body = "healthy";
		await next();
	});

	apiRouter.get("/state", async (ctx, next) => {
		ctx.body = controller.getState();
		await next();
	});

	apiRouter.post("/enable", async (ctx, next) => {
		controller.enable();
		ctx.status = 200;
		await next();
	});

	apiRouter.post("/disable", async (ctx, next) => {
		controller.disable();
		ctx.status = 200;
		await next();
	});

	apiRouter.post("/mode/:mode", async (ctx, next) => {
		controller.setMode(ctx.params.mode);
		ctx.status = 200;
		await next();
	});

	apiRouter.post("/interval/:interval", async (ctx, next) => {
		controller.setInterval(parseInt(ctx.params.interval));
		ctx.status = 200;
		await next();
	});

	return apiRouter;
};