import React from 'react';
import {
  Button,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Table,
} from 'react-bootstrap';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import UserContext from './UserContext.js';
import colors from './color.js';

// -------- Issue Row Component ---------------

class IssueRowPlain extends React.Component {
  /**
    * const IssueRow = withRouter((props) => {...});
    * Represents each row of issue in a IssueTable.
    * Props: issue: {[string]: any}, search: String
    *        closeIssue: Func(index), index: Int
    *        deleteIssue: Func(index)
    * Parent: IssueTable
    */

  // handles the event of click on close issue button in each row
  onClose(e) {
    e.preventDefault();
    const { closeIssue, index } = this.props;
    closeIssue(index);
  }

  // handles the event of click on delete issue button in each row
  onDelete(e) {
    e.preventDefault();
    const { deleteIssue, index } = this.props;
    deleteIssue(index);
  }

  render() {
    const {
      issue,
      location: { search },
    } = this.props;

    const user = this.context;

    // tooltip elements to be used in OverLay
    const closeTooltip = <Tooltip id="close-tooltip">Close Issue</Tooltip>;
    const deleteTooltip = <Tooltip id="delete-tooltip">Delete Issue</Tooltip>;
    const editTooltip = <Tooltip id="edit-tooltip">Edit Issue</Tooltip>;

    const tableRow = (
      <tr>
        <td className="cell">{issue.id}</td>
        <td className="cell">
          <StatusWrapper
            color={colors.status[issue.status]}
          >
            {issue.status}
          </StatusWrapper>
        </td>
        <td className="cell">{issue.owner}</td>
        <td className="cell">{issue.created.toDateString()}</td>
        <td className="cell">{issue.effort}</td>
        <td className="cell">{issue.due ? issue.due.toDateString() : ' '}</td>
        <td className="cell">{issue.title}</td>
        <td className="cell">
          <ActionFlex>
            <LinkContainer to={`/edit/${issue.id}`}>
              <OverlayTrigger delayShow={1000} overlay={editTooltip}>
                <Button bsSize="xsmall">
                  <Glyphicon glyph="edit" />
                </Button>
              </OverlayTrigger>
            </LinkContainer>
            <OverlayTrigger
              delayShow={1000}
              overlay={closeTooltip}
              placement="top"
            >
              <Button
                disabled={!user.signedIn}
                bsSize="xsmall"
                type="button"
                onClick={this.onClose}
              >
                <Glyphicon glyph="remove" />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              delayShow={1000}
              overlay={deleteTooltip}
              placement="top"
            >
              <Button
                disabled={!user.signedIn}
                type="button"
                bsSize="xsmall"
                onClick={this.onDelete}
              >
                <Glyphicon glyph="trash" />
              </Button>
            </OverlayTrigger>
          </ActionFlex>
        </td>
      </tr>
    );

    const selectedLocation = { pathname: `/issues/${issue.id}`, search };

    // each tableRow becomes a link to display description of each id
    return <LinkContainer to={selectedLocation}>{tableRow}</LinkContainer>;
  }
}

// this is due to the fact that the wrapped component IssueRow is a stateless
// component based on the withRouter documentation. That's why you can't assign
// to it. contextType is meant to be a static class method.
IssueRowPlain.contextType = UserContext;
const IssueRow = withRouter(IssueRowPlain);
delete IssueRow.contextType;

// --------- Issue Table Component -----------------

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  /**
   * Displays a list of issues in a table.
   * Props: issues: Array<Objects>
   *        closeIssue: Func
   *        deleteIssue: Func
   */

  // map each issue object to IssueRow
  const issueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      deleteIssue={deleteIssue}
      closeIssue={closeIssue}
      index={index}
    />
  ));

  return (
    <TableWrap>
      <StyledTable
        hover
        responsive
      >
        <thead>
          <tr className="amHeadRow">
            <th className="amHead">ID</th>
            <th className="amHead">Status</th>
            <th className="amHead">Owner</th>
            <th className="amHead">Created</th>
            <th className="amHead">Effort</th>
            <th className="amHead">Due Date</th>
            <th className="amHead">Title</th>
            <th className="amHead">Action</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </StyledTable>
    </TableWrap>
  );
}

// ---------------- styles --------------------

const TableWrap = styled.div`
  border: 0.5px solid #d6d6d6;
  border-radius: 1rem;
  padding: 1.5rem;
  margin: 0 auto;
`;

const StyledTable = styled(Table)`
  margin-bottom: 0px;

  .amHeadRow {
    cursor: initial;
  }

  .amHead {
    text-align: center;
    font-size: 1.4rem;
    border-bottom: transparent;
  }

  .cell {
    text-align: center;
    border-top: 0.5px solid #e3e3e3;
    color: #383b4a;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const StatusWrapper = styled.div`
  background-color: ${props => props.color};
  padding-top: 0.5px;
  padding-bottom: 0.5px;
  border-radius: 0.5rem;
  margin: 0 auto;
`;

const ActionFlex = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
