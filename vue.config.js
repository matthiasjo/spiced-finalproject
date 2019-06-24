module.exports = {
  devServer: {
    proxy: {
      '/*': {
        target: "http://localhost:8081",
        logLevel: 'debug'
      }
    }
  }
}
