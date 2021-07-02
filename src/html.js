import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
				<meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
				
				<title>FrFernandez - Web Developer</title>
				<meta name="title" content="FrFernandez - Web Developer" />
				<meta name="description" content="My personal portfolio" />
				<meta name="keywords" content="frfernandez, fernando,fernandez, fernando fernandez, full stack developer, web developer, web designer, portfolio, my personal portfolio, ux/ui/ html, css, sass, pug, javascript, js, python, py, react, react-native, desarrollador de paginas web, desarrollador de sitio web, website, programador, programmer, dev, developer, development, designer, site web, web" />
				<meta name="robots" content="index, follow"/>
				<meta name="language" content="English"/>
				<meta name="author" content="FrFernandez (frfernandezdev@gmail.com)"/>

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://frfernandez.com/" />
				<meta property="og:title" content="FrFernandez - Web Developer" />
				<meta property="og:description" content="My personal portfolio" />
				<meta property="og:image" content="" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://frfernandez.com" />
				<meta property="twitter:title" content="FrFernandez - Web Developer" />
				<meta property="twitter:description" content="My personal portfolio" />
				<meta property="twitter:image" content="" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
