function Mu(template, element) {
  return template
    // events
    .replace(/@(\w+)="([^"]+)"/g, (_,name,callback) => `on${name}="${callback.replace(/\bthis\b/,'getRootNode().host')}"`)
    // values
    .replace(/{{([^}]+)}}/g, (_, key) => element[key])
}
