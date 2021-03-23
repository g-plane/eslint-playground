import React, { useState } from 'react'
import styled from 'styled-components'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions } from '../utils'

const Wrapper = styled.div`
  height: 100%;
  width: 50vw;
`

const LinterBox: React.FC = () => {
  const [code, setCode] = useState('')

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editor.updateOptions({
      insertSpaces: true,
      tabSize: 2,
      trimAutoWhitespace: true,
      renderWhitespace: 'trailing',
    })
  }

  const handleEditorValueChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }

  return (
    <Wrapper>
      <MonacoEditor
        height="80%"
        defaultLanguage="javascript"
        defaultPath="file:///main.jsx"
        options={defaultMonacoOptions}
        onMount={handleEditorDidMount}
        onChange={handleEditorValueChange}
      />
    </Wrapper>
  )
}

export default LinterBox
