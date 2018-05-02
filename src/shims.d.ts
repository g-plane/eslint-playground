declare module 'preact-emotion' {
  import * as preact from 'preact'

  function styled (tag: string): (style: TemplateStringsArray) => preact.ComponentConstructor<any, any>

  export default styled
  export * from 'emotion'
}

declare module 'eslint/lib/linter' {
  import { Linter } from 'eslint'
  let linter: typeof Linter
  export default linter
}

declare module '*/package.json' {
  let pkg: { name: string, version: string }
  export default pkg
}
