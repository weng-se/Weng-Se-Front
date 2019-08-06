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
} from '../../../../../actions/Banks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from "./Toolbar";
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


class Banks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            banks: [],
            open: false,
            setOpen: false,
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
                name: "id",
                label: <FormattedMessage id="label.options"/>,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (id, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <IconButton size="small" onClick={() => this.removeBank(id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => this.getUpdatedCheck(id)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "title",
                label: <FormattedMessage id="label.title"/>,
                options: {
                    
                }
            },
            {
                name: "name",
                label: <FormattedMessage id="label.bankName"/>,
                options: {}
            },
            {
                name: "contact",
                label: <FormattedMessage id="label.contact"/>,
                options: {}
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
                                    label={<FormattedMessage id="label.valid"/>}
                                />
                            )
                        }else {
                            return(
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={<FormattedMessage id="label.invalid"/>}
                                />
                            )
                        }
                    }
                }
            },
            {
                name: 'comment',
                label: <FormattedMessage id="label.comment"/>,
                options: {
                    sort: false
                }
            }
        ];
        this.options = {
            filter: true,
            selectableRows: 'single',
            filterType: 'dropdown',
            responsive: 'stacked',
            rowsPerPage: 10,
            rowsPerPageOptions: [10,15,20,25,50],
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

    componentWillReceiveProps(nextProps) {

        if(nextProps.banks) {
            this.setState({ 
                banks: nextProps.banks 
            })
        }

        if(nextProps.check) {

            if(nextProps.bank.count === 1 && nextProps.deleted) {  
                if (!toast.isActive('success')) {
                    toast.success('successfully deleted !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'success'
                    });
                }
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

        }

        if(nextProps.error) {
            console.error(nextProps.error);
        }
    }


    openDialog = () => {
        this.setState({ 
            open: false
        })
    }

    closeDialog = () => {
        this.setState({ 
            open: false
        })
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
        deleteBank: (id) => dispatch(deleteBankRequest(id))
    }
}

const mapStateToProps = (state) => {
    const {
        banks,
        error,
        progress
    } = state.banks;
    return {
        banks,
        error,
        progress
    }
}
  
export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Banks);
