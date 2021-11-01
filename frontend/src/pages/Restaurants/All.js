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
import Button from "@material-ui/core/Button";

import RestaurantTableHead from "../Table/DataTables/RestaurantTableHead";
// eslint-disable-next-line no-unused-vars
import RestaurantServices from "../../services/RestaurantServices";
import Typography from "@material-ui/core/Typography";

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

class Restaurants extends React.Component {
  state = {
    order: "asc",
    orderBy: "id",
    selected: [],
    page: 0,
    rowsPerPage: 15,
    restaurants: [],
    search: "",
    total: 0,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy },
      () => {
        this.retrieveRestaurants();
      }
    );
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.restaurants.map(n => n.id) }));
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
    const offset = page * this.state.rowsPerPage;
    const data = {
      limit: this.state.rowsPerPage,
      offset: offset
    };

    this.setState({ page },
      () => {
        this.retrieveRestaurants(data);
      }
    );
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  retrieveRestaurants() {
    const filters = {
      limit: this.state.rowsPerPage,
      offset: this.state.page * this.state.rowsPerPage,
      order: this.state.order,
      search: this.state.search
    };

    console.log(filters)
    RestaurantServices.getAll({...filters}).then(res => {
      const restaurants   = res.data.results;
      const total         = res.data.count;

      this.setState({ total, restaurants });
    });
  }

  componentDidMount() {
    const data = {
      offset: 0
    };
    this.retrieveRestaurants(data);
  }
  setSearch(value) {
    this.setState({search: value});
  }
  onChangeSearch = e => {
    const search = e.target.value;
    const self = this;
    this.setSearch(search);

    // debounce
    clearTimeout(self.timeout);
    self.timeout = setTimeout(() => {
      self.retrieveRestaurants();
    }, 700);
  };

  styles = {
    title: {
      padding: 10,
    },
    search: {
      float: "right",
    },
  };
  render() {
    // eslint-disable-next-line no-console
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, restaurants, search, total } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, total - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Typography style={this.styles.title} variant="h6" id="tableTitle">
          All Restaurants
          <input
            style={this.styles.search}
            type="text"
            className="form-control"
            placeholder="Search by name or city"
            value={search}
            onChange={this.onChangeSearch}
          />
        </Typography>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <RestaurantTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={total}
            />
            <TableBody>
              {restaurants
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
                      <TableCell>{n.city.name}</TableCell>
                      <TableCell>
                        <Link className="button" to={"/restaurants/"+n.id}>
                          <Button variant="contained" color="primary">Show</Button>
                        </Link>
                      </TableCell>
                      {/*<TableCell>*/}
                      {/*  <Link className="button" to="/form">*/}
                      {/*    <Button mini={true} variant="fab" zDepth={0}>*/}
                      {/*      <ContentCreate />*/}
                      {/*    </Button>*/}
                      {/*  </Link>*/}
                      {/*</TableCell>*/}
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
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Restaurants.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Restaurants);
