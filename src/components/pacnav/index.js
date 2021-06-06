import React, { 
	useState, 
	useEffect, 
	createRef, 
	useRef 
} from 'react';
import './styles.css';
import { useOnceCall } from 'src/hooks';

function makeArr(i) {
	return Array(i)
		.fill()
		.map(() => ({state: false, ref: createRef(null)}));
}

export default function PacNav() {
	const pacman = useRef(null);
	const box = useRef(null);
	const [ eat, setEat ] = useState(false);
	const [ dots, setDots ] = useState(makeArr(3));

	useOnceCall(() => {
		const upDots = [...dots];
		upDots[0] = { ...upDots[0], state: true };
		setDots(upDots);
	});

	function move(i) {
		const { ref } = dots[i];
		const btop = box.current.getBoundingClientRect().top;
		const top = ref.current.getBoundingClientRect().top;
	
		pacman.current.style.top = `${top - btop}px`;
	}

	function handleClick(i) {
		return () => move(i);
	}

	function renderDot({ state, ref }, i) {
		return (
			<li
				key={i}
				ref={ref}
				className={state ? 'active' : null}
			>
				<button onClick={handleClick(i)}></button>
			</li>
		);
	}

	return (
		<nav>
			<div
				ref={pacman}
				className={`pacman ${eat ? 'eat' : ''}`}
			></div>
			<ul ref={box}>{dots.map(renderDot)}</ul>
		</nav>
	);
}
