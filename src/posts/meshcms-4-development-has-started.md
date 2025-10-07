---
title: "MeshCMS 4 Development Has Started"
description: "Announcing the start of MeshCMS 4 development with new goals including removing library dependencies, supporting multiple templating technologies, and implementing search, drafts, and easier upgrades."
category: "announcement"
date: "March 20, 2009"
readTime: 3
language: "en"
---

I'm happy to announce that I'm finally working on MeshCMS 4.

First of all, the timeline. When I started developing this CMS, I was a freelancer, but now I work for a [web agency](http://www.arscolor.com/), so development is relegated to spare time and there's no roadmap, sorry.

Then, the main goals. I want to keep the fundamental ones intact: MeshCMS must be file-based and really easy to use for non technically minded people. It must also be easy to install and administer.

I decided to say goodbye to all libraries that can give incompatibilities on some servers, so no XStream and no SiteMesh. I know that SiteMesh is a fundamental pillar of all MeshCMS versions released to date, but I want to enjoy taking a different approach.

I also want to say goodbye to JSPs, although I want to let people free to write modules and themes using them. The plan is to create some objects that contain all required information, then put them in the request scope, so all technologies can be used to write themes and modules: JSPs, FreeMarker, Velocity and so on.

## System Requirements

New system requirements will be:

- Java SE 5
- Servlet 2.4

## Open Issues to Solve

There are some open issues of the current version that I want to solve "by design":

- internal search
- page drafts
- upgrades

Search should be managed by Lucene. That's not a hard task, but if I have to use it, I want to use it extensively, e.g. to create different ways to organize information, or at least to offer an API to do that. Let's see what happens.

Page drafts are not so hard too, if they are kept into account from the beginning.

Regarding upgrades, the issue is that MeshCMS is different from most Java web applications since it changes over time due to user actions: create/edit pages, upload files and so on. Most applications are immutable (they store data in a database), and so they can be upgraded by deploying a new WAR. My idea is to keep MeshCMS self-contained into one or more JARs, so when you want to upgrade, you just have to replace the old JARs with the new ones. This is a new main goal for me.

I would also like to remove any dependency from TinyMCE, so everyone can choose between it, (F)CKeditor and maybe other editors.

I'm thinking to develop the administration interface using GWT, without other widgets toolkits to keep size and weight acceptable. But this is subject to change. In the meanwhile, I hope to write a good core systems and keep it separated from the interface. Wicket is another good candidate.

Maybe some of you won't approve the idea of a code rewrite, but the truth is that MeshCMS is a hobby project, so I need to do some that I can enjoy. Furthermore, the current code is too old and confused, I'm a better developer today.

That's all for now, but stay tuned!
