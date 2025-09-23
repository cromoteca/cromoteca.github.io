# Cromoteca - Software in Colors

A technical blog with color-coded content categories, now featuring Markdown-to-HTML workflow for easy content creation.

## 🎨 Color System

- **Green (Learning)**: Tutorials, guides, learning resources
- **Blue (Technical)**: Deep technical content, architecture, APIs
- **Red (Updates)**: Important announcements, security updates, breaking changes

## ✍️ Writing New Posts

### Using Markdown (Recommended)

1. Create a new `.md` file in `posts/markdown/`
2. Add frontmatter with post details:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description for cards and SEO"
   category: "learning"  # learning, technical, or updates
   date: "December 25, 2024"
   readTime: 8  # minutes
   ---
   ```
3. Write your content in Markdown
4. Build HTML: `npm run build:posts`
5. Add post entry to `index.html` posts grid
6. Test and commit

### Frontmatter Fields

- **title**: Post title (required)
- **description**: Brief description for post cards and meta tags (required)
- **category**: One of `learning`, `technical`, `updates` (required)
- **date**: Display date in readable format (required)
- **readTime**: Estimated reading time in minutes (required)
- **slug**: Custom filename (optional, defaults to .md filename)

### Markdown Features Supported

- Standard Markdown syntax
- Syntax-highlighted code blocks
- Blockquotes (styled with category colors)
- Lists, tables, links
- Automatic color-coded styling based on category

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
├── index.html              # Blog homepage
├── styles.css              # Complete theme
├── build-posts.js          # Markdown to HTML converter
├── package.json            # Dependencies and scripts
├── posts/
│   ├── markdown/           # Markdown source files
│   │   ├── template.md     # Template for new posts
│   │   └── *.md           # Your blog posts
│   └── *.html             # Generated HTML files
├── header-cromoteca.svg    # Logo
├── CNAME                   # GitHub Pages domain
└── README.md              # This file
```

## 🚀 Deployment

This site is configured for GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Pages will automatically serve from the repository
3. Custom domain configured via `CNAME` file

## 🎯 Features

- **Color-coded categories** with meaningful organization
- **Responsive design** for all devices
- **JavaScript filtering** by category
- **Markdown workflow** for easy content creation
- **Professional typography** with code highlighting
- **SEO-friendly** with proper meta tags
- **Clean, minimal design** focused on readability

## 📝 Adding Posts to Homepage

After generating HTML from Markdown, add the post to your homepage:

```html
<article class="post-card technical" data-category="technical">
    <div class="post-header">
        <div class="post-category blue">
            <div class="category-dot blue"></div>
            <span>Technical</span>
        </div>
        <time class="post-date">December 23, 2024</time>
    </div>
    <h4 class="post-title">Your Post Title</h4>
    <p class="post-excerpt">Brief description of your post...</p>
    <div class="post-footer">
        <a href="posts/your-post.html" class="post-link blue-link">Read More</a>
        <span class="post-read-time">12 min read</span>
    </div>
</article>
```

---

**© 2025 Luciano Vernaschi. Software in Colors.**