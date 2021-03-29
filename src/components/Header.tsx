import React from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { VscSettingsGear } from 'react-icons/vsc'

interface Props {
  onOpenGlobalSettings(): void
}

const Header: React.FC<Props> = (props) => (
  <Flex h="56px" bg="brand" alignItems="center" justifyContent="space-between" px="20px">
    <Text fontSize="22px" fontWeight="bold" textColor="white">
      ESLint Playground
    </Text>
    <IconButton
      colorScheme="purple"
      bgColor="brand"
      icon={<VscSettingsGear />}
      aria-label="Global Settings"
      onClick={props.onOpenGlobalSettings}
    />
  </Flex>
)

export default Header
