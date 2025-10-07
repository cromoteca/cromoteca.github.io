---
title: "Using MeshCMS To Manage a Blog"
description: "How to set up and use the Blog module in MeshCMS, integrating blogging functionality into a website with features like comments, tags, and automatic image rescaling."
category: "tutorial"
date: "November 11, 2007"
readTime: 2
language: "en"
---


MeshCMS has been thought to manage websites, not blogs, but I really wanted to start a blog within my site, so I created a Blog module that is currently available on SVN. Let's make clear that if you want to get a blog, MeshCMS is not the best tool around, but in situations similar to mine, where the blog is just a part of the whole, it might come handy to be able to use a single tool for all things.

The blog module is really easy to use: just create a new page and insert the blog module into it. Articles must be subpages of that page, and it is recommended to hide the submenu for the main blog page (you can do that with the Page Manager).

You can add the Comments module in the theme as a fixed module, so you don't need to insert it into each article you write. Alternatively, you can do that for each page, so you get fine-grained control about which pages should be opened to comments.

Page keywords (declared using the standard `<meta name="keywords" content="..." />`) are used as tags. I will add a tag list module soon to allow to navigate the blog using tags. I will also add a simple calendar module, to select articles by date, and a RSS feed feature.

## Image Handling

Modules to insert image galleries, audio and video are already available, and if you insert images using TinyMCE, MeshCMS is able to rescale them on the fly so you don't need to create multiple versions of those images.

I've also added a small jQuery script that adds a link to the original image:

```javascript
$(function() {
  var pattern = new RegExp("generated(.*?)/org.meshcms.core.ResizedThumbnail");

  $("img").each(function() {
    var img = $(this);

    if (!img.parents("a").size()) {
      var result = pattern.exec(img.attr("src"));

      if (result) {
        img.wrap('<a href="' + result[1] + '"></a>');
      }
    }
  });
});
```

It is fun to see how easy it was to start a simple blog using MeshCMS!
