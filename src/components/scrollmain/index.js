import React, {
	useEffect,
	memo,
	useRef,
	createContext
} from 'react';

import * as styles from './index.module.css'; 


const ScrollMainContext = createContext({});

const ScrollMain = memo(({children, value}) => {
	const wrapperRef = useRef(null);

	function layer(child, i) {
		return (
			<div 
				key={i} 
				className={styles.layer}
			>{ child }</div>
		);
	}

	function addWillChange() {
		wrapperRef.current.style.willChange = 'top';
	}

	function removeWillChange() {
		wrapperRef.current.style.willChange = 'auto';
	}

	useEffect(() => {
		const style = document.documentElement.style;
		let ref = wrapperRef.current
		
		addWillChange();
		style.setProperty('--scroll', `-${value * 100}vh`);
		
		ref.addEventListener('transitionend', removeWillChange);
		return () => {
			ref.addEventListener('transitionend', removeWillChange);
			ref = null;
		}
	}, [ value, wrapperRef ]);
	
	return (
		<main id={styles.main}>
			<div ref={wrapperRef} className={styles.wrapper}>
				<ScrollMainContext.Provider value={{ ref: wrapperRef }}>
					{children.map(layer)}
				</ScrollMainContext.Provider>
			</div>
		</main>
	);
}, (prev, next) => {
	if (prev.children === next.children 
				&& prev.value === next.value) return true;
	return false
});

export { ScrollMain, ScrollMainContext };
