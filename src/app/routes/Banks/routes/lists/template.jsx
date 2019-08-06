import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Update from './../update/';
import {
    MuiThemeProvider
} from '@material-ui/core/styles';
import {
    toast,
    ToastContainer
} from 'react-toastify';
import Card from '@material-ui/core/Card';
import { FormattedMessage } from 'react-intl';

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
                <Card style={{ width: "100%" }}>
                    <MuiThemeProvider theme={component.getMuiTheme()}>
                        <MUIDataTable
                            title={<FormattedMessage id="pages.listBank" />}
                            id="muiBanksDataTable"
                            data={Array.from(component.state.banks)}
                            columns={component.columns}
                            options={component.options}
                        />
                    </MuiThemeProvider>
                    {component.props.progress !== 100 &&
                        <div className="loader-view">
                            <CircularProgress />
                        </div>
                    }
                </Card>
            </div>

            <Dialog
                open={component.state.open}
                onClose={component.closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    
                </DialogContent>
            </Dialog>

        </React.Fragment>
    )

}


export default Template;