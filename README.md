# Cromoteca - Software in Colors

A multilingual technical blog with color-coded languages, featuring Markdown-to-HTML workflow for easy content creation.

## 🎨 Color System

- **Red (English)**: Articles in English
- **Blue (Français)**: Articles in French
- **Green (Italiano)**: Articles in Italian

The blog automatically detects your browser language and shows posts in that language by default.

## ✍️ Writing New Posts

### Using Markdown (Recommended)

1. Create a new `.md` file in `src/posts/`
2. Add frontmatter with post details:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description for cards and SEO"
   language: "en"  # en, fr, or it
   category: "technical"  # optional, any category you want
   date: "December 25, 2024"
   readTime: 8  # minutes
   ---
   ```
3. Write your content in Markdown
4. Build HTML: `npm run build:posts`
5. The post will be automatically added to the homepage
6. Test and commit

### Frontmatter Fields

- **title**: Post title (required)
- **description**: Brief description for post cards and meta tags (required)
- **language**: One of `en`, `fr`, `it` (required)
- **category**: Any category tag you want (optional)
- **date**: Display date in readable format (required)
- **readTime**: Estimated reading time in minutes (required)

### Markdown Features Supported

- Standard Markdown syntax
- Syntax-highlighted code blocks
- Blockquotes (styled with language colors)
- Lists, tables, links
- Automatic color-coded styling based on language

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build posts from Markdown
npm run build:posts

# Start development server
npm run dev

# Build and preview
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── index.template.html # Homepage template (committed)
│   └── posts/              # Markdown source files (committed)
│       └── *.md           # Your blog posts
├── index.html              # Generated homepage (ignored by git)
├── posts/                  # Generated posts (ignored by git)
│   ├── en/                 # English posts
│   ├── fr/                 # French posts
│   └── it/                 # Italian posts
├── styles.css              # Complete theme
├── build-posts.js          # Markdown to HTML converter
├── package.json            # Dependencies and scripts
├── header-cromoteca.svg    # Logo
├── CNAME                   # GitHub Pages domain
└── README.md              # This file
```

**Note**: `index.html` and `posts/` are generated files and are not committed to git. Only the source files in `src/` are version controlled.

## 🚀 Deployment

This site is configured for GitHub Pages:

1. Run `npm run build:posts` to generate `index.html` and all post HTML files
2. Push changes to the `main` branch (only source files in `src/` are committed)
3. **Important**: Before deploying, ensure you commit the deletion of `index.html` from git tracking (it should be generated, not committed)
4. Set up a GitHub Actions workflow or build script to run `npm run build:posts` on deployment
5. Custom domain configured via `CNAME` file

**Note**: Since `index.html` is now ignored by git, you'll need to build it during deployment. Consider adding a GitHub Actions workflow to run the build process.

## 🎯 Features

- **Color-coded languages** with automatic detection
- **Multilingual support** (English, French, Italian)
- **Browser language detection** - automatically shows posts in your language
- **Responsive design** for all devices
- **JavaScript filtering** by language
- **Markdown workflow** for easy content creation
- **Professional typography** with code highlighting
- **SEO-friendly** with proper meta tags and language attributes
- **Clean, minimal design** focused on readability

## 📝 How It Works

1. Write your post in Markdown in `src/posts/` with language frontmatter
2. Run `npm run build:posts` to generate HTML files
3. Posts are automatically organized by language in `posts/en/`, `posts/fr/`, or `posts/it/`
4. The homepage is automatically updated with all posts
5. Browser language detection shows relevant posts on page load

---

**© 2025 Luciano Vernaschi.**