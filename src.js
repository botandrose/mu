function Mu(template, element) {
  return template
    // events
    .replace(/@([^= ]+)="([^"]+)"/g, (_,name,callback) => {
      element["μ"+name] ||= element.addEventListener(name, event => event.μ?.apply(element, [event])) || 1
      return `on${name}="event.μ=function(event){${callback}}"`
    })
    // values
    .replace(/{{([^}]+)}}/g, (_, key) => element[key])
}
