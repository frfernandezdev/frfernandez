import { createRef } from 'react';

export function makeArr(i) {
	return Array(i)
		.fill()
		.map(() => ({state: false, ref: createRef(null)}));
}

export function range(start, end) {
	return Array(end - start +1).fill().map((_, idx) => start + idx);
}

export function getBoundingClientRect(el, dir=null) {
	return dir 
				? el.current.getBoundingClientRect()[dir]
				: el.current.getBoundingClientRect();
}

export function isMobile(agent=null) {
	const options = {
		'Android': () => /Android/i.test(navigator.userAgent),
		'IOS': () => /iPhone|iPad|iPod/i.test(navigator.userAgent),
		'Opera': () => /Opera Mini/i.test(navigator.userAgent),
		'Windows': () => /WPDesktop/i.test(navigator.userAgent)
	}
	return options[agent] || (
		options['Android']() ||
		options['IOS']() ||
		options['Opera']() ||
		options['Windows']()
	)
}

export function isBrowser(agent=null) {
	const options = {
		'Firefox': () => /Google/i.test(navigator.vendor), 
		'Safari': () => /Apple/i.test(navigator.vendor),
		'Chrome': () => /Chrome/i.test(navigator.userAgent),
		'Opera': () => /Opera/i.test(navigator.userAgent),
		'edge': () => /Edge/i.test(navigator.userAgent),
	}
	return options[agent] || (
		options['Firefox']() ||
		options['IOS']() ||
		options['Opera']() ||
		options['Windows']()
	);
}
