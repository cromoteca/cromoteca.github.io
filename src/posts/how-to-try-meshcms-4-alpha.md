---
title: "How To Try MeshCMS 4 Alpha"
description: "Step-by-step guide to building and running MeshCMS 4 alpha from source, including GWT compilation and editor configuration."
category: "tutorial"
date: "September 20, 2010"
readTime: 3
language: "en"
---

The development of MeshCMS 4 is going well, and I'm enjoying it to manage my website and some other ones. But, unfortunately, the build process is not complete yet, so if you want to try it, you must make some steps manually.

First of all, check out MeshCMS 4 with Subversion from https://meshcms.svn.sourceforge.net/svnroot/meshcms (it is located in trunk). Then, download GWT from [http://code.google.com/webtoolkit/download.html](http://code.google.com/webtoolkit/download.html). Unpack GWT within the project, in /lib/gwt, so that the JARs are located in that directory (e.g. /lib/gwt/gwt-servlet.jar).

While this is the required effort, you might probably want to use a WYSIWYG editor in the CMS. At the moment, [TinyMCE](http://tinymce.moxiecode.com/) and [CKeditor](http://ckeditor.com/) are supported. Download one of them (or both) and unpack in /lib/editors, so that you have /lib/editors/tiny_mce/tiny_mce.js and/or /lib/editors/ckeditor/ckeditor.js.

To build MeshCMS 4 you need JDK 5 or newer and Ant. Open a command shell in the project directory and type `ant clean-dist`. It will complain about a missing directory, please create it by hand, I'll fix it in a future revision of the build process. Once the build will run, it will require some time since it must compile a GWT application.

Finally you will find meshcms.war in /dist. Deploy it on Tomcat 5.x or newer, open [http://localhost:8080/meshcms/](http://localhost:8080/meshcms/) and you'll see... an error page. Another thing that will be fixed soon: wait some seconds, reload your browser and it should work. You can login as admin/admin and enjoy this fantastic undocumented CMS! Well, most of the concepts in the [MeshCMS 3 user guide](../../meshcms/userguide/) still apply, but of course this is a different beast.

As a first move after login, click on File Manager, then expand Control Panel and Website. Open Configuration and Modules: there you can set some parameters for the website and some modules: while in MeshCMS 3 you must configure a module each time you use it, here you can set some parameters that apply to the whole website, while other parameters are still left to single usages of modules. Most parameters are self-explanatory, while others would need a good user guide, that I will write while releasing beta versions.

While there is still much to do, I hope that you will find it interesting. Some MeshCMS 3 features are still missing, but the most important ones are there and work well.
