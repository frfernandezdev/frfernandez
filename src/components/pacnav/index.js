import React, { 
	useState, 
	useRef,
	useEffect,
	memo,
	createRef
} from 'react';
import PropTypes from 'prop-types';
import * as styles from './index.module.css';
import Tooltip from '../tooltip';
import { getBoundingClientRect } from 'src/utils';
import { useOnceCall } from 'src/hooks';


function makeDots(arr) {
	return Array.from(arr)
		.map(e => ({
			state: false,
			ref: createRef(null),
			tooltip: e
		}));
}

const PacNav = memo(function({ value, steps, onChange }) {
	const [ dots, setDots ] = useState(makeDots(steps));
	const pacman = useRef(null);
	const rId = useRef(null);
	const box = useRef(null);
	const dir = useRef(0);
	const last = useRef(0);

	function handleDots(i) {
		const stateDots = [...dots];

		stateDots[last.current].state = !(last.current !== i);
		stateDots[i].state = true;
		setDots(stateDots);
	}

	function eatOn() {
		const { current } = pacman;

		current.classList.toggle(styles.pacman__eat);
	}

	function turnOn() {
		if (dir.current) {
			pacman.current.classList.add(styles.pacman__turn);
		}
		else {
			pacman.current.classList.remove(styles.pacman__turn);
		}
	}

	function move(i) {
		const { current } = pacman;
		const { ref } = dots[i];
		const boxTop = getBoundingClientRect(box, 'top');
		const refTop = getBoundingClientRect(ref, 'top');
		
		current.style.top = `${refTop - boxTop}px`;
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
			onChange(i);
		};
	}

	function renderDot({ tooltip, state, ref }, i) {
		return (
			<li
				key={i}
				ref={ref}
				className={state ? styles.active : null}
			>
				<Tooltip title={tooltip} placement="right">
					<button onClick={handleClick(i)} aria-label={`Navigate ${tooltip}`}></button>
				</Tooltip>
			</li>
		);
	}

	useOnceCall(() => {
		if (value > 0 && value < dots.length) {
			handleDots(value);
			move(value);
			return 0;
		}
		handleDots(0);
		move(0);
	});


	useEffect(() => {
		if (value === last.current) return 0;
		if (value >= 0 && value < dots.length) {
			handleClick(value)();
		}
	}, [ value ]);

	return (
		<nav id={styles.pacnav}>
			<div ref={pacman} className={styles.pacman}></div>
			<ul ref={box}>{dots.map(renderDot)}</ul>
		</nav>
	);
}, (prev, next) => {
	if (prev.value === next.value 
				&& prev.steps === next.steps
				&& prev.onChange === next.onChange) return true;
	return false;
});

PacNav.propTypes = {
	value: PropTypes.number.isRequired,
	steps: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func
};

export default PacNav; 
