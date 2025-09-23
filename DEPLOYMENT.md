# Automated Deployment Setup

This repository is configured for automated HTML generation and deployment to GitHub Pages.

## How It Works

1. **Write**: Edit Markdown files in `src/posts/`
2. **Push**: Commit and push to `main` branch
3. **Auto-build**: GitHub Actions runs `npm run build:posts`
4. **Auto-deploy**: Generated HTML automatically deploys to GitHub Pages

## GitHub Pages Configuration Required

### One-time Setup (Repository Owner):

1. **Go to Repository Settings** → **Pages**
2. **Source**: Select "GitHub Actions" (not "Deploy from a branch")
3. **Custom Domain**: Optional - configure your domain if needed

### Workflow Triggers

The workflow automatically runs when you push changes to:
- `src/posts/**` (any Markdown post)
- `build-posts.js` (build script)
- `index.html` (homepage)
- `styles.css` (styling)
- `package.json` (dependencies)

### Manual Trigger

You can also trigger builds manually:
- Go to **Actions** tab → **Build and Deploy Blog** → **Run workflow**

## Workflow Process

```yaml
push to main branch
    ↓
GitHub Actions detects changes
    ↓
Install Node.js and dependencies
    ↓
Run npm run build:posts
    ↓
Deploy entire site to GitHub Pages
    ↓
Site updated at your GitHub Pages URL
```

## File Structure for Deployment

```
Repository Root (deployed to GitHub Pages)
├── index.html              # Homepage
├── styles.css              # Styling
├── header-cromoteca.svg     # Logo
├── CNAME                    # Custom domain config
├── src/posts/              # Markdown sources (for reference)
└── dist/posts/             # Generated HTML (from CI)
```

## Benefits

- **No manual builds**: Write Markdown, push, done!
- **Always in sync**: Site updates automatically with your changes
- **Version control**: Full history of both source and generated files
- **Fast deployment**: Builds typically complete in 1-2 minutes

## Troubleshooting

- **Build fails**: Check the Actions tab for error details
- **Site not updating**: Verify GitHub Pages source is set to "GitHub Actions"
- **404 errors**: Ensure your paths in `index.html` match the generated structure

## Development Workflow

```bash
# 1. Write new post
echo '---
title: "My New Post"
category: "technical"
date: "December 25, 2024"
readTime: 5
---

# My New Post

Content here...' > src/posts/my-new-post.md

# 2. Test locally (optional)
npm run build:posts
npm run dev

# 3. Commit and push
git add src/posts/my-new-post.md
git commit -m "Add new post: My New Post"
git push

# 4. GitHub Actions handles the rest!
```

Your site will be automatically updated within minutes of pushing! 🚀