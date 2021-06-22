import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Header from 'components/header';
import Tooltip from 'components/tooltip';

import GitHub from 'icons/github-clip.svg';

import Ven from 'icons/venezuela.svg';
import * as styles from './index.module.css';


const GitHubCorner = () => (
	<a 
		aria-label="My Github"
		href="https://github.com/frfernandezdev" 
		className={styles.githubCorner}
	>
		<GitHub />
	</a>
);

export default function My() {
	return (
		<section id={styles.my}>
			<GitHubCorner />
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.avatar}>
					<StaticImage
						src="../../images/20210529_235148.jpg"
						alt="Avatar"
						placeholder="blurred"
						objectPosition="25% 50%"
						className={styles.avatarImg}
					/>
					<Tooltip title="Venezuela, Tachira, Michelena" placement="right">
						<div className={styles.avatarFlag}>
							<Ven />
						</div>
					</Tooltip>
				</div>
				<h1 className={styles.myName}>Fernando Fernandez</h1>
				<h3 className={styles.occupation}>Web Developer</h3>
				<div className={styles.callToAction}>
					<button 
						type="button" 
						className="my-btn light" 
						aria-label="Download CV"
					>Download CV</button>
					<div className={styles.whitespace}></div>
					<button 
						type="button" 
						className="my-btn" 
						aria-label="Contact"
					>Contact</button>
				</div>
			</div>
		</section>
	);
}

