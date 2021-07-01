import React from 'react';
import Slide from 'components/slide';
import { StaticImage } from 'gatsby-plugin-image';
import * as styles from './index.module.css';


export default function Work() {
	return (
		<section id={styles.work}>
			<nav className={styles.navTitle}>				
				<div className={styles.title}>
					<h3>Work</h3>
				</div>
			</nav>
			<div className={styles.container}>
				<Slide
					className={styles.projects}
					swipeClass={styles.projects__wrapper}
				>
					<div className={styles.project}>
						<div className={styles.browser}>
							<StaticImage
								src="../../images/conexperto.svg"
								alt="Avatar"
								placeholder="blurred"
								className={styles.projectImg}	
								objectFit="contain"
							/>
						</div>
						<div className={styles.mobile + ' ' + styles.over}>
							<StaticImage
								src="../../images/conexperto.svg"
								alt="Avatar"
								placeholder="blurred"
								className={styles.projectImg}	
								objectFit="contain"
							/>
						</div>
					</div>
				</Slide>
			</div>
		</section>
	); 
}



