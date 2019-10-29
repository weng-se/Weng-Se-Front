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
    fetchBanksRequest, 
    deleteBankRequest,
    getBankRequest,
    updateBankRequest,
} from '../../../../../actions/Banks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from "./Toolbar";
import Template from './template';
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


class Banks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banks: [],
            open: false,
            setOpen: false,
            bank: {
                id: "",
                status: "",
                title: "",
                name: "",
                contact: "",
                createdBy: "",
                editedBy: "",
                comment: ""
            }
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
                name: "name",
                label: <FormattedMessage id="label.bankName"/>,
                options: {}
            },
            {
                name: "title",
                label: <FormattedMessage id="label.title"/>,
                options: {}
            },
            {
                name: "contact",
                label: <FormattedMessage id="label.contact"/>,
                options: {}
            },
            {
                name: 'comment',
                label: <FormattedMessage id="label.comment"/>,
                options: {
                    sort: false
                }
            },
            {
                name: "status",
                label: <FormattedMessage id="label.status"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) =>  {
                        if (value === 'VALID') {
                            return(
                                <Chip
                                    size="small"
                                    color="primary"
                                    className= "valid-status"
                                    label={<FormattedMessage id="label.valid"/>}

                                />
                            )
                        }else {
                            return(
                                <Chip
                                    size="small"
                                    color="secondary"
                                    className= "invalid-status"
                                    label={<FormattedMessage id="label.invalid"/>}
                                />
                            )
                        }
                    }
                }
            },
            {
                name: "id",
                label: <FormattedMessage id="label.options"/>,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (id, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <Fab color="primary" size="small" aria-label="edit" onClick={() => this.handleClickOpen(id)}>
                                    <EditIcon className="small-icon"  />
                                </Fab>
                                &nbsp;&nbsp;&nbsp;
                                <Fab color="secondary" size="small" aria-label="delete" onClick={() => this.removeBank(id)} >
                                    <DeleteIcon className="small-icon"  />
                                </Fab>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        ];
        this.options = {
            filter: false,
            selectableRows: 'none',
            filterType: 'dropdown',
            responsive: 'scrollMaxHeight',
            viewColumns:false,
            rowsPerPage: 13,
            rowsPerPageOptions: [10,15,20,25,50],
            expandableRows: false,
            resizableColumns: false,
            selectableRowsOnClick: true,
            textLabels: {
                body: {
                    noMatch: <FormattedMessage id="label.noMatch"/>,
                    toolTip: <FormattedMessage id="label.sort"/>,
                  },
                  pagination: {
                    next: <FormattedMessage id="label.nextPage"/>,
                    previous: <FormattedMessage id="label.previousPage"/>,
                    rowsPerPage: <FormattedMessage id="label.rowsPerPage"/>,
                    // displayRows: <FormattedMessage id="label.of"/>,
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
                    <React.Fragment>
                        <Tooltip title={"Create Remise"}>
                            <IconButton onClick={this.openRemiseDialog}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                );
            }
        };
    }

    componentDidMount() {
        this.props.fetchBanks();
    }


    removeBank = (id) => {
        var confirm = window.confirm("Are you sure you want to delete ?");
        if(confirm == true) {
            this.props.deleteBank(id);
        }
    }

    handleChange = (e) => {
        this.setState({
            bank: {
                ...this.state.bank,
                [e.target.name]: e.target.value
            }
        })
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.banks) {
            this.setState({ 
                banks: nextProps.banks 
            })
        }

        if(nextProps.bank) {

            this.setState({
                bank: {
                    ...this.state.bank,
                    id: nextProps.bank.id,
                    status: nextProps.bank.status,
                    title: nextProps.bank.title,
                    name: nextProps.bank.name,
                    contact: nextProps.contact,
                    comment: nextProps.bank.comment
                }
            })

            if(nextProps.bank.count === 1 && nextProps.deleted) {  
                if (!toast.isActive('success')) {
                    toast.success('successfully deleted !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'success'
                    });
                }
                setTimeout(() => {
                    this.props.fetchBanks();
                }, 200);
            }

            if(nextProps.bank.count === 0 && nextProps.deleted) {
                if (!toast.isActive('error')) {
                    toast.error('Error deleting item !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'error'
                    });
                }
            }


            if(nextProps.bank.count === 1 && nextProps.updated) {  
                if (!toast.isActive('updateSuccess')) {
                    toast.success('successfully updated !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'updateSuccess'
                    });
                }
                setTimeout(() => {
                    this.props.fetchBanks();
                }, 200);
            }

        }

        if(nextProps.error) {
            console.error(nextProps.error);
        }
    }


    handleClickOpen = (id) => {
        this.props.getBank(id);
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ 
            open: false
        })
    }


    formReset = () => {
        this.setState({
            bank: {
                ...this.state.bank,
                status: "",
                title: "",
                name: "",
                contact: "",
                createdBy: "",
                editedBY: "",
                comment: "",
            }
        })
    }

    handleSubmit = () => {
        this.props.updateBank(this.state.bank);
        this.formReset();
        setTimeout(() => {
            this.setState({  open: false })
            this.props.fetchBanks();
        }, 100);
    }

    render() {
        return (Template(this));
    }
}


Banks.propTypes = {
    banks: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBanks: () => dispatch(fetchBanksRequest()),
        deleteBank: (id) => dispatch(deleteBankRequest(id)),
        getBank : (id) => dispatch(getBankRequest(id)),
        updateBank: (formData) => dispatch(updateBankRequest(formData)),
    }
}

const mapStateToProps = (state) => {
    const {
        banks,
        error,
        bank,
        progress,
        deleted
    } = state.banks;
    return {
        banks,
        error,
        bank,
        progress,
        deleted
    }
}
  
export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Banks);
