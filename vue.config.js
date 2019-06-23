module.exports = {
  devServer: {
    proxy: {
      "/*": {
        target: "http://localhost:8081",
        logLevel: "debug"
      },
      "/websocket": {
        target: "http://localhost:8081",
        ws: false,
        changeOrigin: true
      }
    }
  }
};
