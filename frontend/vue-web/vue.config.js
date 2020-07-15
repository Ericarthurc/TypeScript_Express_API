// vue.config.js;
module.exports = {
  outputDir: 'build',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3010',
      },
    },
  },
};
