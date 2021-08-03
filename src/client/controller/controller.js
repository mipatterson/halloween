(function (win, com, http) {
	const container = win.document.getElementById("container");
	const enabledInput = win.document.getElementById("enabled-input");
	const modeSelect = win.document.getElementById("mode-select");

	http.getState().then(state => {
		enabledInput.checked = state.enabled === true;
		modeSelect.value = state.mode;

		enabledInput.onchange = (e) => {
			if (e.target.checked) {
				http.enable();
			} else {
				http.disable();
			}
		}

		com.on("enable", () => {
			enabledInput.checked = true;
		});

		com.on("disable", () => {
			enabledInput.checked = false;
		});

		modeSelect.onchange = (e) => {
			http.setMode(e.target.value);
		};

		container.classList.remove("hidden");
	});

	const api = {};

	win.controllerApi = api;
}(window, communicationApi, httpApi))