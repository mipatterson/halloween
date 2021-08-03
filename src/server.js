const Koa = require("koa");
const http = require("http");
const socketio = require("socket.io");
const send = require("koa-send");
const path = require("path");

const port = process.env.PORT || 3002;

const app = new Koa();
const server = http.createServer(app.callback())
const io = socketio(server);

let leftSocket;
let rightSocket;

// Get koa-send options
function getSendOptions(customPath) {
	let dirPath = customPath || "/client";
	return {
		root: path.join(__dirname, dirPath),
	};
}

// Setup koa middleware
app.use(ctx => {
	if (ctx.path === "/status") {
		ctx.body = "ok";
		return;
	} else if (["/eye/left", "/eye/right"].includes(ctx.path)) {
		return send(ctx, "index.html", getSendOptions());
	} else if (ctx.path === "/eye/websocket.js") {
		return send(ctx, "socket.io.js", getSendOptions("../node_modules/socket.io/client-dist"));
	} else {
		return send(ctx, ctx.path.replace("/eye/", ""), getSendOptions());
	}
});

io.on("connection", (socket) => {
	console.log(`Client ${socket.id} connected.`);
	socket.on("register", (data) => {
		console.log(`Client ${socket.id} registered with side ${data.side}.`);
		if (data.side === "left") {
			if (leftSocket) {
				leftSocket.disconnect();
			}
	
			leftSocket = socket;
		} else if (data.side === "right") {
			if (rightSocket) {
				rightSocket.disconnect();
			}
	
			rightSocket = socket;
		}
	});
});

function blink() {
	if (leftSocket) {
		leftSocket.emit("blink");
	}

	if (rightSocket) {
		rightSocket.emit("blink");
	}
}

function setStyle(style) {
	if (leftSocket) {
		leftSocket.emit("set_style", {
			style,
		});
	}

	if (rightSocket) {
		rightSocket.emit("set_style", {
			style,
		});
	}
}

setInterval(() => {
	blink();
}, 5000);

let style = "basic";
setInterval(() => {
	if (style === "basic") {
		style = "red";
	} else {
		style = "basic";
	}
	setStyle(style);
}, 15000);

// Start server
server.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});