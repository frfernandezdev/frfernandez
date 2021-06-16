import React, { 
	useState, 
	createRef, 
	useRef 
} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { useOnceCall } from 'src/hooks';



const EAT = 'pacman__eat';
const TURN = 'pacman__turn';

function makeArr(i) {
	return Array(i)
		.fill()
		.map(() => ({state: false, ref: createRef(null)}));
}

function getBoundingClientRect(el, dir) {
	return el.current.getBoundingClientRect()[dir];
}

export default function PacNav({ value, steps, onChange }) {
	const box = useRef(null);
	const dir = useRef(0);
	const last = useRef(0);
	const pacman = useRef(null);
	const [ dots, setDots ] = useState(makeArr(steps));

	useOnceCall(() => {
		if (value > 0 && value < dots.length) {
			handleDots(value);
			move(value);
			return 0;
		}
		handleDots(0);
		move(0);
	});
	
	function handleDots(i) {
		const stateDots = [...dots];

		stateDots[last.current].state = !(last.current !== i);
		stateDots[i].state = true;
		setDots(stateDots);
	}

	function eatOn() {
		const { current } = pacman;

		current.classList.toggle(EAT);
	}

	function move(i) {
		const { current } = pacman;
		const { ref } = dots[i];
		const boxTop = getBoundingClientRect(box, 'top');
		const refTop = getBoundingClientRect(ref, 'top');
		
		current.style.top = `${refTop - boxTop}px`;
	}

	function turnOn() {
		if (dir.current) {
			pacman.current.classList.add('pacman__turn');
		}
		else {
			pacman.current.classList.remove('pacman__turn');
		}
	}

	function handlePacman(i) {
		move(i);
		eatOn();
		
		turnOn();
		setTimeout(() => {
			eatOn();
			
			if (i === 0) dir.current = 0;
			if (i === (dots.length -1)) dir.current = 1;
			
			turnOn();
		}, 500);
	}

	function handleClick(i) {
		return () => {
			if (i > last.current) dir.current = 0;
			if (i < last.current) dir.current = 1;

			handleDots(i);
			handlePacman(i);
			last.current = i;
		};
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
			<div ref={pacman} className="pacman"></div>
			<ul ref={box}>{dots.map(renderDot)}</ul>
		</nav>
	);
}

PacNav.propTypes = {
	value: PropTypes.number.isRequired,
	steps: PropTypes.number.isRequired,
	onChange: PropTypes.func
};
