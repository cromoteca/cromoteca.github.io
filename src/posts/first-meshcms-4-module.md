---
title: "First MeshCMS 4 Module"
description: "Comparing the gallery module implementation between MeshCMS 3 and MeshCMS 4, showcasing cleaner architecture with FreeMarker templates and separate Java beans."
category: "technical"
date: "September 24, 2009"
readTime: 3
language: "en"
---

Today I wrote the first module for MeshCMS 4. It's the gallery module and, at the moment, adds no new features with respect to the current one, rather it drops some. But I'm very happy with the new architecture that makes module creation much easier. I created a FreeMarker template and a Java class, but any technology can be used for the template: JSP, Velocity and so on. MeshCMS automatically finds a Java class that matches the module and provides it as a request bean. This is a very common solution, but if one still wants (or needs) to write a pure JSP module like in MeshCMS 3, I will add a default bean that will provide all configuration parameters, plus commonly needed values like the page path.

## MeshCMS 3.5 Gallery Code

The gallery module in version 3.5 is unmaintainable. It's a massive JSP file mixing Java code, HTML, and logic. I wouldn't have even considered developing a new version if MeshCMS 3 weren't full of this stuff. Not that MeshCMS 4 will be a perfect piece of code, but at least it's better.

## MeshCMS 4 Module Template

Look at the new module template using FreeMarker:

```html
<#if bean.hasImages>
  <ul class="mesh-gallery">
    <#list bean.images as image>
      <li>
        <a href="${image.link}">
          <img src="${image.thumbnail}" alt="${image.name}" />
          <#if bean.printCaptions>
            <span class="mesh-gallery-caption">${image.name}</span>
          </#if>
        </a>
      </li>
    </#list>
  </ul>
</#if>

${bean.next!}
```

## Java Bean

The bean handles all the logic (I'll refactor it to extract a superclass for all modules that need to operate on a list of files):

```java
public class Gallery extends ServerModule {
  private GalleryThumbnail thumbMaker;
  private List<Image> images;
  private OrderType orderType;

  public Gallery() {
    webSite = WebSite.getCurrent();
    thumbMaker = new GalleryThumbnail();
    thumbMaker.setHighQuality(webSite.getConfiguration()
          .isHighQualityThumbnails());
    imagePath = pageDirPath = webSite.getDirectory(RequestInfo.get().getPath());
    captions = true;
    orderType = OrderType.ALPHABETICAL;
  }

  public void setDirectory(String dir) {
    imagePath = new Path(dir);
  }

  public void setCaptions(boolean captions) {
    this.captions = captions;
  }

  public void setOrder(String order) {
    try {
      orderType = OrderType.valueOf(Strings.asConstantName(order));
    } catch (Exception ex) {
      Log.info(this, ex, "Wrong ordering type: {}", order);
    }
  }

  // ... rest of implementation
}
```

## JSON Configuration

Finally there is the JSON module configuration file that will be parsed by the interface:

```json
{
  "name": "Image Gallery",
  "template": "gallery.ftl",
  "parameters": [
    {
      "name": "directory",
      "description": "Images Directory",
      "type": "PATH"
    },
    {
      "name": "captions",
      "description": "Add Captions",
      "type": "BOOLEAN"
    },
    {
      "name": "order",
      "description": "Order",
      "type": "SELECTION",
      "values": [
        "Alphabetical",
        "Newest First",
        "Oldest First",
        "Random"
      ]
    },
    {
      "name": "quality",
      "description": "Thumbnail Quality",
      "type": "SELECTION",
      "values": [
        "Default",
        "High",
        "Low"
      ]
    }
  ]
}
```

I'm thinking about removing descriptions from the JSON to allow their localization.

## What MeshCMS 4 Will Bring

Apart from removing ugly JSP code (and HTML embedded in Java), what will MeshCMS 4 bring to the table?

The long standing charset issue seems to be finally solved, the UI will allow to configure modules graphically (including forms!), HTML editors will be swappable, and much more. Unfortunately, I'm spending really few time on it, so don't expect any release in 2009.
