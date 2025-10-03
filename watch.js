#!/usr/bin/env node
/**
 * File watcher for Cromoteca blog
 *
 * Watches for changes to:
 * - src/posts/*.md
 * - src/index.template.html
 * - build-posts.js
 *
 * Automatically rebuilds when changes are detected
 */

const chokidar = require('chokidar');
const { execSync } = require('child_process');
const path = require('path');

console.log('👀 Watching for changes...\n');

// Watch source files
const watcher = chokidar.watch([
  'src/posts/**/*.md',
  'src/index.template.html',
  'build-posts.js'
], {
  persistent: true,
  ignoreInitial: true
});

let rebuilding = false;

function rebuild(changedFile) {
  if (rebuilding) return;

  rebuilding = true;
  const fileName = path.basename(changedFile);

  console.log(`\n🔄 Change detected: ${fileName}`);
  console.log('🔨 Rebuilding...\n');

  try {
    execSync('node build-posts.js', { stdio: 'inherit' });
    console.log('\n✅ Rebuild complete! Refresh your browser.\n');
  } catch (error) {
    console.error('\n❌ Build failed!\n');
  } finally {
    rebuilding = false;
  }
}

watcher
  .on('change', rebuild)
  .on('add', rebuild)
  .on('unlink', (file) => {
    console.log(`\n🗑️  File deleted: ${path.basename(file)}`);
    rebuild(file);
  });

console.log('Watching:\n');
console.log('  📝 src/posts/**/*.md');
console.log('  🏠 src/index.template.html');
console.log('  ⚙️  build-posts.js\n');
console.log('Press Ctrl+C to stop watching.\n');
