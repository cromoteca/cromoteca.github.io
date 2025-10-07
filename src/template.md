---
title: "Your Post Title Here"
description: "Brief description of your post that appears in the post card and meta tags"
category: "learning"  # Examples: learning, technical, updates, opinions
date: "December 25, 2024"
readTime: 8  # Estimated reading time in minutes
slug: "your-post-slug"  # Optional: custom filename (defaults to markdown filename)
---

# Your Post Title Here

This is the introduction paragraph of your blog post. Write a compelling opening that hooks your readers and gives them a preview of what they'll learn.

## Main Section

Use regular Markdown syntax to write your content. The build script will automatically apply your blog's theme and color-coding based on the category you specified in the frontmatter.

### Subsections Work Great

You can use all standard Markdown features:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- `inline code` for small code snippets
- Links to [external resources](https://example.com)

### Code Blocks

```javascript
// Code blocks are syntax highlighted
function greetUser(name) {
    return `Hello, ${name}! Welcome to Cromoteca.`;
}

console.log(greetUser('Developer'));
```

```bash
# Shell commands work too
npm install marked gray-matter
node build-posts.js
```

### Lists and More

1. **Numbered lists** work perfectly
2. Use them for step-by-step instructions
3. Or ordered procedures

Bullet points are great for:
- Feature lists
- Quick tips
- Unordered items

### Blockquotes

> Use blockquotes for important callouts, quotes, or highlighting key concepts that deserve special attention.

## Categories and Colors

Choose the right category for automatic color coding:

- **learning** (Green): Tutorials, guides, learning resources, beginner content
- **technical** (Blue): Deep technical content, architecture, APIs, advanced topics
- **updates** (Red): Important announcements, security updates, breaking changes

## Best Practices

1. **Clear headings**: Use descriptive h2 and h3 headings to structure content
2. **Code examples**: Include practical, runnable code examples
3. **Appropriate length**: Match your `readTime` estimate to actual content length
4. **SEO-friendly**: Write good descriptions and use meaningful headings

## Next Steps

After writing your Markdown post:

1. Save it in `posts/markdown/` directory
2. Run `node build-posts.js` to generate the HTML
3. Add the post entry to your `index.html`
4. Test locally before committing

Happy blogging! 🚀
