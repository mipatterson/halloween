(function (win, communication, http, eye, lock) {
	const api = {
		communication,
		eye,
	};

	communication.onConnect(() => {
		communication.send("register", {
			side: eye.side,
		});
	});

	http.getState().then(state => {
		console.log("Initial state", state);
		eye.setStyle(state.style);
		if (state.enabled) {
			eye.show();
		}
		lock.lock();
	});

	communication.on("enable", d => {
		console.log("Enabled.");
		eye.show();
	});

	communication.on("disable", d => {
		console.log("Disabled.");
		eye.hide();
	});

	communication.on("blink", () => {
		eye.blink();
	});

	communication.on("open", () => {
		eye.open();
	});

	communication.on("close", () => {
		eye.close();
	});

	communication.on("style", d => {
		console.log(`Style updated to "${d.style}"`);
		eye.setStyle(d.style);
	});

	win.app = api;
}(window, communicationApi, httpApi, eyeApi, lockApi))