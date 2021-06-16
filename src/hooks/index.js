import { useRef, useEffect } from 'react'; 

export function useOnceCall(cb) {
	const isCallRef = useRef(false);

	useEffect(() => {
		if (isCallRef.current) return;
		isCallRef.current = true;
		return cb();
	}, [ cb ]);
};

export function useScrollTrigger(cb, delay=null) {
	const dir = useRef(1);
	const scrollSensitivitySettings = 30;
	const rId = useRef(null);

	useEffect(() => {
		const isFirefox  = /Firefox/i.test(navigator.userAgent);
		const mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";

		function handler(__dir) {
			dir.current = __dir;
			return () => {
				rId.current = null;
				cb(dir.current);
			}
		}

		function listener(event) {
			let delta = isFirefox ? event.detail * (-120) : event.wheelDelta; 
			let __dir = delta <= -scrollSensitivitySettings ? 0 :
									delta >= scrollSensitivitySettings ? 1 : 0;

			if (!delay) {
				if (dir.current === __dir) return;

				dir.current = __dir;
				cb(dir.current);
				return;
			};

			if (rId.current) return;
			rId.current = setTimeout(handler(__dir), delay);
		}

		window.addEventListener(mousewheelEvent, listener)	
		return () => {
			window.removeEventListener(mousewheelEvent, listener)
		};
	}, [ cb, delay ]);

};
