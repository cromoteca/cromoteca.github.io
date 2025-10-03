# Claude Code Agents

This document describes the specialized agents and automation used in the Cromoteca multilingual blog project.

## Available Agents

### Post Builder Agent
**Purpose**: Automate the creation of new blog posts from Markdown to final HTML deployment.

**Tasks**:
- Create Markdown file in `src/posts/`
- Ensure proper language frontmatter (en, fr, or it)
- Generate HTML using `npm run build:posts`
- Posts are automatically added to `index.html` and organized by language
- Maintain color-coded language system (red/English, blue/French, green/Italian)

### Content Reviewer Agent
**Purpose**: Review blog posts for consistency, quality, and proper formatting.

**Tasks**:
- Verify frontmatter fields are complete and valid (especially `language`)
- Check Markdown syntax and code block formatting
- Ensure language colors are correctly applied
- Validate read time estimates
- Review SEO descriptions and meta tags
- Verify proper `lang` attribute in generated HTML

### Translation Agent
**Purpose**: Help create multilingual versions of posts.

**Tasks**:
- Identify posts that could be translated
- Assist with creating translated versions
- Ensure translations maintain consistent category tags
- Verify all language versions have correct frontmatter

### Deployment Agent
**Purpose**: Handle the deployment process to GitHub Pages.

**Tasks**:
- Run build process (`npm run build:posts`)
- Verify all generated HTML files are valid
- Check that posts are in correct language directories (`posts/en/`, `posts/fr/`, `posts/it/`)
- Create git commits with proper messages
- Push to main branch for GitHub Pages deployment

## Workflow Integration

### New Post Workflow
1. Use **Post Builder Agent** to create post structure with language frontmatter
2. Write content in Markdown in your chosen language
3. Use **Content Reviewer Agent** to validate
4. Optionally use **Translation Agent** to create versions in other languages
5. Use **Deployment Agent** to publish

### Language System
- **Red (English)**: Posts in English (`language: en`)
- **Blue (Français)**: Posts in French (`language: fr`)
- **Green (Italiano)**: Posts in Italian (`language: it`)

Browser language detection automatically shows posts in the user's preferred language.

## Configuration

Claude Code settings are stored in `.claude/settings.local.json`.

## Best Practices

- Always use the Markdown workflow (`src/posts/*.md`)
- Include `language` field in frontmatter (required: en, fr, or it)
- Use `category` field for optional topic categorization
- Run `npm run build:posts` before committing
- Follow the color system for languages
- Include complete frontmatter in all posts
- Test locally before deployment
- Consider creating content in multiple languages when appropriate
