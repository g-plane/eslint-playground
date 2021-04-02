declare module 'eslint4b' {
  import { Linter } from 'eslint'

  export type * from 'eslint'
  export default Linter
}

declare module 'prettier/esm/standalone' {
  export * from 'prettier'
}

declare module 'prettier/esm/parser-*'

declare module 'process/browser' {
  let process: NodeJS.Process
  export default process
}

declare global {
  declare let process: NodeJS.Process
}
