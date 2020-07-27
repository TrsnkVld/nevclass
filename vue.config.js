const webpack = require("webpack");
const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const prerenderConfig = require("./prerender.config");

const withPrerender = process.env.VUE_APP_WITH_PRERENDER === 'true';
const withWidgets = process.env.VUE_APP_WITH_WIDGETS === 'true';
const proxyURL = process.env.VUE_APP_PROXY_URL;

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === "production" ? "/build/" : "/",
  assetsDir: "./",
  outputDir: "./htdocs/build/",

  devServer: {
    proxy: {
      "^/(api|3d|upload)/": {
        target:
          process.env.SERVER || "http://nevclass.ss.spider.playnext.net:40088",
        changeOrigin: true,
      },
    },
  },

  filenameHashing: false, 

  configureWebpack: {
    plugins: [
      //new BundleAnalyzerPlugin(),
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl",
			}),
      ...(withPrerender ? [prerenderConfig(withWidgets, proxyURL)] : []),
    ],
  },
};
