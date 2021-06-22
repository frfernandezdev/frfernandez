import React, { 
	useRef, 
	useState,
	useEffect,
	useCallback,
	createElement, 
	cloneElement,
	memo
} from 'react';
import {createPortal} from 'react-dom';
import { getBoundingClientRect } from 'src/utils';
import * as styles from './index.module.css';



const Portal = ({children}) => createPortal(
	children,
	document.body
);

// Calc center box
const calc = (ar1, ar2, ar3) => (ar1 + (ar2 /2)) - (ar3 /2); 
console.log(styles)
const Tooltip = memo(function({ children, title, placement='bottom' }) {
	const [state, setState] = useState(false);
	const tooltipRef = useRef(null);
	const childRef = useRef(null);
	const pos = useRef({});
	const rId = useRef(null);

	const PortalChild = createElement(
		'div',
		{
			ref: tooltipRef,
			className: styles.tooltip
		},
		title
	);

	const show = useCallback(function() { 
		setState(true);
		
		const { width, height } = getBoundingClientRect(tooltipRef);

		rId.current && clearTimeout(rId.current);
		rId.current = setTimeout(() => {
			if (!tooltipRef.current) return 0;
			if (placement === 'bottom') {
				tooltipRef.current.style.left   = calc(pos.current.left, pos.current.width, width) + 'px';
				tooltipRef.current.style.top    = (pos.current.bottom +6) + 'px';
			}
			if (placement === 'top') {
				tooltipRef.current.style.left   = calc(pos.current.left, pos.current.width, width) + 'px';
				tooltipRef.current.style.top 		= (pos.current.top - height -6) + 'px';
			}
			if (placement === 'left') {
				tooltipRef.current.style.left 	= (pos.current.left - width -6) + 'px';
				tooltipRef.current.style.top    = calc(pos.current.top, pos.current.height, height) + 'px';
			}
			if (placement === 'right') {
				tooltipRef.current.style.left 	= (pos.current.right +6) + 'px';
				tooltipRef.current.style.top    = calc(pos.current.top, pos.current.height, height) + 'px';
			}
			tooltipRef.current.classList.add(styles.tooltip__show)
		});
	}, [ setState, placement ]);

	const hidden = useCallback(function() { 
		tooltipRef.current.classList.remove(styles.tooltip__show);
		setState(false); 
	}, [ setState ]);

	useEffect(() => {
		let current = childRef.current;
		if (!current) return 0;
		const {
			top,
			left,
			bottom,
			right,
			width,
			height
		} = getBoundingClientRect({current});

		pos.current.top  = top;
		pos.current.left = left;
		pos.current.bottom = bottom;
		pos.current.right = right;
		pos.current.width = width;
		pos.current.height = height;

		current.addEventListener('mouseover', show);
		current.addEventListener('mouseleave', hidden);
		return () => {
			current.removeEventListener('mouseover', show);
			current.removeEventListener('mouseleave', hidden);
			current = null;
			clearTimeout(rId.current);
		}
	}, [ show, hidden ]);

	return (
		<>
			{ cloneElement(children, { ref: childRef }) }
			{ state ? <Portal children={PortalChild} /> : null }
		</>
	);
}, (prev, next) => {
	if (prev.children === next.children 
				&& prev.title === next.title
				&& prev.placement === next.placement) return true;
	return false;
});

export default Tooltip;
