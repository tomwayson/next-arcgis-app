// next.config.js
// NOTE: we're using the CSS plugin to load Bootstrap styles
// see: https://github.com/zeit/next-plugins/tree/master/packages/next-css
const withCSS = require('@zeit/next-css');

// NOTE: this is a good place to store any variables
// that change depending on the application's environment
// see: https://nextjs.org/docs#exposing-configuration-to-the-server--client-side

// defaults that all environments fall back to
const publicRuntimeConfig = {
  // OAuth settings
  // see: https://esri.github.io/arcgis-rest-js/guides/browser-authentication/
  // NOTE: the item for this application can be seen here:
  // http://www.arcgis.com/home/item.html?id=b8f230e9ad10493cb4a51014a709d14d
  // when deploying to your own domain, you should first
  // create your own item and register the URL where it will be deployed
  // and then use that application's App ID as the clientId below
  clientId: 'qVp7iuFvZLBFwrEQ',
  portal: 'https://www.arcgis.com/sharing/rest',
  // app cookies will be prefixed with this, ex: naa_session
  cookiePrefix: 'naa'
  // NOTE: currently the application assumes that it will be deployed to the server's root
  // if it needs to be deployed to a subfolder, we'd need to add a variable here for that
  // see: https://facebook.github.io/create-react-app/docs/deployment#building-for-relative-paths
};
// to change any of the above on a per environment basis, do something like
// use different cookies for different environments
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
  publicRuntimeConfig.cookiePrefix = 'naa_dev';
}
if (nodeEnv === 'test') {
  publicRuntimeConfig.cookiePrefix = 'naa_test';
}

module.exports = withCSS({ publicRuntimeConfig });
