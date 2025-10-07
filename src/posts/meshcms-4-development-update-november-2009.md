---
title: "An Update About MeshCMS 4 Development"
description: "Progress report on MeshCMS 4 development covering new tag library, visual form builder, configurable menus, draft support, and flexible zone system."
category: "announcement"
date: "November 17, 2009"
readTime: 2
language: "en"
---

Just an update on what's going on about MeshCMS 4: latest weekends have been more fruitful than others.

**Tag Library**: I've started writing the new one using JSP 2.0, many tags are still missing but the most important ones are there, furthermore there is an object in the page context that can be used through the JSTL and EL, as well as from Freemarker and other template languages (themes are no longer forced to be JSP files).

**Forms**: [as I wrote before](../module-zones-in-meshcms-4/), page editors can create forms by assembling fields visually. At the moment, they can insert text fields, text areas, check boxes, CAPTCHAs (using reCAPTCHA). Forms can be sent via email to a provided address or to a custom page that is supposed to process the results. I've also rewritten the Comments module to be a composition of those other modules.

**Menus**: a module is provided to create them, and that module can be also used in themes to achieve list-based navigation menus. It is highly configurable, so it can be also used to get bread crumbs and page lists.

**Drafts**: pages can be saved as drafts, so logged users see the draft, while other visitors see the unedited version. Combined with the ability to hide a page from the menu, it offers a good degree of staging.

**Zones**: [contrary to what I said before](../module-zones-in-meshcms-4/), there is no limit to the number of zones in a page, and their names will be custom as it happens now with MeshCMS 3. In short, in MeshCMS 3 you can define as many modules as you want in a theme, and you can use a single template for each module. In MeshCMS 4, you can define as many *zones* as you want in your theme, and then put as many modules as you want in a zone. Furthermore, you can mark a zone as *inheritable*, and see it propagated to all subpages that are not putting anything else in that zone.

**Other modules**: finally there is a module that allows to enter some HTML using the same WYSIWYG editor that is used to edit the page body (TinyMCE and CKEditor are supported at the moment): that means the ability to put content anywhere in the page.

Unfortunately, there's a lot to be done before I can publish an alpha version of the software. I just wanted to let you know that MeshCMS 4 is going forward, so it will be released for sure, sooner or later. The dream is to release the first alpha before the end of the year, although it will be really hard.
