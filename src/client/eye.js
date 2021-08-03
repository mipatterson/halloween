(function (win) {
	const container = win.document.getElementById("eye-container");
	const eyeId = "eye";
	const eye = win.document.getElementById(eyeId);

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

	const api = {
		side,
		blink,
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

	api.setStyle("basic");

	win.eyeApi = api;
}(window))