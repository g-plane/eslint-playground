import { h } from 'preact'
import styled from 'preact-emotion'

const Header = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  background-color: #633adf;
  border-bottom: 1px solid #411daf;
`

const Title = styled('span')`
  flex-grow: 1;
  padding: 8px;
  font-weight: bold;
`

export default ({ onClick }) => (
  <Header>
    <Title onClick={onClick}>
      <span style={{ color: '#fff' }}>ESLint Playground</span>
    </Title>
  </Header>
)
