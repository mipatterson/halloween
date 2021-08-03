(function (win, communication, eye) {
	const api = {
		communication,
		eye,
	};

	communication.onConnect(() => {
		communication.send("register", {
			side: eye.side,
		});
	});

	communication.on("blink", () => {
		eye.blink();
	});

	communication.on("set_style", d => {
		eye.setStyle(d.style);
	});

	win.app = api;
}(window, communicationApi, eyeApi))