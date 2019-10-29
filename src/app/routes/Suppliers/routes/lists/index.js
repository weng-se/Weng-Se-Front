import React from 'react';
import CardBox from 'components/CardBox/index';
import {
    connect
} from 'react-redux';
import {
    withStyles
} from '@material-ui/core/styles';
import { 
    createMuiTheme 
} from '@material-ui/core/styles';
import compose from 'recompose/compose';

import {
    fetchSuppliersRequest,
    deleteSupplierRequest,
    getSupplierRequest
    
} from '../../../../../actions/Suppliers';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


import { 
    toast 
} from 'react-toastify';
import Template from './template';
import Toolbar from './Toolbar';
import './style.css';
import Fab from '@material-ui/core/Fab';
//import IntlMessages from '../../../Customers/node_modules/util/IntlMessages';
//import DataTable from './Components/DataTable';
//import ContainerHeader from '../../../Customers/node_modules/components/ContainerHeader/index';

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

class Suppliers extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          suppliers: [],
          open: false,
          setOpen: false,
          show: false,
          openUpdateDialog: false,
          sid: null,
        };
        
        this.columns = [];
        this.options = {}
      }

    

    

    componentWillReceiveProps(nextProps) {
       
        if(nextProps.suppliers) {
            this.setState({ 
                suppliers: nextProps.suppliers
            })
        }

        if(nextProps.supplier) {

            if(nextProps.supplier.count === 1 && nextProps.deleted) {  
                if (!toast.isActive('success')) {
                    toast.success('successfully deleted !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'success'
                    });
                }
            }

            if(nextProps.supplier.count === 0 && nextProps.deleted) {
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
                        customBodyRender: (value, tableMeta, updateValue) => (
                            <React.Fragment>
                                <div size="small">
                                <Fab color="primary" size="small" aria-label="edit" onClick={() => this.getUpdatedSupplier(value)}>
                                    <EditIcon className="small-icon"  />
                                </Fab>
                                &nbsp;&nbsp;&nbsp;
                                <Fab color="secondary" size="small" aria-label="delete" onClick={() => this.removeSupplier(value) } >
                                    <DeleteIcon className="small-icon" />
                                </Fab>
                                </div>
                            </React.Fragment>
                        )
                    }
                },
                {
                name: "firstName",
                label: <FormattedMessage id="label.firstName"/>,
                options: {
                 filter: false,
                 sort: false,
                }
               },
               {
               name: "lastName",
                label: <FormattedMessage id="label.lastName"/>,
                options: {
                 filter: false,
                 sort: false,
                }
               },
               {
                name: "city",
                label: <FormattedMessage id="label.city"/>,
                options: {
                 filter: false,
                 sort: false,
                }
               },
               {
                name: "phone",
                label: <FormattedMessage id="label.phone"/>,
                options: {
                 filter: false,
                 sort: false,
                }
               },
               {
               name: "email",
               label: <FormattedMessage id="label.email"/>,
               options: {
               filter: false,
               sort: false,
               }
               },
               {
               name: "manager",
               label: <FormattedMessage id="label.manager"/>,
               options: {
               filter: false,
               sort: false,
               }
               },
               {
                   name: "department",
                   label: <FormattedMessage id="label.department"/>,
                   options: {
                    filter: false,
                    sort: false,
                   }
               },
        ];
        this.options = {
            filter: true,
            selectableRows: 'none',
            filterType: 'dropdown',
            responsive: 'scroll',
            rowsPerPage: 15,
            rowsPerPageOptions: [5,10,15,20,25,50],
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
        }

    }


    componentDidMount() {
        this.props.getSuppliers()
    }

    handleClickOpen = (sid) => {
        this.setState({ 
            open: true,
            sid: sid
        })
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    removeSupplier = (sid) => {
        this.handleClickOpen(sid);
    }

    handleConfirm = () => {
        this.setState({ open: false })
        this.props.deleteSupplier(this.state.sid);
    } 

    getUpdatedSupplier = (sId) => {
        this.setState({ openUpdateDialog: true });
        this.props.getSupplier(sId)
    }

    render() {
        return (Template(this));
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSuppliers: () => dispatch(fetchSuppliersRequest()),
        deleteSupplier: (sid) => dispatch(deleteSupplierRequest(sid)),
        getSupplier : (id) => dispatch(getSupplierRequest(id)),
        
    }
}
const mapStateToProps = (state) => {
    const {
        suppliers,
        progress,
        deleted,
        error,
        supplier
        
    } = state.suppliers;
    return {
        suppliers: suppliers,
        progress: progress,
        deleted: deleted,
        error: error,
        supplier: supplier,
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Suppliers);