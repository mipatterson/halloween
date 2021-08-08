(function (win) {
	let wakeLock;

	async function lock() {
		try {
			if (wakeLock) {
				return;
			}
	
			wakeLock = await navigator.wakeLock.request("screen");
			wakeLock.addEventListener("release", () => {
				console.log("Screen unlocked.");
			});
			console.log("Screen locked.");
		} catch (e) {
			console.warn(`Error occurred attempting to lock screen. ${e.message}`);
		}
	}

	async function unlock() {
		try {
			if (!wakeLock) {
				return;
			}
	
			await wakeLock.release();
			wakeLock = undefined;
		} catch (e) {
			console.warn(`Error occurred attempting to unlock screen. ${e.message}`);
		}
	}

	const api = {
		lock,
		unlock,
	};

	win.lockApi = api;
}(window))