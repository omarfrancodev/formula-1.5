export default {
  entry: './main.js', // Your main entry point
  output: {
    filename: 'bundle.js' // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to all JavaScript files
        loader: 'babel-loader' // Use Babel loader for transpiling (optional)
      }
    ]
  }
}
