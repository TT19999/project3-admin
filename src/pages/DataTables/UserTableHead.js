import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
  {
    id: "name",
    numeric: true,
    disablePadding: true,
    label: "Name"
  },
  
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "posts", numeric: false, disablePadding: false, label: "posts" },
  { id: "follower", numeric: false, disablePadding: false, label: "follower" },
  { id: "role", numeric: false, disablePadding: false, label: "Role" },
  { id: "created_at", numeric: false, disablePadding: false, label: "Created_at" },
  { id: "deleted_at", numeric: false, disablePadding: false, label: "Deleted_at" },
  { id: "action", numeric:false, disablePadding: false, label: "Action" },
];

class UserTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  
  render() {
    const {
      order,
      orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>

          {rows.map(
            row => (
              <TableCell
                key={row.id}
                // align={row.numeric ? "right" : "left"}
                // padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

UserTableHead.propTypes = {

  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default UserTableHead;
