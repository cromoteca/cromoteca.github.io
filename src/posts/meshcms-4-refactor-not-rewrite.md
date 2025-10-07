---
title: "MeshCMS 4: a Refactor Instead of a Rewrite"
description: "Switching from a complete rewrite to refactoring MeshCMS 4, using GWT for the UI while improving the existing Java codebase with modern tools."
category: "technical"
date: "May 13, 2009"
readTime: 2
language: "en"
---

I'm back to MeshCMS 4 after the [Oracle shock](../a-black-hole-sun-for-java/). I'm learning GWT and it is proving very efficient. The file manager rewriting is going on smoothly.

I've changed my approach: I'm refactoring rather that rewriting. Of course the user interface needs a rewrite, since obviously I can't refactor JSP pages to GWT classes, but dealing with Java classes only opens a lot of chances to refactor and improve code.

At the moment I'm counting on NetBeans only to refactor, but when I will be at a more advanced stage, I'll use some other tool to improve code quality, like [PMD](http://pmd.sourceforge.net/), [FindBugs](http://findbugs.sourceforge.net/) or [Unnecessary Code Detector](http://www.ucdetector.org/).

I've also read that SiteMesh 2.4.x has been released and that the IMHO major bug of useless session creation has been solved. I might think about bringing it back, but without throwing away the new "engine". I must abstract things a bit so they can be plugged.

I'm attempting to put every page related info into the page itself, i.e. no separated SiteInfo. This is how a sample page looks like:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>MeshCMS 4 Sample Page</title>
    <meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />
    <meta name="keywords" content="one, two, three and four" />
    <meta name="description" content="This is a sample page showing some new characteristics in MeshCMS 4" />

    <!-- an example of inline style -->
    <style type="text/css">
      body {
        font-family: verdana, sans-serif;
      }
    </style>

    <!-- this script contains all information specific to MeshCMS, in JSON format -->
    <script type="application/javascript">
    	// <![CDATA[
    	var meshcmsPageInfo = {
    		"shortTitle": "Sample Page",
    		"score": 100,
    		"modules": {
    			"preceding": [
          ],
    			"following": [
            {
            	"template": "gallery",
            	"properties": {
            		"columns": "3",
            		"order": "random"
            	}
            },
            {
            	"template": "include",
            	"properties": {
            		"mode": "simple",
            		"order": "date"
            	}
            }
          ],
    			"secondary": [
          ],
    			"aside": [
            {
            	"template": "sample",
            	"properties": {
            		"name": "name",
            		"code": ""
            	}
            }
          ]
    		}
    	};
    	// ]]>
    </script>
  </head>

  <body>
    <h1>This is a header</h1>

    <p>
      A <em>nice</em> paragraph, followed by some <code>code</code>.
    </p>

    <pre>
public static void main(String[] args) {
  System.out.println("Hello world!");
}
    </pre>

    <p>Let's test an entity: &euro;25.00</p>

    <script type="text/javascript">
    	// <![CDATA[
    	var a = 1;
    	if (a < 3) document.write('<p>Badly formed content inserted by a script');
    	// ]]>
    </script>
  </body>
</html>
```

And this is a basic template written using FreeMarker:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>${meshPage.title!}</title>
    <#if meshPage.description??>
      <meta name="description" content="${meshPage.description}" />
    </#if>
    ${meshPage.head!}
  </head>

  <body>
    <p>
      <a href="index.html">XHTML</a>
      <a href="index2.html">HTML</a>
      <a href="test.jsp">JSP</a>
    </p>

    ${meshPage.body}

    <ul>
      <#list meshPage.pageInfo.followingModules as m>
        <li>${m.template}</li>
      </#list>
    </ul>
  </body>
</html>
```

The tag library is still there anyway: I plan to refactor it to use the new page related stuff.
