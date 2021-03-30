declare module 'eslint4b' {
  import { Linter } from 'eslint'

  export * from 'eslint'
  export default Linter
}

declare module 'process/browser' {
  let process: NodeJS.Process
  export default process
}

declare global {
  declare let process: NodeJS.Process
}
