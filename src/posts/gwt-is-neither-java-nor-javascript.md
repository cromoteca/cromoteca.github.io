---
title: "GWT Is Neither Java Nor JavaScript: It's GWT"
description: "Reflections on Google Web Toolkit as a unique platform, emphasizing its strengths for building web applications rather than viewing it as just Java-to-JavaScript translation."
category: "opinion"
date: "December 19, 2009"
readTime: 4
language: "en"
---

I've heard of many people criticizing [GWT](http://code.google.com/gwt), some of the most common reasons are that it translates Java into JavaScript, that web sites are not desktop applications, and that GWT uses Java to write code. Well, here's my thoughts on these points.

I've always looked at GWT like a very interesting technology, but I only recently introduced myself to real GWT development to create the admin interface of MeshCMS 4 (my own GPL CMS). I'm really impressed, and I'm writing this post to point out how I think one should look at GWT.

### GWT is neither Java nor JavaScript

Let me clarify what I mean. Sure, you use Java syntax and Java tools when developing (I'm a [NetBeans](http://www.netbeans.org/) fan for what it's worth). But in a certains sense you're not writing real Java code, since you're not targeting the Java VM. But clearly you're not writing JavaScript, and you can't use closures and such. If you write GWT code thinking about JavaScript, you've missed the whole point. Yes, it will become JavaScript at the end of the story, but if you choose GWT is because it offers something different.

So please relax, forget things that you can't do directly (although you definitely *can* add some real JavaScript in GWT), and concentrate on what GWT can give you. There's plenty of goods: you get all the benefits of Java syntax, like type safety (yes, it's a good thing), refactoring, invaluable aids while writing code (how could I code without that terrific code completion offered by current IDEs?). But you also get a comfortable RPC mechanism, that allows to write a POJO, populate it on the server and reuse it verbatim on the client.

Then you have a lot of benefits that solve common issues: you get client bundles (think of 100 icons packed in a single image file), damn easy localization (I reused the old MeshCMS translations provided by kind people around the world, without any change!), optimized JavaScript code, specific for any browser/locale pair... well, they're too many to list.

Oh, and you get some widgets too. Many people tell that they are ugly. No, they're just basic: they just provide you with some raw HTML, for example a GWT Button is an HTML button, no more, no less. You can take advantage of your CSS skills and customize the look & feel of your application with complete freedom, and GWT will take care of CSS optimization too. If you need more advanced widgets, there are some options around, [SmartGWT](http://code.google.com/p/smartgwt/) being an interesting example.

So, again, if you think that GWT might be useful to you, take it for what it is, think of it as a language/platform *on its own*, and I'm sure it will give something good to you.

### GWT is for web applications

This one is trivial, but some forget that GWT has been mainly thought for single page web applications. Well, the single page is not required, but it helps to understand the scope. When I click on the File Manager link in MeshCMS 4, I'm opening a web application: it's the web equivalent of double-clicking on an EXE file in Windows. If you're working on a web site, like a web store, and you need to add some client-side advanced interaction, then GWT is probably not the best tool, although there are some changes in the last versions that might lead to rethink. But I generally prefer jQuery for that.

### I hate language wars

I don't want to waste my time and your time on the umpteenth language war, so here's my short say.

Java does not seem to be the natural language for writing web applications today. The shift towards Python, Groovy and Ruby shows that even on the server side many developers need a proper tool, tailored for their needs.

Nevertheless, our ancestors searched for the philosopher's stone and for the panacea, and Java is the best match today in computer programming, since it allows to be used almost everywhere. For any use you can think of, there is probably a better choice, but Java is there. Desktop applications? Checked (although with many caveats). Server applications? Checked. Mobile development? Checked. Web page development? Well, we've got applets, now we have JavaFX, but we also have GWT, so that's checked too. Not bad.
