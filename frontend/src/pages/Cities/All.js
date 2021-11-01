import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

// eslint-disable-next-line no-unused-vars
import CityTableHead from "../Table/DataTables/CityTableHead";
import Typography from "@material-ui/core/Typography";
import CityServices from "../../services/CityServices";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class Cities extends React.Component {
  state = {
    order: "asc",
    orderBy: "id",
    selected: [],
    page: 0,
    rowsPerPage: 4,
    cities: [],
    total: 0,
    search: "",
    next: null,
    previous: null
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy },
      () => {
        this.retrieveCities();
      }
    );
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.cities.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {

    this.setState({ page },
      () => {
        this.retrieveCities();
      }
    );
  };


  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount() {
    this.retrieveCities();
  }

  retrieveCities() {
    const filters = {
      limit: this.state.rowsPerPage,
      offset: this.state.page * this.state.rowsPerPage,
      order: this.state.order
    };
    CityServices.getAll({...filters}).then(res => {
      const cities   = res.data.results;
      const total    = res.data.count;
      this.setState({ total, cities });
    });
  }
  setSearch(value) {
    this.setState({search: value});
  }
  onChangeSearchTitle = e => {
    const search = e.target.value;
    this.setSearch(search);
  };
  render() {
    // eslint-disable-next-line no-console
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, cities, total} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Typography style={{padding: 10 + "px"}} variant="h6" id="tableTitle">
          All Cities
        </Typography>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CityTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={total}
            />
            <TableBody>
              {cities
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>{n.id}</TableCell>
                      <TableCell>{n.name}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Cities.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Cities);
