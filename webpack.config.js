module.exports = {

  target   : 'node',
  externals: Object.keys(require('./package.json').dependencies),

  output: {
    libraryTarget: 'commonjs2',
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    noParse: /\.min\.js$/,
    loaders: [
      { test: /\.(es6|js)$/, loader: 'babel', exclude: /node_modules/ },
    ],
  },

};
