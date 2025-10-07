---
title: "MeshCMS Supports PHP!"
description: "MeshCMS 4 now supports PHP through Quercus, a PHP implementation written in Java, allowing modules and themes to be created using JSP, Freemarker, and PHP."
category: "announcement"
date: "January 13, 2010"
readTime: 1
language: "en"
---


![PHP page running in MeshCMS 4](/images/blog/php_page_in_meshcms4.png)

I was not aware of the existence of [Quercus](http://www.caucho.com/products/quercus/), a PHP implementation written in Java. It runs as a servlet and is not limited to Resin, so I dropped the JAR in MeshCMS 4 (which I run on Jetty at the moment), and added index.php to the welcome file list to mark .php as a page extension. This is how the Quercus test page looks without any change:

![](/images/blog/php_page_in_meshcms4.png)

This is very important, since MeshCMS 4 allows to create modules and themes using any scripting language, like JSP, Freemarker and, from now on, PHP.
