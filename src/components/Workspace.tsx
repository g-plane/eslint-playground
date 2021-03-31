import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import RuleEditor from './ruleEditor/RuleEditor'
import LinterBox from './linterBox/LinterBox'

const Workspace: React.FC = () => {
  const [rule, setRule] = useState('')

  return (
    <Flex h="calc(100vh - 132px)">
      <RuleEditor onInput={setRule} />
      <LinterBox ruleSource={rule} />
    </Flex>
  )
}

export default Workspace
