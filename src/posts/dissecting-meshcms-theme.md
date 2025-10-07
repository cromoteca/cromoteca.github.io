---
title: "Dissecting a Real World MeshCMS Theme"
description: "A detailed walkthrough of a MeshCMS theme implementation, showing how to use tags for modules, menus, multilingual support, and search integration."
category: "tutorial"
date: "February 6, 2008"
readTime: 8
language: "en"
---

Themes are one of the most important parts of any CMS. They let users define how pages must be shown to visitors, so I want to show you how the theme of my website is written, with the hope that this can give you some hints on how to add value to your pages with MeshCMS.

## Basic Setup

First, declare a doctype and import the tag library:

```jsp
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ taglib uri="meshcms-taglib" prefix="cms" %>
```

Import user information to display different footers for logged users:

```jsp
<jsp:useBean id="userInfo" scope="session" class="org.meshcms.core.UserInfo" />
```

Set a default locale:

```jsp
<cms:setlocale defaultValue="en" />
```

## Head Section

Include CSS files using the theme path:

```jsp
<link rel="stylesheet" type="text/css" href="<cms:themepath />/layout.css" media="screen,projection,tv" />
<link rel="stylesheet" type="text/css" href="<cms:themepath />/print.css" media="print" />
```

Build a custom title with breadcrumbs:

```jsp
<title><cms:pagetitle /><cms:breadcrumbs current="false" separator=" &raquo; " pre=" [" post="]" /></title>
```

Load META tags from configuration:

```jsp
<meta name="description" content="<cms:info id="description" />" />
<meta name="keywords" content="<cms:info id="keywords" />" />
<meta name="author" content="<cms:info id="author" /> (<cms:info id="authorurl" />)" />
<meta http-equiv="Content-Type" content="text/html; charset=<cms:info id="charset" />" />
```

Load the theme CSS and jQuery:

```jsp
<cms:defaultcss />
<script type='text/javascript' src="<cms:adminpath />/scripts/jquery/jquery.pack.js"></script>
```

## Body and Modules

Insert the page editor tag and modules:

```jsp
<body>
  <cms:editor>

  <cms:ifmodule location="top">
    <div class="content">
      <cms:moduletitle location="top" pre="<h3>" post="</h3>" />
      <cms:module location="top" alt="" />
    </div>
  </cms:ifmodule>

  <div class="content">
    <cms:pagebody />
  </div>
```

## Fixed Modules with Conditions

Insert a comments module with multilingual support, excluding certain pages:

```jsp
<cms:ifindexed>
  <cms:ifnotmailform>
    <cms:ifnotmodule location="bottom2">
      <div class="content">
        <cms:iflang id="en"><h3>Comments</h3></cms:iflang>
        <cms:iflang id="it"><h3>Commenti</h3></cms:iflang>
        <cms:module location="bottom2alt" name="comments:(none)" date="full"
          parameters="math=false,captcha=true,notify=luciano@virgilio.it" />
      </div>
    </cms:ifnotmodule>
  </cms:ifnotmailform>
</cms:ifindexed>
```

## Navigation

Add a language menu:

```jsp
<div id="languages">
  <cms:iflang id="en"><h3>Languages</h3></cms:iflang>
  <cms:iflang id="it"><h3>Lingue</h3></cms:iflang>
  <cms:langmenu pre="<ul><li>" separator="</li><li>" post="</li></ul>" flags="true" />
</div>
```

Create menus with breadcrumbs:

```jsp
<div id="firstLevelMenu">
  <cms:listmenu items="firstlevel" currentStyle="current" currentPathStyle="current" />
</div>

<div id="breadcrumbs">
  <cms:iflang id="en">
    <cms:breadcrumbs mode="links" pre="Path: " separator=" &raquo; " />
  </cms:iflang>
</div>

<div id="sectionMenu">
  <cms:listmenu allowHiding="true" currentStyle="current" />
</div>
```

## Search Integration

Add Google search (domain gathered from configuration):

```jsp
<cms:ifnotediting>
  <div id="search">
    <form id="searchform" action="http://www.google.com/search" method="get">
      <p>
        <label for="google_search">With <a href="http://www.google.com/">Google</a>:</label><br />
        <input type="hidden" name="as_sitesearch" value="<cms:info id="host" />" />
        <input type="text" id="google_search" class="search" name="as_q" size="14" />
        <input type="submit" class="button" value="Go" />
      </p>
    </form>
  </div>
</cms:ifnotediting>
```

## Admin Features

Show CMS menu to logged users only:

```jsp
<cms:ifuser>
  <div id="cmsMenu">
    <cms:iflang id="en"><h3>CMS Menu</h3></cms:iflang>
    <cms:iflang id="it"><h3>Menu del CMS</h3></cms:iflang>
    <ul class="menu">
      <li><cms:adminmenu separator="</li><li>" /></li>
    </ul>
  </div>
</cms:ifuser>
```

Display heap usage for administrators:

```jsp
<div id="footer">
  <%
    if (userInfo != null && userInfo.canDo(org.meshcms.core.UserInfo.CAN_DO_ADMINTASKS)) {
      Runtime runtime = Runtime.getRuntime();
  %>
  Used Memory: <%= (runtime.totalMemory() - runtime.freeMemory()) * 100 / runtime.maxMemory() %>% |
  <%
    }
  %>

  <cms:iflang id="en">
    <cms:lastmodified pre="Last modified: " post=" |" />
  </cms:iflang>

  &copy; <a href="<cms:info id="authorurl" />"><cms:info id="author" /></a> |
  Powered by <a href="http://cromoteca.com/en/meshcms/"><cms:info id="meshcms" /></a>
</div>
```

Of course you will want to apply CSS to make things look better.
