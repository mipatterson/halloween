(function (win) {
	let wakeLock;

	function lock() {
		if (wakeLock) {
			return;
		}

		wakeLock = await navigator.wakeLock.request("screen");
		wakeLock.addEventListener("release", () => {
			console.log("Screen unlocked.");
		});
		console.log("Screen locked.");
	}

	function unlock() {
		if (!wakeLock) {
			return;
		}

		await wakeLock.release();
		wakeLock = undefined;
	}

	const api = {
		lock,
		unlock,
	};

	win.lockApi = api;
}(window))