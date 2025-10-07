---
title: "Module Zones in MeshCMS 4"
description: "MeshCMS 4 introduces flexible module zones that allow unlimited modules per zone with inheritance support, a major improvement over MeshCMS 3's theme-defined module locations."
category: "technical"
date: "October 9, 2009"
readTime: 2
language: "en"
---

MeshCMS 4 will support the currently so-called "module zones", i.e. parts of the page where an unlimited number of modules can be added. MeshCMS 3 supports an unlimited number of modules too, but it is defined in the theme. If the theme defines two module locations, you can only add two modules, one per each location. MeshCMS 4 will use a different approach: it will support four zones, with well defined names, which every theme must include, so when you change theme you won't loose your modules around. But each zone can host a list of modules, so you're free to enrich your page as much as you want. A theme can still include a module as "fixed" (i.e. non editable), as in version 3.x.

Module zones will also be inheritable: if you will mark a zone as inheritable in a page, that zone will be inserted in all child pages, excluding those that are adding something in that zone by themselves.

This is my plan, but I'm open to suggestions.

Here's a screenshot of the zone editor as it is now (quite ugly I admit, but it's too early to worry about a good looking UI):

![Zone Editor Screenshot](/images/blog/zone_editor_480.png)

This screenshot is important since it shows how a form can now be built visually: you add a Form module, then, in the same zone, you add as many fields as you want (text fields, text areas, a captcha...). Finally, you add a Submitter module and voilà. A big step forward when compared with the text-based configuration of forms in version 3.
