import { createRef } from 'react';

export function makeArr(i) {
	return Array(i)
		.fill()
		.map(() => ({state: false, ref: createRef(null)}));
}

export function getBoundingClientRect(el, dir=null) {
	return dir 
				? el.current.getBoundingClientRect()[dir]
				: el.current.getBoundingClientRect();
}

