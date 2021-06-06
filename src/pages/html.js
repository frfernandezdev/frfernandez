import React from 'react';
import PropTypes from 'prop-types';


export default function HTML(props) {
	const {
		htmlAttributes,
		headComponents,
		bodyAttributes,
		body,
		preBodyComponents,
		postBodyComponents
	} = props;
	return (
		<html {...htmlAttributes}>
			<head>
				{headComponents}
		</head>
			<body {...bodyAttributes}>
				{preBodyComponents}
				<noscript key="noscript" id="gatsby-noscript">
					This app works best with JavaScript enabled.
				</noscript>
				<div 
					key={`body`}
					id="__gatsby"
					dangerouslySetInnerHTML={{ __html: body }}
				/>
				{postBodyComponents}
			</body>
		</html>
	);
}

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array
}
