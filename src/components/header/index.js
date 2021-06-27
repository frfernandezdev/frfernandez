import React, { useContext } from 'react';

import { ScrollMainContext } from '../scrollmain';
import Tooltip from '../tooltip';
import * as styles from './index.module.css';

import Twitter from 'icons/twitter.inline.svg';
import Instagram from 'icons/instagram.inline.svg';
import Linkedin from 'icons/linkedin.inline.svg';
import Codepen from 'icons/codepen.inline.svg';
import Dribbble from 'icons/dribbble.inline.svg';


export default function Header() {
	const { ref } = useContext(ScrollMainContext);
	return (
		<header id={styles.header}>
			<div className={styles.container}>
				<div className={styles.navBrand}>FrFernandez</div>
				<div className={styles.whitespace}></div>
				<div className={styles.navIcons}>
					<Tooltip title="My Dribble" rootElement={ref.current}>
						<a 
							aria-label="My Dribbble"
							href="https://dribbble.com/FrFernandez"
							className={styles.icon}
						>
							<Dribbble />
						</a>
					</Tooltip>
					<Tooltip title="My Codepen" rootElement={ref.current}>
						<a 
							aria-label="My Codepen"
							href="https://codepen.io/frfernandezdev"
							className={styles.icon}
						>
							<Codepen />
						</a>
					</Tooltip>
					<Tooltip title="My Linkedin" rootElement={ref.current}>
						<a 
							aria-label="My Linkedin"
							href="https://www.linkedin.com/in/frfernandezdev" 
							className={styles.icon}
						>
							<Linkedin />
						</a>
					</Tooltip>
					<Tooltip title="My Twitter" rootElement={ref.current}>
						<a 
							aria-label="My Twitter"
							href="https://twitter.com/frfernandezdev" 
							className={styles.icon}
						>
							<Twitter />
						</a>
					</Tooltip>
					<Tooltip title="My IG" rootElement={ref.current}>
						<a 
							aria-label="My IG"
							href="https://www.instagram.com/frfernandezdev" 
							className={styles.icon}
						>
							<Instagram />
						</a>
					</Tooltip>
				</div>
			</div>
		</header>
	);
};

