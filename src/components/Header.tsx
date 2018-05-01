import { h } from 'preact'
import styled, { css } from 'preact-emotion'

const Header = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  background-color: #A5D6A7;
  border-bottom: 1px solid #4CAF50;
`

const Title = styled('span')`
  flex-grow: 1;
  padding: 8px;
  font-weight: bold;
`

export default ({ onClick }) => (
  <Header>
    <Title onClick={onClick}>ESLint Playground</Title>
  </Header>
)
