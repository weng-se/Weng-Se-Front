import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from '@material-ui/core/styles';
import EditUser from './../update/';

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
            <MuiThemeProvider theme={component.getMuiTheme()}>
                <MUIDataTable
                    title={"Users List"}
                    id="muiUserDataTable"
                    data={Array.from(component.state.users)}
                    columns={component.columns}
                    options={component.options}
                />
            </MuiThemeProvider>

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

            {component.props.progress !== 100 &&
                <div className="loader-view">
                    <CircularProgress />
                </div>
            }

            <Dialog
                fullWidth="true"
                open={component.state._open}
                onClose={component._handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <EditUser />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )

}


export default Template;