(function (win) {
	let socket;
	let connectHandlers = [];

	const api = {
		connected: false,
	};

	// Initiate connection
	console.log("Establishing web socket connection...");
	socket = win.io();

	// Handle connection success
	socket.on("connect", () => {
		api.connected = true;
		api.connectionId = socket.id;
		console.log(`Connected as ${socket.id}`);

		// Invoke connection handlers
		for (let i = 0; i < connectHandlers.length; i++) {
			try {
				connectHandlers[i]();
			} catch (e) {
				console.error("Connect handler failed.\n", e);
			}
		}
	});

	// Handle disconnection
	socket.on("disconnect", () => {
		api.connected = false;
		api.connectionId = undefined;
		console.error("Disconnected.");
	});

	// Handle connection errors
	socket.on("connect_error", () => {
		api.connected = false;
		api.connectionId = undefined;
		console.error("Connection failed.");
	});

	// API for registering connection handlers
	api.onConnect = function(handler) {
		if (api.connected) {
			handler();
		} else {
			connectHandlers.push(handler);
		}
	}

	// API for registering event handlers
	api.on = function(eventName, handler) {
		socket.on(eventName, handler);
	};

	// API for sending messages
	api.send = function(eventName, payload) {
		if (!api.connected) {
			return;
		}

		socket.emit(eventName, payload);
	}

	win.communicationApi = api;
}(window))