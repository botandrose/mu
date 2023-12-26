## Mu

μ🥸 Micro-templating, with events! μ🥸

## Features

Mu provides a single function with the following signature:
```js
function Mu(template: string, context: object) => string
```
This function does two things:
1. Templates values from the context, as expected.
   ```js
   Mu("Hello, {{name}}", { name: "World!" }) // "Hello World!"
   ```
2. Wires up event handlers:
   ```js
   Mu(`<button @click="this.save()">Save</button>`, file)
   // clicking the button will call `file.save()`
   // (provided that `file` is the custom element this is being rendered within)

## Full Example

Let's say you want to distribute a reusable custom element as simply as possible. Something like this:

```html
<script src="//some.cdn.com/my-counter.js"></script>
<my-counter/>
```

This is exactly what Mu was designed for!

```js
// my-counter.js
class MyCounter extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this.count = 0
  }
  connectedCallback() {
    this.template = `<button @click="this.increment()">{{count}}</button>`
    this.shadow.innerHTML = Mu(this.template, this)
  }
  increment() {
    this.count++
    this.shadow.innerHTML = Mu(this.template, this)
  }
}
customElements.define("my-counter", MyCounter)

function Mu(e,t){return e.replace(/@(\w+)="([^"]+)"/g,(e,o,t)=>`on${o}="${t.replace(/\bthis\b/g,"getRootNode().host")}"`).replace(/{{([^}]+)}}/g,(e,o)=>t[o])}
```

Notice that Mu is simply pasted inline at the bottom of the file. Blasphemy!

But the idea is for Mu to be used in a single-file custom element. No dependencies, no build step, no Node.js, no network activity. Just a utility function small enough that pasting it in the bottom is reasonable. Its only 159 bytes!

## Details and Limitations
* There's no Virtual DOM... `Mu` just returns a string! You're responsible for somehow rendering that string to the DOM.
* The templating is as basic as it gets. There are no ifs or loops or block expressions, but I'm open to adding these if it doesn't blow up the filesize.
* The event handling is just rewriting `this`, so the `event` variable is available in the template like you'd expect.
* Note that the event handling requires you to be rendering within the `context`'s Shadow DOM.

## Naming
* Mu is the name of the Greek letter μ, often meaning "micro" in modern usage.
* Mu is an abbreviation of [Mustache](https://github.com/janl/mustache.js), both in name and in functionality.

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License
