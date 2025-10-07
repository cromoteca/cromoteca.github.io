---
title: "Some Thoughts About Upgrading To MeshCMS 4"
description: "Considerations on backward compatibility when migrating from MeshCMS 3 to MeshCMS 4, including changes to modules, configuration, and SiteMesh integration."
category: "technical"
date: "November 28, 2009"
readTime: 2
language: "en"
---

As usual, I'm spending part of my weekend developing MeshCMS 4. Before entering the real topic of this post, let me show you the very first page served by MeshCMS 4 with a real theme, although incomplete. I'm very satisfied with MeshCMS 4, which is approaching its first alpha at a very fast pace.

![Screenshot of the first MeshCMS 4 page with a real theme applied](/images/blog/firstmeshcms4page.png)

That said, I want to let you know about compatibility with MeshCMS 3. I'm not very concerned about that, since I'm not using MeshCMS for my business (I'm employed by a company that work on the .NET platform and has its own commercial CMS). I have few sites to convert to MeshCMS 4 when it will be ready, so it's not big deal for me. Things might be different for others though.

Since MeshCMS is file based, moving files to the new installation is enough to have pages recognized and added to the site map as usual. But MeshCMS pages not always are plain HTML: there are modules, and MeshCMS 4 modules have been completely redesigned, with no one-to-one matching with old ones. Furthermore, their configuration is written in the page head using JSON instead of META tags. This allows for more sophisticated features, in fact modules are one of the biggest advantages in MeshCMS 4. While it's still possible to think of a tool that reads a MeshCMS 3 page and rewrites it with the best matching configuration possible, I'm not willing to write that tool, so I will leave it to volunteers.

There are also other compatibility issues: since I'm using JSON in pages, I chose to use it to save all data that were previously written in XML (XStream was also cause of many issues with class loaders). That involves configuration files and user data.

Last but not least, MeshCMS 4 will no longer use SiteMesh, so those who were using it to do other than applying MeshCMS themes will need to rethink their setup, although I'm convinced that it will still possible to use SiteMesh to apply themes in MeshCMS 4, but configuring them in the SiteMesh XML configuration instead of relying on the visual tools offered by the CMS to pick up themes. I'll test that before the first official stable release.
