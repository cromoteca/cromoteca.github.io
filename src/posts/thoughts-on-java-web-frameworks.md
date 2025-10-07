---
title: "My Thoughts About Java Web Frameworks"
description: "Personal reflections on choosing Java web frameworks, comparing action and component frameworks, and exploring the idea of server-side DOM manipulation with jQuery."
category: "opinion"
date: "November 14, 2007"
readTime: 4
language: "en"
---

During the summer of 2004 I started writing my first web application: MeshCMS. I already had some background in JSP and a good knowledge of Java, but it was the first time for me to get the whole thing done. I decided to use what I already knew since I wanted to complete it in a short time: I was working as a freelance web designer/developer and I saw that many customers needed a CMS that was really easy to use. I tried many open source CMSes, but they were too complicated for end users.

It was a very formative experience: the application is still working and it is based on the original code. It has many of the issues that one could expect from such an application: JSPs contain Java code, the application flow is not clear and so on. This helped me to understand why web frameworks are a good thing, so I began another search: choosing a web framework.

I have a good knowledge of the HTTP request cycle, so an action framework should be OK, but all acition frameworks I tried tend to introduce scripting languages to create pages. While they do a good job, all of them have constructs that should belong to programming languages, not to web pages: loops, conditionals and so on. This does not help keeping presentation cleanly separated from logic.

Component framewors, on the other hand, add a substantial overhead, that is often unacceptable for small projects. (In my life I never worked on a project that involved more than five developers, so that is the target I'm interested on.)

Unfortunately, the web framework I use most is... ASP.NET. The company I work for is very Microsoft-oriented: we use Java only when the customer has it as a requirement. In that case, our framework of choice is JSF, but recently I had a chance to use Wicket for a customer that was not able to use JSF 1.1 or newer, due to limitations of the application server. IMHO JSF is very interesting, although it has been thought to be used with some RAD tool, while I prefer handwritten code.

Wicket allows to write logic in Java and presentation in HTML, without requiring any special development tool, but it has its drawbacks too: it tends to consume much RAM and HMTL is polluted by wicket:* tags. I know that the RAM issues can be avoided by using models correctly, and I'm very happy with the Wicket-Hibernate integration I wrote for that project (I haven't used Databinder since the customer required JDK 1.4). But anyway everything I do increases the RAM usage and requires some workaround, making code less attractive than it looks at the beginning. My opinion about Wicket is still good, but not excellent. And I agree with [Gavin King's opinions](http://in.relation.to/Bloggers/DesignersVsDevelopersDeclarationVsProcedure) (even the one regarding trackbacks!), except the fact that developers should produce the HTML. That's not wrong, just unpractical, since usually I work on HTML+CSS prototypes that have been approved by the customer. It does not matter who creates the HTML, it matters that it's already there when coding starts. The need to use that HTML is the main reason that led me to try Wicket.

A product that I never tried but that looks really promising is Grails. The reason that has held me back from trying it is that it will be hard to use it at work, since only .NET and Java are taken into account in all companies I worked for in the last years.

### JavaScript on the server?

Some months ago jQuery has made its entry in my web development toolbox. It is allowing me to manipulate the HTML on the client very easily. I'd really like to have the same flexibility on the server, and I'm not alone with this wish: even John Resig, the creator of jQuery, is [thinking about using it on the server](http://ejohn.org/blog/bringing-the-browser-to-the-server/). He did more, creating a browser/DOM environment to run jQuery server-side. I tried his code and it proved to work. Of course, there is much work to be done, because the first wish is to be able to run *exactly the same code* on server and client (think about validators, for example).

The drawback of that approach is that I'd need to use two programming languages on the server: Java and JavaScript. After all, it's not the language what I like about jQuery: it's the ability to traverse and manipulate the DOM with ease. This is not impossible in Java: the DOM is just an XML document, and we have a plethora of tools to work with it. Dom4j + XPath might be a good option.

My idea is that using an in-memory DOM, built from the prototype HTML, might suffice in small projects. This would allow to leave the prototype HTML untouched and to apply the needed changes when processing requests. Unfortunately, there's no such framework around. I'm not going to create it, since it would be a huge task, but I'll write some test code to see if this method could work fine.

**Update:** [ItsNat](http://itsnat.sourceforge.net/) seems to use an approach that is similar to what I described here. I'll give it a try.
