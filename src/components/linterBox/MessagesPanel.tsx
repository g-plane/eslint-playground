import React from 'react'
import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { VscError, VscWarning } from 'react-icons/vsc'
import type { Linter } from 'eslint4b'

interface Props {
  messages: Linter.LintMessage[]
  onMessageClick(message: Linter.LintMessage): void
}

const MessagesPanel: React.FC<Props> = (props) => {
  const bgColor = useColorModeValue('gray.700', 'gray.200')
  const hoverBgColor = useColorModeValue('gray.200', 'gray.700')

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
          cursor="pointer"
          _hover={{ bgColor: hoverBgColor }}
          onClick={() => props.onMessageClick(message)}
        >
          {message.severity === 1 ? (
            <Icon as={VscWarning} color="yellow.500" mr="8px" />
          ) : (
            <Icon as={VscError} color="red.500" mr="8px" />
          )}
          <Text color={bgColor} mr="3px">
            {message.message}
          </Text>
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
