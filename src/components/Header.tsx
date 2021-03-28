import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Header: React.FC = () => (
  <Flex h="56px" bg="brand" alignItems="center" px="20px">
    <Text fontSize="22px" fontWeight="bold" textColor="white">
      ESLint Playground
    </Text>
  </Flex>
)

export default Header
