#!/usr/bin/env node
/**
 * Markdown to HTML Blog Post Converter for Cromoteca
 *
 * Converts Markdown posts to themed HTML pages
 * Usage: node build-posts.js
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');

// Configure marked for better code highlighting
marked.setOptions({
  highlight: function(code, lang) {
    return `<code class="language-${lang || 'text'}">${escapeHtml(code)}</code>`;
  },
  breaks: true,
  gfm: true
});

// Escape HTML entities
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// HTML template for blog posts
function getPostTemplate(frontmatter, content, colorClass) {
  const { title, description, category, date, readTime } = frontmatter;

  const categoryColors = {
    learning: 'green',
    technical: 'blue',
    updates: 'red'
  };

  const colorName = categoryColors[category] || 'blue';
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Cromoteca</title>
    <meta name="description" content="${description}">
    <link rel="stylesheet" href="../../styles.css">
    <style>
        .post-content {
            max-width: 800px;
            margin: 0 auto;
            padding: var(--spacing-xl) var(--spacing-sm);
        }

        .post-meta {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 1px solid var(--color-gray-border);
        }

        .post-content h1 {
            font-size: 2.5rem;
            color: var(--color-gray-dark);
            margin-bottom: var(--spacing-sm);
            line-height: 1.2;
        }

        .post-content h2 {
            color: var(--color-${colorName});
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-md);
        }

        .post-content h3 {
            color: var(--color-gray-dark);
            margin-top: var(--spacing-md);
            margin-bottom: var(--spacing-sm);
        }

        .post-content p {
            line-height: 1.7;
            margin-bottom: var(--spacing-md);
            color: var(--color-text-primary);
        }

        .post-content ul, .post-content ol {
            margin-bottom: var(--spacing-md);
            padding-left: var(--spacing-lg);
        }

        .post-content li {
            margin-bottom: var(--spacing-xs);
            line-height: 1.6;
        }

        .post-content code {
            background: var(--color-gray-medium);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.9em;
        }

        .post-content pre {
            background: var(--color-gray-dark);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            overflow-x: auto;
            margin: var(--spacing-md) 0;
            line-height: 1.4;
        }

        .post-content pre code {
            background: none;
            padding: 0;
            color: inherit;
        }

        .post-content blockquote {
            border-left: 4px solid var(--color-${colorName});
            background: rgba(171, ${colorName === 'green' ? '255, 177' : colorName === 'blue' ? '195, 255' : '171, 171'}, 0.1);
            padding: var(--spacing-md);
            margin: var(--spacing-md) 0;
            font-style: italic;
        }

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: var(--spacing-xs);
            color: var(--color-${colorName});
            text-decoration: none;
            font-weight: 500;
            margin-bottom: var(--spacing-lg);
        }

        .back-link:hover {
            text-decoration: underline;
        }

        .tip-box {
            background: rgba(171, ${colorName === 'green' ? '255, 177' : colorName === 'blue' ? '195, 255' : '171, 171'}, 0.1);
            border: 1px solid var(--color-${colorName});
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin: var(--spacing-md) 0;
        }

        .tip-box h4 {
            color: var(--color-${colorName});
            margin-top: 0;
            margin-bottom: var(--spacing-sm);
        }

        .warning-box {
            background: rgba(255, 171, 171, 0.1);
            border: 1px solid var(--color-red);
            border-radius: var(--border-radius);
            padding: var(--spacing-md);
            margin: var(--spacing-md) 0;
        }

        .warning-box h4 {
            color: var(--color-red);
            margin-top: 0;
            margin-bottom: var(--spacing-sm);
        }

        @media (max-width: 768px) {
            .post-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: var(--spacing-xs);
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="logo-section">
                <a href="../../index.html" class="logo-link">
                    <img src="../../header-cromoteca.svg" alt="Cromoteca Logo" class="logo">
                    <div class="brand">
                        <h1 class="site-title">Cromoteca</h1>
                        <p class="tagline">Software in Colors</p>
                    </div>
                </a>
            </div>
        </div>
    </header>

    <main class="main">
        <article class="post-content">
            <a href="../../index.html" class="back-link">← Back to Blog</a>

            <h1>${title}</h1>

            <div class="post-meta">
                <div class="post-category ${colorName}">
                    <div class="category-dot ${colorName}"></div>
                    <span>${categoryName}</span>
                </div>
                <time class="post-date">${date}</time>
                <span class="post-read-time">${readTime} min read</span>
            </div>

            ${content}
        </article>
    </main>

    <footer class="footer">
        <div class="container">
            <p class="footer-text">&copy; 2025 Luciano Vernaschi.</p>
        </div>
    </footer>
</body>
</html>`;
}

// Process a single Markdown file
function processMarkdownFile(filePath) {
  try {
    const markdownContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdownBody } = matter(markdownContent);

    // Validate required frontmatter
    const required = ['title', 'description', 'category', 'date', 'readTime'];
    for (const field of required) {
      if (!frontmatter[field]) {
        throw new Error(`Missing required frontmatter field: ${field}`);
      }
    }

    // Convert markdown to HTML
    const htmlContent = marked(markdownBody);

    // Generate complete HTML page
    const fullHtml = getPostTemplate(frontmatter, htmlContent);

    // Determine output filename
    const filename = path.basename(filePath, '.md');
    const outputPath = path.join('dist', 'posts', `${filename}.html`);

    // Write HTML file
    fs.writeFileSync(outputPath, fullHtml);

    console.log(`✅ Generated: ${outputPath}`);

    return {
      filename,
      frontmatter,
      outputPath
    };
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

// Generate homepage post blocks
function generateHomepagePostBlocks(posts) {
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA; // Newest first
  });

  const categoryColors = {
    learning: 'green',
    technical: 'blue',
    updates: 'red'
  };

  const categoryNames = {
    learning: 'Learning',
    technical: 'Technical',
    updates: 'Updates'
  };

  return sortedPosts.map(post => {
    const { title, description, category, date, readTime } = post.frontmatter;
    const colorName = categoryColors[category] || 'blue';
    const categoryName = categoryNames[category] || 'Technical';
    const filename = post.filename;

    return `                    <!-- ${categoryName} Post -->
                    <article class="post-card ${category}" data-category="${category}">
                        <div class="post-header">
                            <div class="post-category ${colorName}">
                                <div class="category-dot ${colorName}"></div>
                                <span>${categoryName}</span>
                            </div>
                            <time class="post-date">${date}</time>
                        </div>
                        <h4 class="post-title">${title}</h4>
                        <p class="post-excerpt">${description}</p>
                        <div class="post-footer">
                            <a href="dist/posts/${filename}.html" class="post-link ${colorName}-link">Read More</a>
                            <span class="post-read-time">${readTime} min read</span>
                        </div>
                    </article>`;
  }).join('\n\n');
}

// Update homepage with generated post blocks
function updateHomepage(posts) {
  const indexPath = 'index.html';

  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found');
    return;
  }

  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Find the posts grid section
  const startMarker = '<div class="posts-grid">';
  const endMarker = '</div>\n            </div>\n        </section>';

  const startIndex = indexContent.indexOf(startMarker);
  const endIndex = indexContent.indexOf(endMarker, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.error('❌ Could not find posts grid section in index.html');
    return;
  }

  // Generate new post blocks
  const postBlocks = generateHomepagePostBlocks(posts);

  // Replace the posts grid content
  const newContent = indexContent.substring(0, startIndex + startMarker.length) +
    '\n' + postBlocks + '\n                ' +
    indexContent.substring(endIndex);

  fs.writeFileSync(indexPath, newContent);
  console.log('✅ Updated homepage with generated post blocks');
}

// Main build function
function buildPosts() {
  const markdownDir = path.join('src', 'posts');
  const outputDir = path.join('dist', 'posts');

  // Check if source directory exists
  if (!fs.existsSync(markdownDir)) {
    console.log('📁 Creating src/posts directory...');
    fs.mkdirSync(markdownDir, { recursive: true });
    console.log('✅ Directory created. Add your .md files to src/posts/');
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Get all .md files
  const markdownFiles = fs.readdirSync(markdownDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(markdownDir, file));

  if (markdownFiles.length === 0) {
    console.log('📝 No Markdown files found in src/posts/');
    console.log('   Add your .md files there and run this script again.');
    return;
  }

  console.log(`🔨 Building ${markdownFiles.length} posts...\n`);

  const processedPosts = [];

  // Process each markdown file
  for (const filePath of markdownFiles) {
    const result = processMarkdownFile(filePath);
    if (result) {
      processedPosts.push(result);
    }
  }

  console.log(`\n🎉 Successfully built ${processedPosts.length} posts!`);

  // Update homepage with generated post blocks
  if (processedPosts.length > 0) {
    updateHomepage(processedPosts);
  }

  console.log('\n📋 Next steps:');
  console.log('1. Test your website locally');
  console.log('2. Commit the changes (only src/ files, dist/ is ignored)');
  console.log('\n✨ Posts automatically sorted by date (newest first) on homepage!');
}

// Check if dependencies are installed
function checkDependencies() {
  try {
    require.resolve('marked');
    require.resolve('gray-matter');
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
if (require.main === module) {
  console.log('🎨 Cromoteca Blog Post Builder\n');

  if (!checkDependencies()) {
    console.log('📦 Installing required dependencies...');
    const { execSync } = require('child_process');
    try {
      execSync('npm install marked gray-matter', { stdio: 'inherit' });
      console.log('✅ Dependencies installed!\n');
    } catch (error) {
      console.error('❌ Failed to install dependencies. Please run:');
      console.error('   npm install marked gray-matter');
      process.exit(1);
    }
  }

  buildPosts();
}

module.exports = { processMarkdownFile, getPostTemplate };