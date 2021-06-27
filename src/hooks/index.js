import { useRef, useEffect, useCallback } from 'react'; 
import { isMobile, isBrowser } from '../utils';

export function useOnceCall(cb) {
	const isCallRef = useRef(0);

	useEffect(() => {
		if (isCallRef.current) return;
		isCallRef.current = 1;
		return cb();
	}, [ cb ]);
};

export function useScrollTrigger(cb, delay=null) {
	const dir = useRef(1);
	const scrollSensitivitySettings = 30;
	const rId = useRef(null);
	const move = useRef(0);

	const handler = useCallback(function(direction) {
		if (direction === null) return 0;
		if (!delay) {
			if (dir.current === direction) return 0;

			dir.current = direction;
			return cb(dir.current);
		}

		function handlerTimeout() {
			rId.current = null;
			return cb(dir.current)
		}
		if (rId.current) return 0;
		dir.current = direction;
		rId.current = setTimeout(handlerTimeout, delay);
	}, [ delay, cb ]);

	// Listener for mobile
	useEffect(function() {
		function listenerStart(event) {
			move.current = event.touches[0].clientY;
		}

		function listenerEnd(event) {
			let end = event.changedTouches[0].clientY;
			return handler(move.current >= (end +scrollSensitivitySettings) ? 0 : 
										 move.current <= (end -scrollSensitivitySettings) ? 1 : null);
		}

		window.addEventListener('touchstart', listenerStart);
		window.addEventListener('touchend', listenerEnd);
		return () => {
			window.removeEventListener('touchstart', listenerStart);
			window.removeEventListener('touchend', listenerEnd);
		};
	}, [ handler ]);

	// Listener for browser
	useEffect(function() {
		let eventName = isBrowser('Firefox') ? "DOMMouseScroll" : "wheel";

		function listener(event) {
			let delta = isBrowser('Firefox') ? 
											event.detail * (-120) : event.wheelDelta;
			return handler(delta <= -scrollSensitivitySettings ? 0 :
						 				 delta >= scrollSensitivitySettings ? 1 : 0);
		}

		window.addEventListener(eventName, listener);
		window.addEventListener(eventName, listener);
		return () => {
			window.removeEventListener(eventName, listener);
			window.removeEventListener(eventName, listener);
		};
	}, [ handler ]);

};
