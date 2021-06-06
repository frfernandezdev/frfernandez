import React from 'react';

import Header from 'components/header';
import Footer from 'components/footer';
import PacNav from 'components/pacnav';

import My from 'sections/my';
import About from 'sections/about';
import Work from 'sections/work';

import * as styles from './index.module.css'; 


const Landing = () => {
  return (
		<div className={styles.wrapper}>
			<Header/>
			<PacNav/>
			<main>
				<My/>
				<About/>
				<Work/>
			</main>
			<Footer/>
		</div>
 	);
}

export default Landing 
