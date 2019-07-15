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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import compose from 'recompose/compose';
import moment from 'moment';
import Toolbar from '../../Components/Toolbar';
import Template from './template';



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
            data: []
        }
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

    removeCheck = (id) => {
        fetch(`http://localhost:4000/api/checks/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => console.log(response))
        .catch((error) => { console.error(error) })
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
                            <ButtonGroup size="sm" size="small">
                                <IconButton size="sm" onClick={() => this.removeCheck(value)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ButtonGroup>
                        </React.Fragment>
                    )
                }
            },
            {
                name: "",
                label: "Customer",
                options: {}
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
                        <span>€ {value}</span>
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
        fetch('http://localhost:4000/api/checks?filter[include]=remise')
            .then((response) => response.json())
            .then((data) => this.setState({ data }))
            .catch((error) => console.error(error));
    }

    render() {
        return (Template(this));
    }
}


Checks.propTypes = {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
    
    }
}

const mapStateToProps = (state) => {
   
}
  
export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Checks);
