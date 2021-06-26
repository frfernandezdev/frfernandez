import React from 'react';
import { useState } from 'react';

import PacNav from 'components/pacnav';
import ScrollMain from 'components/scrollmain';

import My from 'sections/my';
import About from 'sections/about';
import Work from 'sections/work';

import * as styles from './index.module.css'; 
import { useScrollTrigger } from 'src/hooks';



const sections = ['My', 'About', 'Work']; 

const Landing = () => {
	const [layer, setLayer] = useState(0);

	useScrollTrigger((dir) => {
		const next = dir ? layer -1: layer +1;

		if (next < 0 || next >= sections.length) return 0;

		setLayer(next);
	}, 500);

  return (
		<div className={styles.wrapper}>
			<PacNav value={layer} steps={sections} onChange={setLayer}/>
			<ScrollMain value={layer}>
				<My setLayer={setLayer}/>
				<About setLayer={setLayer}/>
				<Work setLayer={setLayer}/>
			</ScrollMain>
		</div>
 	);
}

export default Landing 
