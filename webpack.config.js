const path = require('path')

module.exports = {
  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/app.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
}
