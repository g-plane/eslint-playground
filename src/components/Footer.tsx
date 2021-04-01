import * as React from 'react'
import { Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import Linter from 'eslint4b'
import * as monaco from 'monaco-editor'

const Footer: React.FC = () => {
  const bg = useColorModeValue('purple.100', 'purple.600')

  return (
    <Flex
      position="fixed"
      bottom="0"
      h="36px"
      width="100vw"
      px="12px"
      py="6px"
      bgColor={bg}
    >
      <HStack spacing="24px">
        <Text>ESLint: v{Linter.version}</Text>
        <Text>
          TypeScript: v{monaco.languages.typescript.typescriptVersion}
        </Text>
      </HStack>
    </Flex>
  )
}

export default Footer
