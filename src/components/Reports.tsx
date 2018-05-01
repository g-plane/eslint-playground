import { h, Component } from 'preact'
import styled from 'preact-emotion'
import { observer, inject } from 'mobx-preact'
import { Store } from '../store'
import { Subject } from 'rxjs'
import * as eslint from 'eslint'
import IconError from './icons/Error'
import IconWarning from './icons/Warning'

export const positioning: Subject<[number, number]> = new Subject()

const Container = styled('div')`
  max-height: calc(100vh - 70vh - 34px);
`

const List = styled('ul')`
  margin: 0;
  padding-left: 0;
`

// @ts-ignore
const ListItem = styled('li')`
  list-style: none;
  padding: 5px 0 5px 10px;
  margin: 0;
  border-bottom: 1px solid #ccc;
  color: ${props => props.severity === 2 ? '#e73232' : '#e6ac00'};

  &:hover {
    cursor: pointer;
    background-image: linear-gradient(
      to bottom,
      rgba(0,0,0,0.065),
      rgba(0,0,0,0.0325) 67%,
      rgba(0,0,0,0.065)
    );
  }
`

@inject('store')
@observer
export default class extends Component<{ store: Store }> {
  render ({ store }: { store: Store }) {
    return (
      <Container>
        <List>
        {store.linterReports.map(report => (
          <ListItem
            severity={report.severity}
            onClick={() => positioning.next([report.line, report.column])}
          >
            {report.severity === 2 ? <IconError /> : <IconWarning />}
            &nbsp;
            {report.message}
            &nbsp;
            ({report.ruleId})
            &nbsp;
            ({report.line}, {report.column})
          </ListItem>
        ))}
        </List>
      </Container>
    )
  }
}
