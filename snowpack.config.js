// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist/",
  },
  plugins: [
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
  ],
  alias: {
    "redux-duck": "redux-duck/dist",
  },
  packageOptions: {},
  devOptions: {
    port: 8081,
  },
  buildOptions: {
    baseUrl: "src/",
    out: "dist/",
  },
}
