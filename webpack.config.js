var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}});
var path = require('path');
var fs = require('fs');
var srcDir = './www/static/';

function getEntry() {
  var jsPath = path.resolve(srcDir, 'src/js');
  var dirs = fs.readdirSync(jsPath);
  var matchs = [],
    files = {};
  dirs.forEach(function(item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = path.resolve(srcDir, 'src/js', item);
    }
  });
  return files;
}

module.exports = {
  //devtool: 'false',
  devtool: 'source-map',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, './www/static/dist/js'), //文件输出目录
    filename: '[name].js',
    publicPath: './www/static/dist/js'
  },
  module: {
    loaders:
	[
    {test: /\.css$/, loader: "style!css" },
		{test: require.resolve("jquery"),loader: "expose?jQuery"},
		{test: require.resolve("jquery"),loader: "expose?$"},
		{test: /\.vue$/,loader: 'vue'},
		{test: /.js$/,exclude: /(node_modules|bower_components)/,loader: 'babel',query: {presets: ['es2015']}},
	]
  },
  resolve: {
    extensions: ['', '.js', '.css'],
    alias: {
      //avalon: path.join(__dirname, 'frame/avalon/avalon.mobile.js'),
      //fastclick:path.join(__dirname, 'frame/fastclick/lib/fastclick.js'),
      //weui:path.join(__dirname, 'frame/weui/jquery-weui.js'),
    }
  },
  plugins: [commonsPlugin,UglifyJsPlugin]
}
