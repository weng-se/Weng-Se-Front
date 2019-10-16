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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    ValidatorForm
} from 'react-material-ui-form-validator';
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
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">
                    <Card style={{ width: '100%' }}>
                        <MuiThemeProvider theme={component.getMuiTheme()}>
                            <MUIDataTable
                                key={"fr"}
                                title={<FormattedMessage id="pages.listRemises" />}
                                id="muiChecksDataTable"
                                data={Array.from(component.state.remises)}
                                columns={component.columns}
                                options={component.options}
                            />
                        </MuiThemeProvider>
                    </Card>
                </div>
            </div>


            <Dialog
                open={component.state.open}
                onClose={component.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth="true"
            >
                <DialogTitle id="alert-dialog-title"><FormattedMessage id="sweetAlerts.areYouSure"/></DialogTitle>
                <DialogContent>
                    <ValidatorForm>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextField
                                type="textarea"
                                id="comment"
                                name="comment"
                                label={<FormattedMessage id="label.comment" />}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                multiline={true}
                                rows={3}
                                rowsMax={4}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={component.handleClose} color="primary">
                        <FormattedMessage id="label.disagree"/>
                    </Button>
                    <Button onClick={component.confirmUpdateStatus} color="primary" autoFocus>
                        <FormattedMessage id="label.agree"/>
                    </Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>

    )

}


export default Template;