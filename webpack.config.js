var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './src/app.js']
  },

  output: {
    path: path.resolve(__dirname, 'public/built'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env']
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}
    ]
  },

  target: 'node',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(ipc)$"))
  ]
}
