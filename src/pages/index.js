import React from 'react';

import Header from 'components/header';
import Footer from 'components/footer';
import PacNav from 'components/pacnav';
import ScrollMain from 'components/scrollmain';

import My from 'sections/my';
import About from 'sections/about';
import Work from 'sections/work';

import * as styles from './index.module.css'; 


const Landing = () => {
  return (
		<div className={styles.wrapper}>
			<Header/>
			<PacNav value={0} steps={4}/>
			<ScrollMain>
				<My/>
				<About/>
				<Work/>
			</ScrollMain>
			<Footer/>
		</div>
 	);
}

export default Landing 
