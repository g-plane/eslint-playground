import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  height: 56px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  padding: 0 20px;

  & h1 {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }
`

const Header: React.FC = () => (
  <StyledHeader>
    <h1>ESLint Playground</h1>
  </StyledHeader>
)

export default Header
