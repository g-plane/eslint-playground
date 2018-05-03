import { h, Component } from 'preact'
import styled, { css } from 'preact-emotion'

const Container = styled('div')`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Header = styled('label')`
  display: block;
  position: sticky;
  top: 0;
  padding: 8px;
  color: #fff;
  background-color: #8665e6;
  border-bottom: 1px solid #633adf;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 2px rgba(0,0,0, 0.25);
`

const listStyle = css`
  padding-left: 0;
  margin: 0;
`

const listItemStyle = css`
  display: flex;
  align-items: center;
  padding: 5px;
  list-style: none;
  border-bottom: 1px solid #E8F5E9;

  &:hover {
    background-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0.065),
      rgba(0,0,0,0.0325) 67%,
      rgba(0,0,0,0.065)
    );
  }
`

class ListItem extends Component<{}, {}> {
  render () {
    return <li class={listItemStyle}>{this.props.children}</li>
  }
}

interface Props {
  title: string,
  class?: string,
  onClick (event: MouseEvent): void
}

export class ConfigurationItem extends Component<Props, {}> {
  render ({ title, onClick }) {
    return (
      <Container>
        <Header onClick={onClick}>{title}</Header>
        <ul class={listStyle}>
        {
          this.props.children
            ? this.props.children.map(child => (
              <ListItem>{child}</ListItem>
            ))
            : null
        }
        </ul>
      </Container>
    )
  }
}
