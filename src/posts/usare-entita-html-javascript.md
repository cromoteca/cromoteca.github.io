---
title: "Usare entità HTML in JavaScript"
description: "Come usare entità HTML in JavaScript con un semplice trucco usando jQuery."
category: "tutorial"
date: "November 5, 2007"
readTime: 1
language: "it"
---

In Javascript i caratteri non supportati dall'encoding in uso si scrivono come \uXXXX (dove le X sono numeri). Io trovo più comode le entità HTML, e mi piacerebbe poterle usare. Come al solito, jQuery rende semplici le cose difficili, per esempio ecco come ridefinire la funzione alert in modo che supporti le entità:

```javascript
function alert(message) {
  window.alert($("<div>"+message+"</div>").text());
}
```

Semplice ed efficace, non trovate? Il "trucco" sta nell'usare jQuery per creare al volo un elemento HTML con dentro il testo da mostrare nel messaggio, poi prelevare nuovamente quel testo, ma con le entità già convertite dal browser.
