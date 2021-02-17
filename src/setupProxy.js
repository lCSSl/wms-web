const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware(process.env.REACT_APP_BASE_API, {
      target: process.env.REACT_APP_SERVICE_URL,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.REACT_APP_BASE_API]: ''
      }
    }),
  )
}
