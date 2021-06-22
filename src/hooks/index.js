import { useRef, useEffect } from 'react'; 

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

	useEffect(() => {
		const isFirefox  = /Firefox/i.test(navigator.userAgent);
		const mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";

		function handler(__dir) {
			dir.current = __dir;
			return () => {
				rId.current = null;
				return cb(dir.current);
			}
		}

		function listener(event) {
			let delta = isFirefox ? event.detail * (-120) : event.wheelDelta; 
			let __dir = delta <= -scrollSensitivitySettings ? 0 :
									delta >= scrollSensitivitySettings ? 1 : 0;

			if (!delay) {
				if (dir.current === __dir) return 0;

				dir.current = __dir;
				return cb(dir.current);
			};

			if (rId.current) return;
			rId.current = setTimeout(handler(__dir), delay);
		}

		window.addEventListener(mousewheelEvent, listener)	
		return () => {
			clearTimeout(rId.current);
			window.removeEventListener(mousewheelEvent, listener);
		}
	}, [ cb, delay ]);

};
