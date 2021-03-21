import React, { useState } from 'react'
import Header from './components/Header'
import RuleEditor from './components/RuleEditor'

const App: React.FC = () => {
  const [ruleDefinition, setRuleDefinition] = useState('')

  return (
    <>
      <Header />
      <RuleEditor onInput={setRuleDefinition} />
    </>
  )
}

export default App
