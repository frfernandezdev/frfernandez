import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useScrollTrigger } from 'src/hooks';
import { range } from 'src/utils';

import * as styles from "./index.module.css";



const Slide = memo(function({ children, className, swipeClass }) {
	const [ slide, setSlide ] = useState(0);
	const [ offset, setOffset ] = useState(0);
	const slideRef = useRef(null);
	const swipeRef = useRef(null);
	const rId = useRef(null);

	function addWillChange() {
		swipeRef.current.style.willChange = 'left';
	}

	function removeWillChange() {
		swipeRef.current.style.willChange = 'auto';
	}

	function move(i) {
		return () => {
			setSlide(i);
		}
	}

	const listener = useCallback(() => {
		setOffset(Math.floor(swipeRef.current.offsetWidth 
												/ slideRef.current.offsetWidth));
		if (offset === 0) setSlide(0);
	}, [ offset ]);

	useEffect(() => {
		const { style, offsetWidth } = slideRef.current;
		
		rId.current && clearTimeout(rId.current);
		addWillChange();
		setTimeout(() => {
			style.setProperty('--swipe', `-${slide * offsetWidth}px`);	
			removeWillChange();
		}, 120);
	}, [ slide ]);

	useEffect(() => {
		listener();
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [ listener ]);

	useScrollTrigger((dir) => {
		let n = dir ? slide -1 : slide +1;
		
		if (n > offset && n < 0) return 0;

		setSlide(n);
	}, 250, true, slideRef.current);

	function renderBottom(idx) {
		return (
			<button 
				key={idx}
				aria-label={`idx`}
				onClick={move(idx)}
				className={slide === idx ? styles.active : ''}
			></button>
		);
	}

	return (
		<>
			<div ref={slideRef} id={styles.slide} className={className}>
				<div ref={swipeRef} className={styles.swipe + ' ' + swipeClass}>
					{ children }
				</div>
				<div className={styles.btnAction}>
					{offset !== 0 && range(0, offset).map(renderBottom)}
				</div>
			</div>
		</>
	);
}, (prev, next) => {	
	if (prev.children === next.children
				&& prev.className === next.className
				&& prev.swipeClass === next.swipeClass) return true;
	return false;
});

export default Slide;

