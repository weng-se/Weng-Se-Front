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
import {
    toast, ToastContainer
} from 'react-toastify';
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
            remises: []
        };
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
                name: "number",
                label: <FormattedMessage id="label.checkNumber"/>,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: "bank",
                label: <FormattedMessage id="label.bank"/>,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: "amount",
                label: <FormattedMessage id="label.amount"/>,
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
                label: <FormattedMessage id="label.numberCheck"/>,
                options: {
                    sort: false,
                    filter: true
                }
            },
            {
                name: 'status',
                label: <FormattedMessage id="label.status"/>,
                options: {
                    sort: false,
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let color = null;
                        switch (value) {
                            case 'En attente':
                                color = "secondary"
                                break;
                            case 'Partiel':
                                color = "default"
                                break;
                            case 'Validee':
                                color = "primary"
                                break;
                        }
                        return (
                            <Chip icon={<FaceIcon />}
                                label={value}
                                clickable
                                color={color}/>
                            )
                    }
                }
            },
            {
                name: "issuedDate",
                label: <FormattedMessage id="label.issuedDate"/>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <span>{ moment(value).format('L')  }</span>
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
                name: "id",
                label: <FormattedMessage id="label.options"/>,
                options: {
                    sort: false,
                    print: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => (
                        <React.Fragment>
                            <div size="small">
                                <IconButton size="small" onClick={() => this.delete(value)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </React.Fragment>
                    )
                }
            }
        ];
        this.options = {
            filter: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            responsive: 'scroll',
            expandableRows: true,
            expandableRowsOnClick: false,
            rowsExpanded: [0, 2, 3],
            renderExpandableRow: (rowData, rowMeta) => {
                
                const getStatus = (_status) => {
                  switch(_status) {
                    case "VALIDATED": return (<Chip size="small" color="primary" label={<FormattedMessage id="label.validated"/>} />);
                    case "WAITING":   return (<Chip size="small" label={<FormattedMessage id="label.waiting"/>} style={{ backgroundColor: "orange", color : "#FFF" }} />);
                    case "REJECTED":  return (<Chip size="small" label={<FormattedMessage id="label.rejected"/>} style={{ backgroundColor: "red", color : "#FFF" }} />);
                    case "TOCHANGE":  return (<Chip size="small" color="secondary" label={<FormattedMessage id="label.toChange"/>}/>);
                    default:  return <span>No project match</span>
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
                                { getStatus(row.status) }                       
                            </TableCell>
                            <TableCell align="left">{moment(row.issuedDate).format('L')}</TableCell>
                            </TableRow>
                        </React.Fragment>
                      ))
                )
              )
            },
            rowsPerPage: 10,
            rowsPerPageOptions: [5,10,15,20,25,50],
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
            }
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    delete = (id) => {
        if(window.confirm("Are you sure you want to delete ?")) {
            
            fetch(`http://localhost:4000/api/remises/${id}`, {
                method: `delete`
              }).then(response =>
                response.json().then(json => {
                    console.log(json.count)
                  if(json.count === 1) {
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
    }

    fetchData = () => {
        fetch('http://localhost:4000/api/remises?filter[include]=checks')
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