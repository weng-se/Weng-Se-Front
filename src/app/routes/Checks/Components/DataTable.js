import React from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import fetch from 'unfetch';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FormDialog from './FormDialog';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
  { id: 'issuedDate', numeric: false, disablePadding: true, label: 'Type' },
  { id: 'customer', numeric: false, disablePadding: false, label: 'Customer' },
  { id: 'number', numeric: false, disablePadding: false, label: 'Number' },
  { id: 'bank', numeric: true, disablePadding: false, label: 'Bank' },
  { id: 'comment', numeric: false, disablePadding: false, label: 'Comment' },
  { id: 'cashingDateDesired', numeric: false, disablePadding: false, label: 'Cashing Date Desired' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'remise.number', numeric: false, disablePadding: false, label: 'remise Number' },
  { id: 'remise.issuedDate', numeric: false, disablePadding: false, label: 'Remise Issued Date' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
});

class EnhancedTableToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }
  
  handleOpenModal = () => {
    this.setState({openModal: true});
  }

  handleCloseModal = () => {
    this.setState({openModal: false});
  }

  saveRemise = (formData) => {
    this.handleCloseModal()
    this.props.saveRemise(formData)
  }
  render(){
    const { numSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Cheques
              {this.props.selected}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
        
          {numSelected > 0 ? (
            <Tooltip title="Create">
              <IconButton aria-label="Create" onClick={ this.handleOpenModal}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <div></div>
          )}
        </div>
        {this.state.openModal &&
        <FormDialog
          saveRemise={this.saveRemise}
          handleCloseModal={this.handleCloseModal}/>
          }
      </Toolbar>
    );
  }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
      openSnackBar: false
    };
  }

  componentDidMount(){
    this.updateData();
  }

  updateData = () => {
    fetch('http://localhost:4000/api/checks?filter[include]=remise')
    .then( r => r.json() )
    .then( data => {
      this.setState({data: data});
    });
  }

  saveRemise = (formData) => {
    console.log(this.state.data)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    formData.amount = this.state.data.filter(n => this.state.selected.includes(n.id)).map(n => n.amount).reduce(reducer)
    formData.numberCheck = this.state.selected.length
    formData.status  = "En attente"
    
    fetch('http://localhost:4000/api/remises', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }).then(response=>response.json()).then( data => {
            this.updateChecksWithRemise(data.id);
          })
  }

  updateChecksWithRemise = (id) =>{
    fetch('http://localhost:4000/api/checks/update?where={"id": {"inq": '+JSON.stringify(this.state.selected)+'}}', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: '{"remise_id" : "'+id+'"}'
          }).then( r => {
            this.updateData()
            this.setState({selected: [], openSnackBar: true, Transition: this.TransitionDown})
          })
  }
  
  handleCloseSnackBar = () => {
    this.setState({ openSnackBar: false });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
      <Snackbar
          open={this.state.openSnackBar}
          onClose={this.handleCloseSnackBar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            style={{backgroundColor: green[600]}}
            aria-describedby="client-snackbar"
            message={
              <span id="message-id">Remise reacted succefully</span>
            }
          />
        </Snackbar>
        <EnhancedTableToolbar
          selected={this.state.selected}
          handleUpdateData={this.updateData}
          numSelected={selected.length} 
          saveRemise={this.saveRemise}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1} 
                      key={index}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Moment format="DD/MM/YYYY">{n.issuedDate}</Moment>
                      </TableCell>
                      <TableCell>{n.customer}</TableCell>
                      <TableCell>{n.number}</TableCell>
                      <TableCell>{n.bank}</TableCell>
                      <TableCell>{n.comment}</TableCell>
                      <TableCell><Moment format="DD/MM/YYYY">{n.cashingDateDesired}</Moment></TableCell>
                      <TableCell>{n.amount}</TableCell>
                      <TableCell>{(n.remise != undefined) ?n.remise.number: ""}</TableCell>
                      <TableCell><Moment format="DD/MM/YYYY">{n.issuedDate}</Moment></TableCell>
                      <TableCell>{n.status}</TableCell>
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
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);