import React, { 
	useRef, 
	useState,
	useEffect,
	useCallback,
	createElement, 
	cloneElement,
	memo
} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import { getBoundingClientRect } from 'src/utils';
import * as styles from './index.module.css';



const Portal = ({children, rootElement}) => createPortal(
	children,
	(rootElement || document.body)
);

// Calc center box
const calc = (ar1, ar2, ar3) => (ar1 + (ar2 /2)) - (ar3 /2); 

const Tooltip = memo(function({ children, title, placement='bottom', rootElement=null }) {
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
				tooltipRef.current.classList.add(styles.tooltip_arrow_top);
			}
			if (placement === 'top') {
				tooltipRef.current.style.left   = calc(pos.current.left, pos.current.width, width) + 'px';
				tooltipRef.current.style.top 		= (pos.current.top - height -6) + 'px';
				tooltipRef.current.classList.add(styles.tooltip_arrow_bottom);
			}
			if (placement === 'left') {
				tooltipRef.current.style.left 	= (pos.current.left - width -6) + 'px';
				tooltipRef.current.style.top    = calc(pos.current.top, pos.current.height, height) + 'px';
				tooltipRef.current.classList.add(styles.tooltip_arrow_right);
			}
			if (placement === 'right') {
				tooltipRef.current.style.left 	= (pos.current.right +6) + 'px';
				tooltipRef.current.style.top    = calc(pos.current.top, pos.current.height, height) + 'px';
				tooltipRef.current.classList.add(styles.tooltip_arrow_left);
			}
			tooltipRef.current.classList.add(styles.tooltip__show)
		});
	}, [ setState, placement ]);

	const hidden = useCallback(function() { 
		tooltipRef.current.classList.remove(styles.tooltip__show);
		setState(false); 
	}, [ setState ]);

	const calcPosition = useCallback(function() {
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
	}, []);

	useEffect(() => {
		calcPosition();
		
		let current = childRef.current;
		if (!current) return 0;

		current.addEventListener('mouseover', show);
		current.addEventListener('mouseleave', hidden);
		return () => {
			current.removeEventListener('mouseover', show);
			current.removeEventListener('mouseleave', hidden);
			current = null;
			clearTimeout(rId.current);
		}
	}, [ show, hidden, calcPosition ]);

	return (
		<>
			{ cloneElement(children, { ref: childRef }) }
			{ state ? <Portal children={PortalChild} rootElement={rootElement}/> : null }
		</>
	);
}, (prev, next) => {
	if (prev.children === next.children 
				&& prev.title === next.title
				&& prev.placement === next.placement
				&& prev.rootElement === next.rootElement) return true;
	return false;
});

Tooltip.propTypes = {
	title: PropTypes.string.isRequired, 
	placement: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
	rootElement: PropTypes.any
}

export default Tooltip;
