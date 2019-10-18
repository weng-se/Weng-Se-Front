import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import {
    createMuiTheme
} from '@material-ui/core/styles';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Template from './template';
import { FormattedMessage } from 'react-intl';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import { toast } from 'react-toastify';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import "./style.css";
// import IntlMessages from '../Customers/node_modules/util/IntlMessages';
// import ContainerHeader from '../Customers/node_modules/components/ContainerHeader/index';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '16%',
        flexShrink: 0,
    },
    title: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '16%',
        flexShrink: 0,
        fontWeight: 'bold'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '14.28%',
        flexShrink: 0,
        color: theme.palette.text.secondary,
    },
});


class Remises extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            remises: [],
            status: null,
            open: false,
            setOpen: false,
            id: null,
            data: null,
            comment: null,
            ids: null,
            show: false
        };
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: {
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

    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleChangeStatus = (id, e) => {
        this.setState({ status: e.target.value })
        fetch(`http://localhost:4000/api/remises/${id}`)
            .then(res => res.json())
            .then(data => {
                data["status"] = this.state.status;
                delete data["id"];
                this.updateStatus(id, data);
            });
    }

    updateStatus = (id, data) => {
        this.handleClickOpen();
        this.setState({ id, data })
    }

    confirmUpdateStatus = () => {

        const { id, data, status } = this.state;
        var idsCheck = [];
        var allData = [];

        axios.post(`http://localhost:4000/api/remises/${id}/replace`, data)
            .then(res => {
                if (res.data) {
                    this.fetchData();
                    this.handleClose();
                    axios.get(`http://localhost:4000/api/remises/${id}/checks`)
                        .then(res => {
                            console.log("data", res.data.id)
                            if (res.data) {
                                for (var i = 0; i < res.data.length; i++)
                                    idsCheck.push(res.data[i].id);
                            }
                             allData.push(status);
                             allData.push(...idsCheck);
                            
                            axios.post(`http://localhost:4000/api/checks/updateAllCheckRemise`, allData)
                                .then((res) => console.log(res))
                                .catch((error) => console.log(error));
                        })
                        .catch(err => console.log(err));
                }




            })

    }


    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentWillMount() {
        this.columns = [
            {
                name: "number",
                label: <FormattedMessage id="label.checkNumber" />,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: "bank",
                label: <FormattedMessage id="label.bank" />,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: "amount",
                label: <FormattedMessage id="label.amount" />,
                options: {
                    sort: false,
                    filter: true,
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
                name: "numberCheck",
                label: <FormattedMessage id="label.numberCheck" />,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: 'status',
                label: <FormattedMessage id="label.status" />,
                options: {
                    sort: false,
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let color = null;
                        let _class = null;
                        switch (value) {
                            case 'En attente':
                                color = "secondary"
                                _class = "waiting-status"
                                break;
                            case 'Partiel':
                                color = "default"
                                _class = "waiting-status"
                                break;
                            case 'Valide':
                                color = "primary"
                                _class = "valid-status"
                                break;
                            case 'Rejeter':
                                color = "secondary"
                                _class = "invalid-status"
                                break;
                        }
                        return (
                            <Chip
                                label={value}
                                clickable
                                className={_class} />
                        )
                    }
                }
            },
            {
                name: "issuedDate",
                label: <FormattedMessage id="label.issuedDate" />,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{moment(value).format('DD/MM/YYYY')}</span>
                    )
                }
            },
            {
                name: "checks",
                label: "",
                options: {
                    sort: false,
                    filter: false,
                    display: false,
                    download: false,
                    print: false
                }
            },
            {
                name: "status",
                label: <FormattedMessage id="label.status" />,
                options: {
                    sort: false,
                    filter: false,
                    download: false,
                    print: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Select
                                value={value}
                                name="status"
                                onChange={(e) => this.handleChangeStatus(tableMeta.rowData[8], e)}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}>
                                <MenuItem value={"En attente"}><FormattedMessage id="label.waiting" /></MenuItem>
                                <MenuItem value={"Valide"}><FormattedMessage id="label.validated" /></MenuItem>
                                <MenuItem value={"Partiel"}><FormattedMessage id="label.toChange" /></MenuItem>
                                <MenuItem value={"Rejeter"}><FormattedMessage id="label.rejected" /></MenuItem>
                            </Select>
                        )
                    }
                }
            },
            {
                name: "id",
                label: <FormattedMessage id="label.options" />,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <Fab color="secondary" size="small" aria-label="delete" onClick={() => this.delete(value)} >
                                    <DeleteIcon />
                                </Fab>
                            </div>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "validateDate",
                label: "",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    filter: false,
                    display: false
                }
            },
            {
                name: "comment",
                label: "",
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    filter: false,
                    display: false
                }
            }
        ];
        this.options = {
            filter: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            responsive: 'scroll',
            expandableRows: true,
            expandableRowsOnClick: true,
            rowsExpanded: [0, 2, 3],
            renderExpandableRow: (rowData, rowMeta) => {

                const getStatus = (_status) => {
                    switch (_status) {
                        case "VALIDATED": return (<Chip size="small" color="primary" label={<FormattedMessage id="label.validated" />} />);
                        case "WAITING": return (<Chip size="small" label={<FormattedMessage id="label.waiting" />} style={{ backgroundColor: "orange", color: "#FFF" }} />);
                        case "REJECTED": return (<Chip size="small" label={<FormattedMessage id="label.rejected" />} style={{ backgroundColor: "red", color: "#FFF" }} />);
                        case "TOCHANGE": return (<Chip size="small" color="secondary" label={<FormattedMessage id="label.toChange" />} />);
                        default: return <span>None</span>
                    }
                }

                return (
                    rowData[6].map(row =>
                        ((
                            <React.Fragment>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell align="left">{row.number}</TableCell>
                                    <TableCell align="left">{row.bank}</TableCell>
                                    <TableCell align="left">
                                        <Chip
                                            size="small"
                                            color="default"
                                            label={"€" + row.amount}
                                        />
                                    </TableCell>
                                    <TableCell align="left">{row.comment}</TableCell>
                                    <TableCell align="left">
                                        {getStatus(row.status)}
                                    </TableCell>
                                    <TableCell align="left">{moment(row.issuedDate).format('L')}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))
                    )
                )
            },
            rowsPerPage: 15,
            rowsPerPageOptions: [5, 10, 15, 20, 25, 50],
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
                    search: <FormattedMessage id="label.search" />,
                    downloadCsv: <FormattedMessage id="label.downloadCsv" />,
                    print: <FormattedMessage id="label.print" />,
                    viewColumns: <FormattedMessage id="label.viewColumns" />,
                    filterTable: <FormattedMessage id="label.filterTable" />,
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
                }
            },
            customToolbar: () => {
                // return (
                //   <Toolbar/>
                // );
            },
            customToolbarSelect: (selectedRows) => {
                // return (
                //     <ToolbarSelect/>
                // );
            },
            onTableChange: (action, tableState) => {
                console.log(action);
            }
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    delete = (id) => {
        if (localStorage.getItem('user_role') === 'ROLE_ADMIN') {
            if (window.confirm(`Are you sure you want to delete ?`)) {
                fetch(`http://localhost:4000/api/remises/${id}`, {
                    method: `delete`
                }).then(response =>
                    response.json().then(json => {
                        console.log(json.count)
                        if (json.count === 1) {
                            if (!toast.isActive('deleted')) {
                                toast.success('Successfully deleted !', {
                                    delay: 1000,
                                    autoClose: true,
                                    closeButton: true,
                                    toastId: 'deleted'
                                });
                            }
                            this.fetchData();
                        }
                    })
                );
            }
        } else window.alert("Désolé, vous n'avez pas la permission");
    }

    fetchData = () => {
        fetch(`http://localhost:4000/api/remises?filter[include]=checks&filter[order]=issuedDate%20DESC&filter[where][status][neq]=Valide`)
            .then(res => res.json())
            .then(remises => {
                this.setState({
                    remises
                });
            });
    }

    render() {
        return (Template(this));
    }

}

export default withStyles(styles)(Remises);