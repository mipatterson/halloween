const Basic = require("./modes/basic.js");

const state = {
	enabled: true,
	open: true,
	mode: "monster",
	style: "monster",
	blinkInterval: 3000,
	leftSockets: [],
	rightSockets: [],
};

module.exports = function (io) {
	const SPEED = {
		SLOW: 3000,
		NORMAL: 1000,
		FAST: 500,
		IMMEDIATE: 0,
	};

	function blink(options) {
		state.open = undefined;
		io.sockets.emit("blink", {
			type: options ? (options.type || "single") : "single",
			speed: options ? (options.speed === undefined ? SPEED.NORMAL : options.speed) : SPEED.NORMAL,
		});
	}

	function open(speed = SPEED.NORMAL) {
		state.open = true;
		io.sockets.emit("open", {
			speed,
		});
	}

	function close(speed = SPEED.NORMAL) {
		state.open = false;
		io.sockets.emit("close", {
			speed,
		});
	}

	function setStyle(style) {
		state.style = style;
		io.sockets.emit("style", {
			style,
		})
	}

	const animationApi = {
		blink,
		open,
		close,
		setStyle,
		SPEED,
	};

	// Setup animation modes
	const modes = {
		basic: new Basic(animationApi, { style: "basic", interval: state.blinkInterval }),
		basicred: new Basic(animationApi, { style: "red", interval: state.blinkInterval }),
		monster: new Basic(animationApi, { style: "monster", interval: state.blinkInterval }),
		monsterpurple: new Basic(animationApi, { style: "monsterpurple", interval: state.blinkInterval })
	};
	state.mode = "monster";
	modes[state.mode].start();

	function setMode(mode) {
		modes[state.mode].stop();
		modes[mode].start();
		state.mode = mode;
		io.sockets.emit("mode", {
			mode,
		});
	}

	function enable() {
		if (state.enabled) {
			return;
		}

		state.enabled = true;
		io.sockets.emit("enable");
		modes[state.mode].start();
	}

	function disable() {
		if (!state.enabled) {
			return;
		}

		state.enabled = false;
		io.sockets.emit("disable");
		modes[state.mode].stop();
	}

	// Handle connections
	io.on("connection", socket => {
		console.log(`Client ${socket.id} connected.`);

		// Handle registrations
		socket.on("register", data => {
			console.log(`Client ${socket.id} registered with side ${data.side}.`);
			if (data.side === "left") {
				state.leftSockets.push(socket);
			} else if (data.side === "right") {
				state.rightSockets.push(socket);
			}
		});

		// Handle disconnections
		socket.on("disconnect", () => {
			console.log(`Client ${socket.id} disconnected.`);
			state.leftSockets = state.leftSockets.filter(s => s !== socket);
			state.rightSockets = state.rightSockets.filter(s => s !== socket);
		});
	});

	function getState() {
		return {
			enabled: state.enabled,
			mode: state.mode,
			style: state.style,
			blinkInterval: state.blinkInterval,
			leftConnections: state.leftSockets.length,
			rightConnections: state.rightSockets.length,
		};
	}
	
	return {
		getState,
		enable,
		disable,
		setMode,
	};
};