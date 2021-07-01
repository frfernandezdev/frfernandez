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

export function useScrollTrigger(
	cb, 
	delay=null, 
	orientation=false, 
	rootElement=null
) {
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
			move.current = event.touches[0][ orientation ? "clientX" : "clientY" ];
		}

		function listenerEnd(event) {
			let end = event.changedTouches[0][ orientation ? "clientX" : "clientY" ];
			return handler(move.current >= (end +scrollSensitivitySettings) ? 0 : 
										 move.current <= (end -scrollSensitivitySettings) ? 1 : null);
		}

		(rootElement || window).addEventListener('touchstart', listenerStart);
		(rootElement || window).addEventListener('touchend', listenerEnd);
		return () => {
			(rootElement || window).removeEventListener('touchstart', listenerStart);
			(rootElement || window).removeEventListener('touchend', listenerEnd);
		};
	}, [ handler, orientation, rootElement ]);

	// Listener for browser
	useEffect(function() {
		let eventName = isBrowser('Firefox') ? "DOMMouseScroll" : "wheel";

		function listener(event) {
			let delta = isBrowser('Firefox') ? 
											event.detail * (-120) : event.wheelDelta;

			if (!orientation && window.MouseScrollEvent.VERTICAL_AXIS !== event.axis) return 0;
			if (orientation && window.MouseScrollEvent.HORIZONTAL_AXIS !== event.axis) return 0;

			return handler(delta <= -scrollSensitivitySettings ? 0 :
						 				 delta >= scrollSensitivitySettings ? 1 : 0);
		}

		(rootElement || window).addEventListener(eventName, listener);
		(rootElement || window).addEventListener(eventName, listener);
		return () => {
			(rootElement || window).removeEventListener(eventName, listener);
			(rootElement || window).removeEventListener(eventName, listener);
		};
	}, [ handler, orientation, rootElement ]);

};
