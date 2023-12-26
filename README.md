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
    this.count = 0
  }
  connectedCallback() {
    this.template = `<button @click="this.increment()">{{count}}</button>`
    this.innerHTML = Mu(this.template, this)
  }
  increment() {
    this.count++
    this.innerHTML = Mu(this.template, this)
  }
}
customElements.define("my-counter", MyCounter)

function Mu(e,r){return e.replace(/@([\w:]+)="([^"]+)"/g,(e,n,t)=>(r["μ"+n]||=r.addEventListener(n,e=>e.μ?.apply(r,[e]))||1,`on${n}="event.μ=function(event){${t}}"`)).replace(/{{([^}]+)}}/g,(e,n)=>r[n])}
```

Notice that Mu is simply pasted inline at the bottom of the file. Blasphemy!

But the idea is for Mu to be used in a single-file custom element. No dependencies, no build step, no Node.js, no network activity. Just a utility function small enough that pasting it in the bottom is reasonable. Its only 207 bytes! 

## Details and Limitations
* The templating is as basic as it gets. There are no ifs or loops or block expressions, but I'm open to adding these if it doesn't blow up the filesize.
* The event handling, on the other hand, is surprisingly featureful. The `event` variable is available in the template to pass to the method call, or to call `event.preventDefault()` inline, or whatever. Event delegation via bubbling is used here, so the rendered template is assumed to be in the DOM as child of the `context` object. However, there's no Virtual DOM... `Mu` just returns a string! You're responsible for rendering that string to the DOM.

## Naming
* Mu is the name of the Greek letter μ, often meaning "micro" in modern usage.
* Mu is an abbreviation of [Mustache](https://github.com/janl/mustache.js), both in name and in functionality.

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License
