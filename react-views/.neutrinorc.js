const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb(),
    react({
      hot: true,
      html: {
        title: 'Clean India App',
      }
    }),
    jest(),
    (neutrino)=>{
      neutrino.config.optimization.merge({
        splitChunks:{
          cacheGroups:{
            vendors:{
              chunks: 'all',
              test: /.[\\/]node_modules[\\/]/,
              name: 'vendors',
              filename: './assets/[name][contenthash].js'
            }
          }
        }
      })
    }
  ],
};
