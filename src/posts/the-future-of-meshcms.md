---
title: "The Future of MeshCMS"
description: "Reflections on MeshCMS development after 3½ years, discussing the challenges of maintaining the current codebase and plans for a potential MeshCMS 4 rewrite with improved architecture."
category: "announcement"
date: "November 10, 2007"
readTime: 2
language: "en"
---


MeshCMS is 3½ years old and the last major release is 5 months old. It started as a work project when I was a freelance web designer/developer, but now I work for a company and I don't sell it anymore. Development has become slower, and even if recently I committed many changes, they are just related to what I was needed for my own website: I've added a blog module, jtidy to clean HTML, better storage of MeshCMS information in the HTML (using meta tags instead of attributes of the html tag), a Lang tag to localize themes and other minor features. I've also improved the listmenu and info tags and some modules.

I often think about a new major version: MeshCMS 4. The main reason is that the current code does not reflect what I've learned in these years and it is even incompatible with my current vision of how a web application must be developed. To fix this, I should rewrite the whole CMS just to improve quality code, but it would require much work to achieve the same level of features that it currently has. At the same time, I don't want to make substantial changes to the current codebase.

I've collected many ideas about how I should rewrite this CMS, and I really hope to have the time to do that. Unfortunately, it would be a long process, since I know that I should code it during spare time.

Nevertheless, MeshCMS 4 is in my wishlist, and it *will* be a rewrite, so I would take some time to define which core changes should happen before I start. Some of them are:

- an option to edit a page as draft
- integrated search engine
- no JSPs around (except maybe for themes and custom modules)
- a good API for modules
- accessible control panel
- file manager and page manager integrated into a single tool
- ability to recover old versions of pages
