import React, { memo, useContext } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import {ScrollMainContext} from '../../components/scrollmain';
import Tooltip from 'components/tooltip';
import Slide from 'components/slide';
import * as styles from './index.module.css';


import WebDesigner from 'icons/web-designer.inline.svg';
import WebDeveloper from 'icons/web-developer.inline.svg';
import Html from 'icons/html.inline.svg';
import Css from 'icons/css.inline.svg';
import Js from 'icons/js.inline.svg';
import Node from 'icons/node.inline.svg';
import Pug from 'icons/pug.inline.svg';
import Sass from 'icons/sass.inline.svg';
import XReact from 'icons/xreact.inline.svg';
import Python from 'icons/python.inline.svg';
import Neovim from 'icons/neovim.inline.svg';
import Docker from 'icons/docker.inline.svg';
import Gitlab from 'icons/gitlab.inline.svg';
import Github from 'icons/github-big.inline.svg';
import Figma from 'icons/figma.inline.svg';



const About = memo(function({ setLayer }) {
	const { ref } = useContext(ScrollMainContext);
	return (
		<section id={styles.about}>
			<nav className={styles.navTitle}>				
				<div className={styles.title}>
					<h3>About Me</h3>				
				</div>
			</nav>
			<div className={styles.container}>
				<div className={styles.whatIDo}>
					<h4>What Ido</h4>		
					<div className={styles.whatIDo__cards}>
						<div className={styles.whatIDo__card}>
							<div className={styles.whatIDo__cardIcon} style={{ marginTop: -4 }}>
								<WebDesigner />
							</div>
							<div className={styles.whatIDo__cardContent}>
								<h5>Web Designer</h5>
								<p>Websites designed for people and used by people. This is my main goal when designing a website. Minimalist designs and user-friendly interfaces. </p>
							</div>
						</div>
						<div className={styles.whatIDo__card}>
							<div className={styles.whatIDo__cardIcon}>
								<WebDeveloper />
							</div>
							<div className={styles.whatIDo__cardContent}>
								<h5>Web Developer</h5>
								<p>The browser is a blank canvas and it is a pleasure to shape it, using the best techniques and tools to maintain its long-term performance and scalability across multiple devices.</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.tools}>
					<h4>Tools</h4>		
					<Slide 
						className={styles.tools__cards} 
						swipeClass={styles.tools__wrapper} 
					>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="HTML" rootElement={ref.current}>
								<a href="html" aria-label="HTML"><Html /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="CSS" rootElement={ref.current}>
								<a href="css" aria-label="CSS"><Css /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="JavaScript" rootElement={ref.current}>
								<a href="javascript" aria-label="JavaScript"><Js /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="NodeJS" rootElement={ref.current}>
								<a href="nodejs" aria-label="NodeJS"><Node /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Pug" rootElement={ref.current}>
								<a href="pug" aria-label="Pug"><Pug /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Sass" rootElement={ref.current}>
								<a href="sass" aria-label="Sass"><Sass /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="ReactJS" rootElement={ref.current}>
								<a href="reactjs" aria-label="ReactJS"><XReact /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Python" rootElement={ref.current}>
								<a href="python3" aria-label="Python3"><Python /></a>	
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Neovim" rootElement={ref.current}>
								<a href="neovim" aria-label="Neovim"><Neovim /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Docker" rootElement={ref.current}>
								<a href="docker" aria-label="Docker"><Docker /></a>
							</Tooltip>						
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Github" rootElement={ref.current}>
								<a href="github" aria-label="Github"><Github /></a>	
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="GibLab" rootElement={ref.current}>
								<a href="gitlab" aria-label="GitLab"><Gitlab /></a>
							</Tooltip>
						</div>
						<div className={styles.tools__cardIcon}>
							<Tooltip title="Figma" rootElement={ref.current}>
								<a href="figma" aria-label="Figma"><Figma /></a>
							</Tooltip>
						</div>
					</Slide>
				</div>
				<div className={styles.testimonials}>
					<h4>Testimonials</h4>		
					<div className={styles.testimonials__cards}>
						<Slide 
							className={styles.testimonials__cards}
							swipeClass={styles.testimonials__wrapper}
						>
							<div className={styles.testimonials__card}>
								<div className={styles.testimonials__cardHeader}>
									<StaticImage
										src="../../images/20210529_235148.jpg"
										alt="Avatar"
										placeholder="blurred"
										objectPosition="25% 50%"
										className={styles.testimonials__cardAvatar}
									/>
									<div className={styles.testimonials__cardTitle}>
										<h5>John Doe</h5>
									</div>
									<div className={styles.testimonials__cardOccupation}>Company</div>
								</div>
								<div className={styles.testimonials__cardContent}>
									<p>Websites designed for people and used by people. This is my main goal when designing a website. Minimalist designs and user-friendly interfaces.</p>			
								</div>
							</div>
							<div className={styles.testimonials__card}>
								<div className={styles.testimonials__cardHeader}>
									<StaticImage
										src="../../images/20210529_235148.jpg"
										alt="Avatar"
										placeholder="blurred"
										objectPosition="25% 50%"
										className={styles.testimonials__cardAvatar}
									/>
									<div className={styles.testimonials__cardTitle}>
										<h5>John Doe</h5>
									</div>
									<div className={styles.testimonials__cardOccupation}>Company</div>
								</div>
								<div className={styles.testimonials__cardContent}>
									<p>Websites designed for people and used by people. This is my main goal when designing a website. Minimalist designs and user-friendly interfaces.</p>			
								</div>
							</div>
						</Slide>
					</div>
				</div>
			</div>
		</section>
	); 
}, (prev, next) => {
	if (prev.setLayer === next.setLayer) return true;
	return false;
});

export default About;
