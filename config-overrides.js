const webpack = require("webpack");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = function override(config, env) {
  if (env === "production") {
    config.devtool = "source-map"
    config.plugins.push(
      sentryWebpackPlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "sudoblock",
        project: "sudoblock-icon-tracker-web",
        include: "./build",
        urlPrefix: "~/static/js"
      })
    );
  }


  config.resolve.fallback = {
    ...config.resolve.fallback,
    'process/browser': require.resolve('process/browser'),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer")
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"]
    }),
    new webpack.ProvidePlugin({
      process: "process/browser"
    })
  ];



  return config;
};
