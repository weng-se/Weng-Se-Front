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
    deleteCheckRequest 
} from '../../../../../actions/Checks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from '../../Components/Toolbar';
import Template from './template';
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
            open: false,
            setOpen: false,
            show: false,
            setShow: false,
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
                name: "id",
                label: "Options",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <ButtonGroup size="small">
                                <IconButton size="small" onClick={() => this.removeCheck(value)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ButtonGroup>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "customer",
                label: "Customer",
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
                label: "Number",
                options: {}
            },
            {
                name: "bank",
                label: "Bank",
                options: {
                    sort: false,
                }
            },
            {
                name: 'comment',
                label: "Comment",
                options: {
                    sort: false
                }
            },
            {
                name: "cashingDateDesired",
                label: "Cashing Date Desired",
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('MMM D, YYYY')  }</span>
                    )
                }
                
            },
            {
                name: "amount",
                label: "Amount",
                options: {
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
                name: "remise.number",
                label: "Remise Number",
                options: {

                }
            },
            {
                name: "remise.issuedDate",
                label: "Remise Issued Date",
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('MMM D, YYYY')  }</span>
                    )
                }
            },
            {
                name: 'status',
                label: "Status",
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value === 'string') {
                            return (
                                <Chip
                                    size="small"
                                    color="primary"
                                    label={value}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                        if(value === 'waiting') {
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
            }
        ];
        this.options = {
            filter: true,
            selectableRows: 'multiple',
            filterType: 'dropdown',
            responsive: 'scroll',
            rowsPerPage: 10,
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
        this.props.getChecks();
    }

    openRemiseDialog = () => {
        this.setState({
            show: true
        })
    }

    handleRequestClose = () => {
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
