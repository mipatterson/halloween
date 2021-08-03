module.exports = function (animation, options) {
	let blinkTimer;

	function stopBlinking() {
		if (blinkTimer) {
			clearInterval(blinkTimer);
			blinkTimer = undefined;
		}
	}

	function startBlinking() {
		if (!blinkTimer) {
			blinkTimer = setInterval(() => {
				animation.blink();
			}, options.interval);
		}
	}

	return {
		start: () => {
			animation.setStyle(options.style);
			startBlinking();
		},
		stop: () => {
			stopBlinking();
		},
	};
};