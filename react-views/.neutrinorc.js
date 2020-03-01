const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');
const copy = require('@neutrinojs/copy');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    airbnb(),
    react({
      hot: false,
      html: {
        title: 'Clean India App',
      }
    }),
    jest(),
    copy({
      patterns:[
        {from: "./src/assets/", to: "./static/", toType: 'dir'}
      ]
    })
  ],
};
