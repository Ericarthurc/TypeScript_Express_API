// vue.config.js;
module.exports = {
  outputDir: "build",
  devServer: {
    open: "Google Chrome",
    proxy: {
      "/api": {
        target: "http://localhost:3010",
      },
    },
  },
};
