import React from 'react';
import { 
    createMuiTheme 
} from '@material-ui/core/styles';
import {
    connect
} from 'react-redux';
import {
    withStyles
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { 
    toast 
} from 'react-toastify';
import { 
    fetchChecksRequest, 
    deleteCheckRequest, 
    getCheckRequest,
    createRemiseRequest
} from '../../../../../actions/Checks';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from './../../Components/Toolbar/';
import ToolbarSelect from './../../Components/ToolbarSelect/';
import Template from './template';
import { FormattedMessage } from 'react-intl';
import Fab from '@material-ui/core/Fab';
import {
    Properties
} from './../../../../../constants/Properties';
import './style.css';



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


class Checks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checks: [],
            show: false,
            openUpdateDialog: false,
            check: null,
            banks: []
        }
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

    componentWillMount() {
        this.columns = [
            {
                name: "issuedDate",
                label: <FormattedMessage id="label.issuedDate"/>,
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('DD/MM/YYYY')  }</span>
                    )
                }
            },
            {
                name: "number",
                label: <FormattedMessage id="label.checkNumber"/>,
                options: {
                    sort: false,
                    filter: false
                }
            },
            {
                name: "bank.title",
                label: <FormattedMessage id="label.bank"/>,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: "customer",
                label: <FormattedMessage id="label.customer"/>,
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) =>  {
                        if(value) {
                            return(<span>{ value.name }</span>)
                        }
                    }
                }
            },

            {
                name: "amount",
                label: <FormattedMessage id="label.amount"/>,
                options: {
                    sort:false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Chip
                            size="small"
                            color="default"
                            label={value + ' €'}
                        />
                    )
                }
            },
            {
                name: 'comment',
                label: <FormattedMessage id="label.comment"/>,
                options: {
                    sort: false,
                    filter: false
                }
            },
            
            {
                name: 'status',
                label: <FormattedMessage id="label.status"/>,
                options: {
                    sort: false,
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value === 'VALIDATED') {
                            return (
                                <Chip
                                    size="small"
                                    color="primary"
                                    style={{ backgroundColor: "#1cc88a", color : "#fff" }}
                                    label={<FormattedMessage id="label.validated"/>}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                        if(value === 'ONGOING') {
                            return (
                                <Chip
                                    size="small"
                                    label={<FormattedMessage id="label.ongoing"/>}
                                    style={{ backgroundColor: "#ffb64d", color : "#fff" }}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                        if(value === 'WAITING') {
                            return (
                                <Chip
                                    size="small"
                                    label={<FormattedMessage id="label.waiting"/>}
                                    style={{ backgroundColor: "#ffb64d", color : "#fff" }}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                        if(value === 'CASHED') {
                            return (
                                <Chip
                                    size="small"
                                    label={<FormattedMessage id="label.cashed"/>}
                                    style={{ backgroundColor: "orange", color : "#FFF" }}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                        if(value === 'REJECTED') {
                            return (
                                <Chip
                                    size="small"
                                    label={<FormattedMessage id="label.rejected"/>}
                                    style={{ backgroundColor: "#e74a3b", color : "#FFF" }}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                        if(value === 'TOCHANGE') {
                            return (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={<FormattedMessage id="label.toChange"/>}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                    }
                }
            },
            {
                name: "cashingDateDesired",
                label: <FormattedMessage id="label.cashingDateDesired"/>,
                options: {
                    sort: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('DD/MM/YYYY')  }</span>
                    )
                }
            },
            {
                name: "id",
                label: <FormattedMessage id="label.actions"/>,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <Fab color="primary" size="small" aria-label="edit" onClick={() => this.getUpdatedCheck(value)}>
                                    <EditIcon className="small-icon" />
                                </Fab>
                            </div>
                        </React.Fragment>
                    )
                }
            },
            
        ];
        this.options = {
            filter: true,
            selectableRows: 'multiple',
            filterType: 'dropdown',
            responsive: 'scroll',
            rowsPerPage: 10,
            expandableRows: false,
            resizableColumns: false,
            selectableRowsOnClick: true,
            rowsPerPageOptions: [5,10,15,20,25,50],
            textLabels: {
                body: {
                    noMatch: <FormattedMessage id="label.noMatch"/>,
                    toolTip: <FormattedMessage id="label.sort"/>,
                  },
                  pagination: {
                    next: <FormattedMessage id="label.nextPage"/>,
                    previous: <FormattedMessage id="label.previousPage"/>,
                    rowsPerPage: <FormattedMessage id="label.rowsPerPage"/>,
                    displayRows: "sur",
                  },
                  toolbar: {
                    search: <FormattedMessage id="label.search"/>,
                    downloadCsv: <FormattedMessage id="label.downloadCsv"/>,
                    print: <FormattedMessage id="label.print"/>,
                    viewColumns: <FormattedMessage id="label.viewColumns"/>,
                    filterTable: <FormattedMessage id="label.filterTable"/>,
                  },
                  filter: {
                    all: <FormattedMessage id="label.all"/>,
                    title: <FormattedMessage id="label.filters"/>,
                    reset: <FormattedMessage id="label.reset"/>,
                  },
                  viewColumns: {
                    title: <FormattedMessage id="label.showColumns"/>,
                    titleAria: <FormattedMessage id="label.ShowHideTableColumns"/>,
                  },
                  selectedRows: {
                    text: <FormattedMessage id="label.rowSelected"/>,
                    delete: <FormattedMessage id="label.delete"/>,
                    deleteAria: <FormattedMessage id="label.DeleteSelectedRows"/>,
                  },
            },
            customToolbar: () => {
                return (
                  <Toolbar/>
                );
            },
            customToolbarSelect: (selectedRows) => {
                return (
                    <ToolbarSelect/>
                );
            },
            onTableChange : (action, tableState)  => {
                var data =  tableState.data;
                var index = tableState.selectedRows.data;
                var totalAmount = 0;
                var ids = [];
                for(let i=0; i <index.length; i++) {
                    ids[i] = data[index[i].index].data.slice(-1).pop();
                    totalAmount += data[index[i].index].data[4];
                }
                this.getChecks(ids);
                localStorage.setItem('ids', ids);
                localStorage.setItem('totalAmount', totalAmount);
            }
        };
    }

    componentDidMount() {
        this.props.getChecks();
    }

    handleInputChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    getUpdatedCheck = (checkId) => {
        this.setState({ openUpdateDialog: true });
        this.props.getCheck(checkId)
    }
    
    closeUpdateDialog = () => {
        this.setState({ openUpdateDialog: false });
    }

    handleConfirmUpdate = () => {
        window.alert('Successfully Updated!');
    }

    getChecks = (ids) => {
        console.log("ids", ids);
        console.log(ids.length);
        localStorage.setItem('numberCheck', ids.length);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.checks) {
            this.setState({ 
                checks: nextProps.checks 
            })
        }

        if(nextProps.check) {

            if(nextProps.check.count === 1 && nextProps.deleted) {  
                if (!toast.isActive('success')) {
                    toast.success('successfully deleted !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'success'
                    });
                }
            }

            if(nextProps.check.count === 0 && nextProps.deleted) {
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

        if(nextProps.error) {
            console.error(nextProps.error);
        }
    }


    render() {
        return (Template(this));
    }
}


Checks.propTypes = {
    checks: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChecks: () => dispatch(fetchChecksRequest()),
        deleteCheck: (id) => dispatch(deleteCheckRequest(id)),
        getCheck : (id) => dispatch(getCheckRequest(id))
    }
}

const mapStateToProps = (state) => {
    const {
        checks,
        progress,
        error,
        check,
        deleted,
        loading
    } = state.checks;
    return {
        checks: checks,
        progress: progress,
        error: error,
        check: check,
        deleted: deleted,
        loading: loading
    }
}
  
export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Checks);