const path = require('path');

// Base directories
const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');
const DIST_DIR = path.join(ROOT, 'posts');

module.exports = {
  paths: {
    // Absolute paths for source directories
    postsSource: path.join(SRC_DIR, 'posts'),
    templateSource: SRC_DIR,

    // Absolute paths for output directories
    postsOutput: DIST_DIR,
    rootOutput: ROOT,

    // Absolute paths for template files
    indexTemplate: path.join(SRC_DIR, 'index.template.html'),
    indexOutput: path.join(ROOT, 'index.html'),

    // Asset file names
    assets: {
      favicon: 'favicon.ico',
      faviconPng: 'favicon-192.png',
      stylesheet: 'styles.css',
      logo: 'header-cromoteca.svg',
      indexHtml: 'index.html'
    }
  },

  // Language configuration
  languages: {
    en: {
      name: 'English',
      color: 'red'
    },
    fr: {
      name: 'Français',
      color: 'blue'
    },
    it: {
      name: 'Italiano',
      color: 'green'
    }
  },

  // Helper function to get relative path from a post file to an asset in root
  // postPath: absolute path to the output HTML file (e.g., /path/to/posts/en/foo.html)
  // assetName: name of the asset from paths.assets (e.g., 'favicon', 'stylesheet')
  getAssetPath: function(postPath, assetName) {
    const assetFilename = this.paths.assets[assetName] || assetName;
    const assetAbsolutePath = path.join(this.paths.rootOutput, assetFilename);
    const relativePath = path.relative(path.dirname(postPath), assetAbsolutePath);
    // On Windows, path.relative returns backslashes, but URLs need forward slashes
    return relativePath.split(path.sep).join('/');
  },

  // Helper function to get relative path from a post to home
  // postPath: absolute path to the output HTML file
  getHomePath: function(postPath) {
    return this.getAssetPath(postPath, 'indexHtml');
  },

  // Helper function to get relative path from index.html to a post
  // postPath: absolute path to the output HTML file
  getPostPathFromHome: function(postPath) {
    const relativePath = path.relative(this.paths.rootOutput, postPath);
    // On Windows, path.relative returns backslashes, but URLs need forward slashes
    return relativePath.split(path.sep).join('/');
  }
};
