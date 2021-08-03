(function (win) {
	const container = win.document.getElementById("eye-container");

	function detectSide() {
		const side = win.location.href.includes("right") ? "right" : "left";
		console.log(`Side: ${side}`);
		return side;
	}

	const side = detectSide();

	function blink() {
		
		container.classList.add("blink");
		setTimeout(() => {
			container.classList.remove("blink");
		}, 1000);
	}

	function open() {
		container.classList.remove("closed");
		container.classList.remove("closing");
		container.classList.add("opening");
		setTimeout(() => {
			container.classList.remove("opening");
			container.classList.remove("open");
		}, 1000);
	}

	function close() {
		container.classList.remove("open");
		container.classList.remove("opening");
		container.classList.add("closing");
		setTimeout(() => {
			container.classList.remove("closing");
			container.classList.remove("closed");
		}, 1000);
	}

	const api = {
		side,
		blink,
		open,
		close,
	};

	const styles = {
		basic: {
			setup: () => {
				const eye = win.document.createElement("div");
				eye.classList.add("basic");
				container.appendChild(eye);
			},
		},
		red: {
			setup: () => {
				const eye = win.document.createElement("div");
				eye.classList.add("red");
				container.appendChild(eye);
			},
		},
	};

	api.setStyle = function (style) {
		container.innerHTML = "";
		styles[style].setup();
	}

	api.show = function () {
		container.classList.remove("hide");
	}

	api.hide = function () {
		container.classList.add("hide");
	}

	win.eyeApi = api;
}(window))