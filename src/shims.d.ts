declare module 'preact-emotion' {
  import * as preact from 'preact'

  function styled (tag: string): (style: TemplateStringsArray) => preact.ComponentConstructor<any, any>

  export default styled
  export * from 'emotion'
}
