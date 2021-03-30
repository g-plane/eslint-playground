import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import RuleEditor from './ruleEditor/RuleEditor'
import LinterBox from './linterBox/LinterBox'

const Workspace: React.FC = () => {
  const [rule, setRule] = useState('')

  return (
    <Flex h="calc(100vh - 84px)">
      <RuleEditor onInput={setRule} />
      <LinterBox />
    </Flex>
  )
}

export default Workspace
