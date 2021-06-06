import { useRef, useEffect } from 'react'; 

export function useOnceCall(cb, condition) {
	const isCallRef = useRef(false);

	useEffect(() => {
		if (!condition && isCallRef.current) return;
		isCallRef.current = true;
		cb();
	},[ cb, condition ]);
};
