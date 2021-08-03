const Koa = require("koa");
const http = require("http");
const ApiRouter = require("./api-router.js");
const staticContentRouter = require("./static-content-router.js");
const websocket = require("./websocket.js");
const AnimationController = require("./animation-controller");
const port = process.env.PORT || 3002;

// Setup application, server, and websockets
const app = new Koa();
const server = http.createServer(app.callback())
const io = websocket(server);
const controller = new AnimationController(io);

// Register routes
const api = new ApiRouter(controller);
app.use(api.routes()).use(api.allowedMethods());
app.use(staticContentRouter.routes()).use(staticContentRouter.allowedMethods());

// Start listening for requests
server.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});