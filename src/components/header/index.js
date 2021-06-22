import React from 'react';

import Tooltip from '../tooltip';
import * as styles from './index.module.css';

import Twitter from 'icons/twitter.svg';
import Instagram from 'icons/instagram.svg';
import Linkedin from 'icons/linkedin.svg';
import Codepen from 'icons/codepen.svg';
import Dribbble from 'icons/dribbble.svg';


export default function Header() {
	return (
		<header id={styles.header}>
			<div className={styles.container}>
				<div className={styles.navBrand}>FrFernandez</div>
				<div className={styles.whitespace}></div>
				<div className={styles.navIcons}>
					<Tooltip title="My Dribble">
						<a 
							aria-label="My Dribbble"
							href="https://dribbble.com/FrFernandez"
							className={styles.icon}
						>
							<Dribbble />
						</a>
					</Tooltip>
					<Tooltip title="My Codepen">
						<a 
							aria-label="My Codepen"
							href="https://codepen.io/frfernandezdev"
							className={styles.icon}
						>
							<Codepen />
						</a>
					</Tooltip>
					<Tooltip title="My Linkedin">
						<a 
							aria-label="My Linkedin"
							href="https://www.linkedin.com/in/frfernandezdev" 
							className={styles.icon}
						>
							<Linkedin />
						</a>
					</Tooltip>
					<Tooltip title="My Twitter">
						<a 
							aria-label="My Twitter"
							href="https://twitter.com/frfernandezdev" 
							className={styles.icon}
						>
							<Twitter />
						</a>
					</Tooltip>
					<Tooltip title="My IG">
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

