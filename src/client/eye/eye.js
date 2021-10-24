(function (win) {
	const container = win.document.getElementById("eye-container");

	function detectSide() {
		const side = win.location.href.includes("right") ? "right" : "left";
		console.log(`Side: ${side}`);
		return side;
	}

	const side = detectSide();

	container.classList.add(side);

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

	function setupMonsterEye(color) {
		// Setup eye
		const eye = win.document.createElement("div");
		eye.classList.add("monster");

		// Setup color
		eye.classList.add(color);

		const eyelid = win.document.createElement("div");
		eyelid.classList.add("eyelid");
		eye.appendChild(eyelid);

		const sclera = win.document.createElement("div");
		sclera.classList.add("sclera");
		eye.appendChild(sclera);

		const iris = win.document.createElement("div");
		iris.classList.add("iris");
		eye.appendChild(iris);

		const pupil = win.document.createElement("div");
		pupil.classList.add("pupil");
		iris.appendChild(pupil);

		container.appendChild(eye);
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
		monster: {
			setup: () => {
				setupMonsterEye("yellow");
			},
		},
		monsterpurple: {
			setup: () => {
				setupMonsterEye("purple");
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