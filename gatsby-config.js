const path = require('path');

module.exports = {
	flags: {
		THE_FLAG: false
	},
	siteMetadata: {
		siteUrl: `https://www.frfernandez.com`
	},
	plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
				components: path.join(__dirname, 'src/components'),
				sections: path.join(__dirname, 'src/sections'),
				icons: path.join(__dirname, 'src/icons')
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `FrFernandez`,
				short_name: `FrFernandez`,
				description: `Web Designer, Web Develper`,
				lang: `en`,
				start_url: `/`,
				background_color: `#FFFFF`,
				theme_color: `#FFFFF`,
				display: `standalone`,
				icon: `src/images/icon.png`
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /\.inline\.svg$/
				}
			}
		},
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-plugin-sharp`,
			options: {
        defaults: {
          formats: [`webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
					avifOptions: {},
				}
      }
		},
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				createLinkInHead: true
			}
		}
	]
}
