const path = require('path');


var rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader', 'eslint-loader']
  }
]

var serverConfig = {
  mode:'development',
  target: 'node',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'qrme.js',
    libraryTarget: 'umd',
    library: 'qrme'
  },
  module: {
    rules: rules
  }
  
};

var clientConfig = {
  mode:'development',
  target: 'web', // 
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'qrme.web.js',
    libraryTarget: 'umd',
    library: 'qrme'
  },
  module: {
    rules: rules
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    path: 'empty'
  }
  
};

module.exports = [serverConfig, clientConfig];