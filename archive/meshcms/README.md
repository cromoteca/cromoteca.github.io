# MeshCMS

**Project status:** MeshCMS 3.6 has been released on May 26, 2011. Version 3 will be updated in case of bugs or security holes, but no new features will be added. Version 4 development has stalled: I'm adding new features based on my own needs, but I need to find a good amount of time (or someone willing to help) to convert current code into a solid release before making it public. All the pages in this website describe the latest release, i.e. 3.6.

MeshCMS is an online editing system written in Java. It provides a set of features usually included in a CMS, but it uses a more traditional approach: pages are stored in regular HTML files and all additional features are file-based, without needing a database.

MeshCMS has been thought as a quick tool to edit pages online, manage files and create some common components like menus, breadcrumbs, mail forms, image galleries and so on. It requires few resources: the default 64MB heap is enough to host a dozen of sites.

Main features are:

- **file-based** - no database needed;

- **easy to install** - deploy meshcms.war and you're done (tested on Tomcat and Jetty);

- **multi-site support** - multiple sites can be served with a single installation on a single context;

- **compatible with other editors** - since it is file-based, you can edit your files with other programs if you want, then upload them as usual;

- **search engine friendly** - due to its file-based nature, sites made with MeshCMS get pretty URLs by default, have a clear site map and are easily indexed by search engines;

- **WYSIWYG** **editor included** - uses [TinyMCE](http://tinymce.moxiecode.com/);

- **file manager** with image thumbnails, file operations, clipboard, upload, download, unzip and other functions - can also be used from within the wysiwyg editor to select links and images;

- support for **themes** - uses [SiteMesh](http://www.opensymphony.com/sitemesh/) as engine;

- support for **modules** to create commonly used components automatically - some module templates are provided (image gallery, mail form, download list, site map and others);

- **tag library** to create new themes easily - menus and other common components are created automatically.