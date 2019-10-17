import React from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Link from '@material-ui/core/Link';
import { 
    createMuiTheme 
} from '@material-ui/core/styles';
import Toolbar from "./Toolbar";
import {
    fetchCustomersRequest, 
    deleteCustomerRequest,
    getCustomerRequest
} from '../../../../../actions/Customers';
import {
    toast
} from 'react-toastify';
import compose from 'recompose/compose';
import Template from './template';
import { FormattedMessage } from 'react-intl';
import './style.css';
import Fab from '@material-ui/core/Fab';

const styles = {
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};

class Lists extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            open: false,
            setOpen: false,
            _open: false,
            _setOpen: false,
            id: null
        }
        this.columns = [];
        this.options = {}
    }


    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root:  {
                padding: '2px 6px 2px 20px' 
            }
          },
          MUIDataTableBodyRow: {
            root: {
              '&:nth-child(odd)': { 
                backgroundColor: '#F2F2F2'
              }
            }
          }
        }
    })


    updateStatus(id) {
       
    }

    componentWillMount() {
        this.columns = [
            {
                name: "id",
                label: <FormattedMessage id="label.options"/>,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <Fab color="primary" size="small" aria-label="edit" onClick={() => this._handleClickOpen(value)}>
                                    <EditIcon className="small-icon"  />
                                </Fab>
                                &nbsp;&nbsp;&nbsp;
                                <Fab color="secondary" size="small" aria-label="delete" onClick={() => this.removeCustomer(value)} >
                                    <DeleteIcon className="small-icon"  />
                                </Fab>
                            </div>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "firstName",
                label: <FormattedMessage id="label.firstName"/>,
                options: {}
            },
            {
                name: "lastName",
                label: <FormattedMessage id="label.lastName"/>,
                options: {}
            },
            {
                name: "type",
                label: <FormattedMessage id="label.type"/>,
                options: {}
            },
            {
                name: "civility",
                label: <FormattedMessage id="label.civility"/>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value == "MEN") return(<span>HOMME</span>)
                        else if(value == "WOMEN") return(<span>FEMME</span>)
                    }
                }
            },
            {
                name: "address",
                label: <FormattedMessage id="label.address"/>,
                options: {}
            },
            {
                name: "email",
                label: <FormattedMessage id="label.email"/>,
                options: {}
            },
            {
                name: "phone",
                label: <FormattedMessage id="label.phone"/>,
                options: {}
            },
            {
                name: 'bank',
                label: <FormattedMessage id="label.bank"/>,
                options: {}
            },
            {
                name: 'iban',
                label: <FormattedMessage id="label.iban"/>,
                options: {}
            },
            {
                name: 'websiteURL',
                label: <FormattedMessage id="label.website"/>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Link href={ "http://" + value} target="_blank">{value}</Link>
                        )
                    }
                }
            },
            {
                name: 'status',
                label: <FormattedMessage id="label.status"/>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Chip
                                size="small"
                                color="primary"
                                label={value}
                                deleteIcon={<DoneIcon />}
                            />
                        )
                    }
                }
            }
        ];
        this.options = {
            filter: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            responsive: 'scroll',
            rowsPerPage: 15,
            rowsPerPageOptions: [5,10,15,20,25,50],
            expandableRows: false,
            resizableColumns: false,
            selectableRowsOnClick: true,
            textLabels: {
                body: {
                  noMatch: "Sorry, no matching records found",
                  toolTip: "Sort",
                },
                pagination: {
                  next: "Next Page",
                  previous: "Previous Page",
                  rowsPerPage: "Rows per page:",
                  displayRows: "of",
                },
                toolbar: {
                  search: <FormattedMessage id="label.search"/>,
                  downloadCsv: <FormattedMessage id="label.downloadCsv"/>,
                  print: <FormattedMessage id="label.print"/>,
                  viewColumns: <FormattedMessage id="label.viewColumns"/>,
                  filterTable: <FormattedMessage id="label.filterTable"/>,
                },
                filter: {
                  all: "All",
                  title: "FILTERS",
                  reset: "RESET",
                },
                viewColumns: {
                  title: "Show Columns",
                  titleAria: "Show/Hide Table Columns",
                },
                selectedRows: {
                  text: "row(s) selected",
                  delete: "Delete",
                  deleteAria: "Delete Selected Rows",
                },
            },
            onRowsDelete: (rowsDeleted) => {
                console.log('data!', rowsDeleted.data);
            },
            customToolbar: () => {
                return (
                  <Toolbar />
                );
            }
        };
    }

    componentDidMount() {
        this.props.getCustomers();
    }

    removeCustomer = (id) => {
        this.handleClickOpen(id);
    }

    handleClickOpen = (id) => {
        this.setState({ 
            open: true, 
            id: id 
        })
    }

    handleConfirm = () => {
        this.setState({ 
            open: false 
        })
        this.props.removeCustomer(this.state.id)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSwitch = (id) => {
       this.updateStatus(id);
    }

    _handleClickOpen = (id) => {
        this.props.getCustomer(id);
        this.setState({ 
            _open: true 
        })
    }

    _handleClose = () => {
        this.setState({ 
            _open: false 
        })
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.customers)  {
            this.setState({ 
                customers: nextProps.customers 
            })
        }


        if(nextProps.customer) {

            if(nextProps.customer.count === 1 && nextProps.deleted) {  
                if (!toast.isActive('success')) {
                    toast.success('successfully deleted !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'success'
                    });
                }
                setTimeout(() => {
                    this.props.getCustomers();
                }, 2000);
            }

            if(nextProps.customer.count === 0 && nextProps.deleted) {
                if (!toast.isActive('error')) {
                    toast.error('Error deleting item !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'error'
                    });
                }
            }

            

        }

        

       
    }

    render() {
        return (Template(this));
    }

}

Lists.propTypes = {
    customers: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCustomers: () => dispatch(fetchCustomersRequest()),
        getCustomer: (id) => dispatch(getCustomerRequest(id)),
        removeCustomer: (id) => dispatch(deleteCustomerRequest(id)),
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    const {
        customers,
        customer,
        progress,
        error
    } = state.customers;
    return {
        customers: customers,
        customer: customer,
        progress: progress,
        error: error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Lists);
