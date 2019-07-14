import React from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';
import {
    withStyles
} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import { createMuiTheme } from '@material-ui/core/styles';
import Toolbar from "./Toolbar";
import {
    fetchUsersRequest,
    deleteUserRequest,
    statusUserRequest,
    getUserRequest
} from '../../../../../actions/Users';
import compose from 'recompose/compose';
import Template from './template';
import './style.css';
import axios from 'axios';

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
            users: [],
            open: false,
            setOpen: false,
            _open: false,
            _setOpen: false,
            uid: null
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
          }
        }
    })


    updateStatus(id) {
        var index = this.state.users.findIndex(x=> x.id === id);
        if (index === -1)
            console.log('error')
        else {
            this.setState({
                users: [
                   ...this.state.users.slice(0,index),
                   Object.assign({}, this.state.users[index], { disabled: !this.state.users[index].disabled }),
                   ...this.state.users.slice(index+1)
                ]
            });
            axios.post(`http://localhost:4000/api/Users/update?where={"id":"${id}"}`, { 'disabled': !this.state.users[index].disabled })
                .then((response) => {console.log(response)})
                .catch((error) => console.log('status', error));
        }
          

    }

    componentWillMount() {
        this.columns = [
            {
                name: "id",
                label: "OPTIONS",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <ButtonGroup size="sm" size="small">
                                <IconButton size="sm" onClick={() => this.removeUser(value)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="sm" onClick={() => this._handleClickOpen(value)}>
                                    <EditIcon fontSize="small"/>
                                </IconButton>
                            </ButtonGroup>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "username",
                label: "PHOTO",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <Avatar className={"mui-avatar-datatables"}>
                            { value && 
                                value !== '' ? 
                                value.slice(0,1)  : 
                                ''
                            }
                        </Avatar>
                    )
                }
            },
            {
                name: "username",
                label: "USERNAME",
                options: {}
            },
            {
                name: "email",
                label: "EMAIL ADDRESS",
                options: {}
            },
            {
                name: "role",
                label: "ROLE",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if (value === "ROLE_ADMIN") {
                            return ("ADMINISTRATEUR")
                        } else if (value === "ROLE_SUPERVISOR") {
                            return ("SUPERVISOR")
                        } else if (value === "ROLE_GESTIONNAIRE") {
                            return ("GESTIONNAIRE")
                        }
                    }
                }
            },
            {
                name: 'disabled',
                label: "Status",
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        if(value) {
                            return (
                                <Chip
                                    size="small"
                                    color="secondary"
                                    label={"Inactive"}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                        if(!value) {
                            return (
                                <Chip
                                    size="small"
                                    color="primary"
                                    label={"Active"}
                                    deleteIcon={<DoneIcon />}
                                />
                            )
                        }
                    }
                }
            },
            {
                name: 'disabled',
                label: "Enable/Disable",
                options: {
                    sort: false,
                    print: false,
                    customBodyRender: (value, tableMeta, updateValue) => ( 
                        <Switch 
                            color="primary"
                            checked={value}
                            onChange={() => this.handleSwitch(tableMeta.rowData[0])}
                        />
                    )
                }
            }
        ];
        this.options = {
            filter: true,
            selectableRows: true,
            filterType: 'dropdown',
            responsive: 'scroll',
            rowsPerPage: 10,
            rowsPerPageOptions: [5,10,15,20,25,50],
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
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users) 
            this.setState({ users: nextProps.users })
        if(typeof(nextProps.users.count) !== undefined) {
            if(nextProps.users.count === 1)
                this.props.getUsers();
        }
    }

    removeUser = (uid) => {
        this.handleClickOpen(uid);
    }

    handleClickOpen = (uid) => {
        this.setState({ 
            open: true, 
            uid: uid 
        })
    }

    handleConfirm = () => {
        this.setState({ 
            open: false 
        })
        this.props.removeUser(this.state.uid)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSwitch = (id) => {
       this.updateStatus(id);
    }

    _handleClickOpen = (uid) => {
        this.props.getUser(uid);
        this.setState({ 
            _open: true 
        })
    }

    _handleClose = () => {
        this.setState({ 
            _open: false 
        })
    }

    render() {
        return (Template(this));
    }

}

Lists.propTypes = {
    data: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(fetchUsersRequest()),
        getUser: (uid) => dispatch(getUserRequest(uid)),
        removeUser: (uid) => dispatch(deleteUserRequest(uid)),
        switchStatus: () => dispatch(statusUserRequest())
    }
}

const mapStateToProps = (state) => {
    const {
        users,
        progress,
        error,
        user
    } = state.users;
    return {
        users: users,
        progress: progress,
        error: error,
        user: user
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Lists);
