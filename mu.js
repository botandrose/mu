function Mu(e,t){return e.replace(/@(\w+)="([^"]+)"/g,(e,o,t)=>`on${o}="${t.replace(/\bthis\b/,"getRootNode().host")}"`).replace(/{{([^}]+)}}/g,(e,o)=>t[o])}
