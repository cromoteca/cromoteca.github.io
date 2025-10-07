---
title: "Another Approach To Use GWT With NetBeans"
description: "A detailed tutorial on setting up Google Web Toolkit with NetBeans using Ant and gwt-apt annotations for automatic code generation."
category: "tutorial"
date: "March 6, 2009"
readTime: 5
language: "en"
---

GWT is one of my favorite tools since it was born, but unfortunately I never had a chance to use it at work. I tested it some time ago and I loved it, but version 1.5 stands even above. I can't keep ignoring it, so I'm going to use it in my free time. I'm a GWT newbie, keep this in mind while reading, nevertheless I've organized a simple setup that I like and I wanted to share it hoping for comments and suggestions.

Most Java developers use Maven, as I do, although not always. I tried the GWT Maven plugin, it does everything, but I found it to be slow, even after it downloads everything. Since I've not found an easy way to make it run fast, I went back to Ant. The setup I'm going to describe runs faster than the Maven based one.

I tried the GWT4NB plugin for NetBeans, it works very well, but when I tested GWT for the first time, I used the tools created by [Joakim Recht](http://braindump.dk/tech/) ([GWT Task for Ant](http://braindump.dk/tech/gwt-task-for-ant/) and [GWT XDoclet](http://braindump.dk/tech/gwt-xdoclet/)). It looked smarter to me than using the wizards provided by an IDE. Now another utility has been added to Joakim's GWT swiss knife: a [GWT XDoclet replacement for GWT 1.5](http://braindump.dk/tech/2008/11/05/gwt-xdoclet-replacement-for-gwt-15/) that uses annotations instead of XDoclet.

I have another goal: building a JAR instead of a WAR. Why? Because it would make upgrades easier: when a new version is out, I'd simply replace the JAR, without touching the web application that might have been customized in the meanwhile. I'm thinking of my good old MeshCMS, where pages are created inside the webapp: I'd like to write a new admin interface using GWT, and then distribute the whole CMS as a JAR file.

## Setup Overview

Since the goal is to build a JAR, create a new Java Class Library project instead of a web application. Some sources will be generated automatically, so add another source directory (gensrc) to avoid mixing them with handwritten code.

You'll need these libraries: GWT itself, [GWT Task for Ant](http://braindump.dk/tech/gwt-task-for-ant/), and [gwt-apt](http://braindump.dk/gwt-apt/). Note that you need to add src and gensrc to the libraries, since GWT wants to read the sources when compiling.

It's better to avoid building the JAR every time the project is compiled. Edit the Ant build script to automate the code generation and GWT compilation by adding targets for -post-clean and -pre-jar.

## Sample Code

Here's a simple entry point class with the @Module annotation:

```java
package my.gwtsetup.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.ClickListener;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.user.client.ui.Widget;
import dk.contix.gwt.annotations.Module;

@Module(packageName = "my.gwtsetup",
        inherits = {"com.google.gwt.user.User",
                    "com.google.gwt.user.theme.standard.Standard"})
public class Main implements EntryPoint {
  public void onModuleLoad() {
    Button button = new Button("Click me");
    // ... rest of the implementation
  }
}
```

## Adding a Service

To add a GWT service, create the concrete service implementation with the @Service annotation:

```java
@Service(path = "/timeservice", service = "my.gwtsetup.client.TimeService")
public class TimeServiceImpl extends RemoteServiceServlet implements TimeService {
  @ServiceMethod
  public String getCurrentTime() {
    return new Date().toString();
  }
}
```

Clean the project to generate the client interface (TimeService and TimeServiceAsync), and the ServiceFactory will be automatically updated.

## Running the Project

Set the Run parameters with com.google.gwt.dev.GWTShell as the main class and my.gwtsetup.Main/Main.html as the startup URL path.

I'm going to test this setup more extensively and I'll report any issue with it. A second part of this article might deal with integrating the JAR in a web application project and run the final code in client mode.

## Downloads

[Download sample project](/downloads/gwt-netbeans-setup/MyGWTSetup_without_libraries.zip) (14 KB)
