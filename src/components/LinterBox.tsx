import React, { useState } from 'react'
import styled from '@emotion/styled'
import MonacoEditor from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import { defaultMonacoOptions, defaultEditorConfig } from '../utils'

const Wrapper = styled.div`
  height: 100%;
  width: 50vw;
`

const LinterBox: React.FC = () => {
  const [code, setCode] = useState('')

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ) => {
    editor.updateOptions(defaultEditorConfig)
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
