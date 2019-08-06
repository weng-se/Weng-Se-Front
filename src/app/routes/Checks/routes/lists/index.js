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
    getCheckRequest
} from '../../../../../actions/Checks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from '../../Components/Toolbar';
import Template from './template';
import './style.css';
import { FormattedMessage } from 'react-intl';


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
            open: false,
            setOpen: false,
            show: false,
            openUpdateDialog: false,
            check: null,
            remise: {

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

    handleClickOpen = (check) => {
        this.setState({ 
            open: true,
            check: check
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    removeCheck = (check) => {
        this.handleClickOpen(check);
    }

    handleConfirm = () => {
        this.setState({ open: false })
        this.props.deleteCheck(this.state.uid);
    } 

    componentWillMount() {
        this.columns = [
            {
                name: "remise.issuedDate",
                label: <FormattedMessage id="label.issuedDate"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('L')  }</span>
                    )
                }
            },
            {
                name: "customer",
                label: <FormattedMessage id="label.customer"/>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) =>  {
                        if(value) {
                            return(<span>{ value.firstName + ' ' + value.lastName }</span>)
                        }
                    }
                }
            },
            {
                name: "number",
                label: <FormattedMessage id="label.number"/>,
                options: {}
            },
            {
                name: "bank",
                label: <FormattedMessage id="label.bank"/>,
                options: {
                    sort: false,
                }
            },
            {
                name: "amount",
                label: <FormattedMessage id="label.amount"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Chip
                            size="small"
                            color="default"
                            label={'€' + value}
                        />
                    )
                }
            },
            {
                name: 'comment',
                label: <FormattedMessage id="label.comment"/>,
                options: {
                    sort: false
                }
            },
            {
                name: "cashingDateDesired",
                label: <FormattedMessage id="label.cashingDateDesired"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('L')  }</span>
                    )
                }
                
            },
            {
                name: 'status',
                label: <FormattedMessage id="label.status"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value === 'VALIDATED') {
                            return (
                                <Chip
                                    size="small"
                                    color="primary"
                                    label={value}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                        if(value === 'WAITING') {
                            return (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={value}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                        if(value === 'REJECTED') {
                            return (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={value}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                        if(value === 'PARTIEL') {
                            return (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={value}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }

                    }
                }
            },
            {
                name: "remise.number",
                label: <FormattedMessage id="label.number"/>,
                options: {

                }
            },
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
                                {/* <IconButton size="small" onClick={() => this.removeCheck(value)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton> */}
                                <IconButton size="small" onClick={() => this.getUpdatedCheck(value)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
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
            resizableColumns: false,
            rowsPerPageOptions: [5,10,15,20,25,50],
            customToolbar: () => {
                return (
                  <Toolbar/>
                );
            },
            customToolbarSelect: (selectedRows) => {
                return (
                    <React.Fragment>
                        <Tooltip title={"Create Remise"}>
                            <Button onClick={this.openRemiseDialog}>
                                <FormattedMessage id="label.createRemise"/> 
                            </Button>
                        </Tooltip>
                    </React.Fragment>
                );
            }
        };
    }

    componentDidMount() {
        this.props.getChecks();
    }

    openRemiseDialog = () => {
        this.setState({
            show: true
        })
    }

    closeRemiseDialog = () => {
        this.setState({
            show: false
        })
    };

    saveRemise = () => {
        this.setState({ show: false })
        this.props.saveRemise(this.state.remise)
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
        getCheck : (id) => dispatch(getCheckRequest(id)),
        saveRemise : () => {}
    }
}

const mapStateToProps = (state) => {
    const {
        checks,
        progress,
        error,
        check,
        deleted
    } = state.checks;
    return {
        checks: checks,
        progress: progress,
        error: error,
        check: check,
        deleted: deleted
    }
}
  
export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Checks);
