const path = require("path");
module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader")
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });

  storybookBaseConfig.resolve.extensions.push(".ts", ".tsx");
  return storybookBaseConfig;
};