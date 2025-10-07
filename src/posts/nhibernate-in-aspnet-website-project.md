---
title: "How To Use NHibernate in an ASP.NET Web Site Project"
description: "A practical guide to configuring NHibernate in an ASP.NET Web Site Project, compatible with Visual Studio Express, including mapping attributes and minimal configuration."
category: "tutorial"
date: "August 6, 2009"
readTime: 4
language: "en"
---

This is the first time I write an article about ASP.NET, even if I use it at work every day. Yesterday I got [NHibernate](http://nhforge.org/) working in a web site project (which is different from a web application one), despite of all unsuccessful searches on the web, and I wish to share my configuration.

Please note that if you are completely new to NHibernate, you'll learn nothing about it in this article: I just want to help you to get it running in a web site project. For the same reason I've also avoided to implement all those best practices that are already widely documented on the web.

I think that some of you might wonder why one would want to use NHibernate in a web site project, since it looks like using an enterprise tool in a small project. But I don't think that (N)Hibernate must be confined into somewhat big applications: once you've learned it, there's no reason to use another persistence framework for small projects. And being able to use it in [Visual Studio Web Developer Express](http://www.microsoft.com/express/vwd/) (which is free) is a big plus.

After many readings, some copy & paste and some rearranging, I reduced the needed code to a minimum. I also wanted to use NHibernate Mapping Attributes to avoid writing all that XML, although in the example application I've included both cases.

I assume you have downloaded [NHibernate](http://nhforge.org/) and [NHibernate Mapping Attributes](http://nhforge.org/media/p/8.aspx). Now we also have [Linq for NHibernate](http://nhforge.org/blogs/nhibernate/archive/2009/07/26/nhibernate-linq-1-0-ga-released.aspx), but I haven't added it to the project since I need to support legacy ASP.NET 2.0 projects.

I chose to create an *AJAX 1.0-Enabled ASP.NET 2.0 Web Site* in *C#*, that can be downloaded at the end of this article. Unzip it and put the libraries you downloaded in the Bin directory (you have to choose a single library for lazy loading, I chose LinFu). This is the list of files in my Bin directory (I removed them from the download since they were only adding size):

```
Antlr3.Runtime.dll
Iesi.Collections.dll
Iesi.Collections.xml
LinFu.DynamicProxy.dll
log4net.dll
log4net.xml
NHibernate.ByteCode.LinFu.dll
NHibernate.ByteCode.LinFu.xml
NHibernate.dll
NHibernate.Mapping.Attributes.dll
NHibernate.xml
nhibernate-configuration.xsd
nhibernate-mapping.xsd
```

I'm not going to explain every single line of code since I commented it, and since I've invented nothing: everything comes from the documentation and from other examples found on the web. I'm just going to explain the structure.

I've added a minimal configuration to the web.config file: there is much stuff added by Visual Studio itself, but the sections related to [log4net](http://logging.apache.org/log4net/index.html) and NHibernate are marked by comments. You can use any log4net configuration, and you can customize the NHibernate configuration to suit your needs. The only parameter I really needed to add to the default configuration is current_session_context_class=web, since it allows to bind a NHibernate session to each web request. If you prefer another binding (or no binding at all), you can remove that parameter and then remove the binding code from NHibernateModule, but this strategy is the simplest one and is perfect to start. Needless to say that you must create a database and modify the connection string accordingly.

I chose to put all NHibernate related code into a single class (NHibernateModule). This class serves two main purposes. First of all, it implements IHttpModule, so it can perform the NHibernate session (and transaction) unbinding at the end of the HTTP request. Then, at the first use of the class, it configures NHibernate by reading the configuration, creating mappins from model class attributes, creating the database tables and putting some sample data into them.

Then I created two simple model class: Color (mapped with Attributes) and Shape (mapped with XML). Both have a primary key and a property. Note that the attribute added to the Color class has a parameter that is very important to us: NameType = typeof(Item). It seems superflous, but it allows NHibernate to write the correct assembly name in the generated XML mapping.

I also created a very simple page, but it contains no added value if you have even a minimal NHibernate knowledge.

## Downloads

[Download example project](/downloads/nhibernate-aspnet-website/nhwebsite.zip)
