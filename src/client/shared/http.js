(function (win) {
	const api = {};

	api.getState = async () => {
		const response = await fetch("/api/state", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const status = await response.json();

		return status;
	};

	api.setInterval = (interval) => {
		return fetch(`/api/interval/${interval}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	api.enable = () => {
		return fetch("/api/enable", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	api.disable = () => {
		return fetch("/api/disable", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	api.setMode = (mode) => {
		return fetch(`/api/mode/${mode}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	win.httpApi = api;
}(window))