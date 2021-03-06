import React from 'react';

import Card from '@material-ui/core/Card';
import MUIDataTable from "mui-datatables";
import { 
    MuiThemeProvider 
} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {
    toast,
    ToastContainer,
} from 'react-toastify';

import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';
import Update from '../update/index';



const styles = theme => ({
    datatables: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '16%',
        flexShrink: 0,
    }
});

const Template = (component) => {
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
            <Card>
                <MuiThemeProvider theme={component.getMuiTheme()}>
                    <MUIDataTable
                        title={ <FormattedHTMLMessage id="pages.listSuppliers"/> }
                        id="muiUserDataTable"
                        data={Array.from(component.state.suppliers)}
                        columns={component.columns}
                        options={component.options}
                    />
                </MuiThemeProvider>

            </Card>
            </div>
            <Dialog
                open={component.state.open}
                onClose={component.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Are you sure to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Are you sure you want to delete user permanently ?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={component.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={component.handleConfirm} color="primary" autoFocus>
                        Confirm
                        </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={component.state.openUpdateDialog}
                onClose={component.closeUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <Update/>
                </DialogContent>
            </Dialog>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} />

        </React.Fragment>
    )

}


export default Template;