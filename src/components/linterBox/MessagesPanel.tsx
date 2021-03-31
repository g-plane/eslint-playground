import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { VscError, VscWarning } from 'react-icons/vsc'
import type { Linter } from 'eslint4b'

interface Props {
  messages: Linter.LintMessage[]
}

const MessagesPanel: React.FC<Props> = (props) => {
  return (
    <Box
      h="22vh"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      overflow="scroll"
      overflowX="hidden"
    >
      {props.messages.map((message) => (
        <Flex
          px="10px"
          py="5px"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          alignItems="center"
        >
          {message.severity === 1 ? (
            <Icon as={VscWarning} color="yellow.500" mr="8px" />
          ) : (
            <Icon as={VscError} color="red.500" mr="8px" />
          )}
          <Text mr="3px">{message.message}</Text>
          {message.ruleId && (
            <Text color="gray.600" mr="3px">
              ({message.ruleId})
            </Text>
          )}
          <Text color="gray.600">
            [{message.line}, {message.column}]
          </Text>
        </Flex>
      ))}
    </Box>
  )
}

export default MessagesPanel
