require('babel-polyfill')

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  sessionSecret: process.env.SESSION_SECRET || 'supersecret',
  sessionTimeoutDays: process.env.SESSION_TIMEOUT || 7,
  tokenSecret: process.env.TOKEN_SECRET || 'supersecret',
  tibetSite: process.env.TIBETSITE || 'gu_guux',
  app: {
    title: 'Tibet Universal React',
    description: 'An univeral react app that consume Tibet-api',
    head: {
      titleTemplate: 'Tibet Universal React: %s',
      meta: [
        {name: 'description', content: 'An univeral react app that consume Tibet-api'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Tibet Universal React'},
        {property: 'og:image', content: ''},
        {property: 'og:locale', content: 'nb_NO'},
        {property: 'og:title', content: 'Tibet Universal React'},
        {property: 'og:description', content: 'Dine oppgaver..'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@gerhardsletten'},
        {property: 'og:creator', content: '@gerhardsletten'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
}, environment)
