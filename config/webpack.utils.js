var ExtractTextPlugin = require('extract-text-webpack-plugin');

const resolveProjectPath = (projectName, projectFile) => `./src/${projectFile}`;

module.exports = {
  resolveProjectPath,
};