module.exports = {
  siteMetadata: {
    title: 'AWA',
    description: '',
    author: '@makinacorpus',
    locales: ['en', 'de', 'es', 'et', 'fr'],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-modal-routing',
      options: {
        modalProps: {
          className: 'customModal',
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'quiz',
        path: `${__dirname}/content/quiz`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'chartsTexts',
        path: `${__dirname}/content/charts-texts`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Abel'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'gridPointCSV',
        path: `${__dirname}/content/map`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'adaptations',
        path: `${__dirname}/content/adaptations`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'solagro-awa',
        short_name: 'awa',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
    'gatsby-plugin-solagro-awa-i18n-routes',
    'gatsby-plugin-solagro-awa-adaptations',
    'gatsby-plugin-solagro-awa-quiz',
    'gatsby-plugin-solagro-awa-map',
    'gatsby-transformer-quiz-markdown',
    // 'gatsby-plugin-uninline-styles',
    // this plugin will uninstall any previous serviceworker for current site avoiding cache issues
    'gatsby-plugin-remove-serviceworker',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
