import os
import re

posts_dir = 'src/posts'

for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'):
        continue

    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into frontmatter and body
    parts = content.split('---\n', 2)
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = parts[2]

        # Remove H1 titles from body (lines starting with "# ")
        lines = body.split('\n')
        new_lines = []
        for line in lines:
            if not line.startswith('# '):
                new_lines.append(line)

        # Reconstruct
        new_content = f"---\n{frontmatter}---\n" + '\n'.join(new_lines)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✓ Processed: {filename}")

print("\nDone!")
