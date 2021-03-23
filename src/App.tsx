import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import RuleEditor from './components/RuleEditor'
import LinterBox from './components/LinterBox'

const Main = styled.main`
  display: flex;
  height: calc(100vh - 80px);
`

const App: React.FC = () => {
  const [ruleDefinition, setRuleDefinition] = useState('')

  return (
    <>
      <Header />
      <Main>
        <RuleEditor onInput={setRuleDefinition} />
        <LinterBox />
      </Main>
    </>
  )
}

export default App
