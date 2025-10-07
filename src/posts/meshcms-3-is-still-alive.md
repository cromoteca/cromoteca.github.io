---
title: "MeshCMS 3 Is Still Alive"
description: "Announcing MeshCMS 3.6 with security fixes, updated components including TinyMCE and jQuery, and a new default theme created with Artisteer."
category: "announcement"
date: "May 12, 2011"
readTime: 2
language: "en"
---


I keep trying to find some time to develop MeshCMS 4, but unfortunately there are many features that need to be implemented, and some design errors that need to be fixed. Despite of this, MeshCMS 4 is running this website and some others since one year.

I was not working on MeshCMS 3 at all, even if there are some websites around that use it. But I recently discovered a report about a vulnerability in MeshCMS 3 and I decided to fix it.

While working with the code, I realized that it was not too hard to add some other improvements to the new 3.x release, like upgrading TinyMCE to its latest version, thus fixing compatibility with modern browsers.

## Changes in 3.6

So, these are the changes that I implemented in a very short time:

- Fixed vulnerability reported at http://secunia.com/advisories/42946
- TinyMCE updated to 3.4.2
- jQuery updated to 1.6
- Colorbox updated to 1.3.17
- Thumbnail creation performed using less memory
- Added Artisteer support to listmenu
- Created a new default theme using Artisteer

Then, there are some other features that I implemented long time ago but were never released:

- Added support for page images in blog and RSS
- Added a parameter to blog to display only pages with a specified tag
- Added support for Colorbox in the image gallery
- Links in comments now have the rel=nofollow attribute
- Added sort option to the include module

## New Default Theme

And this is the new default theme, named **Jeans**:

![MeshCMS 3.6 Jeans theme](/images/blog/meshcms-4-jeans.jpg)

This theme has been created using [Artisteer](http://www.artisteer.com/). Creating a theme using this software requires about 30 minutes: I choose to create a Wordpress template, then I export as HTML. It creates a file named page.html that must be renamed to main.jsp and must be made dynamic by inserting the appropriate JSP code. You can find that code in the main.jsp file of the theme I created.

I will release MeshCMS 3.6 in the next few days: I just need to test it a bit more.
