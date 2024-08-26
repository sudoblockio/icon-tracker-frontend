const webpack = require("webpack");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
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

  console.log(config.resolve);
  console.log(config.plugins);
  return config;
};
