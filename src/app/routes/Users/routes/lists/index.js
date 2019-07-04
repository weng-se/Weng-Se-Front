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
            uid: null,
            row: null
        }
        this.columns = [];
        this.options = {}
    }


    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
                '&:nth-child(1)': {
                    width: 40
                }
            }
          }
        }
    })


    updateStatus(id) {
        var index = this.state.users.findIndex(x=> x.id === id);
        if (index === -1)
            console.log('error')
        else
          this.setState({
            users: [
               ...this.state.users.slice(0,index),
               Object.assign({}, this.state.users[index], { disabled: !this.state.users[index].disabled }),
               ...this.state.users.slice(index+1)
            ]
          });
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
                                value.slice(0,2)  : 
                                ''
                            }
                        </Avatar>
                    )
                }
            },
            {
                name: "id",
                label: "id",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    display: false
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
                label: "STATUS",
                options: {
                    sort: false,
                    print: false,
                    customBodyRender: (value, tableMeta, updateValue) => ( 
                        <Switch 
                            color="primary"
                            checked={value}
                            onChange={this.handleSwitch}
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
            onRowsDelete: (rowData, data) => {
                console.log('onRowsDelete!', rowData);
            },
            onRowClick: (rowData, rowMeta) => {

            },
            onCellClick: (rowData, rowMeta) => {
                if(rowMeta.colIndex === 6) {
                    
                }
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
        if (nextProps.users) {
            this.setState({ users: nextProps.users })
        }
    }

    removeUser = (uid) => {
        this.handleClickOpen(uid);
    }

    handleClickOpen = (uid) => {
        this.setState({ open: true, uid: uid })
    }

    handleConfirm = () => {
        this.setState({ open: false })
        this.props.removeUser(this.state.uid)
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSwitch = () => {
        this.updateStatus('5d166559a2e1bb1b2285a725');
    }

    _handleClickOpen = (uid) => {
        this.props.getUser(uid);
        this.setState({ _open: true })
    }

    _handleClose = () => {
        this.setState({ _open: false })
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
        updateStatus: () => dispatch(statusUserRequest())
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
