const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR', 'last 2 chrome versions'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [],
        },
      },
    ],
  },
  plugins: [],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};
