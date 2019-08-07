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
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import { Grid
} from '@material-ui/core';
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

const Status = [
    {
        value: '',
        label: '',
    },
    {
        value: 'VALID',
        label: 'Valide',
    },
    {
        value: 'INVALID',
        label: 'Invalide',
    }
];


const Template = (component) => {
    console.log(component.state.bank)
    const {
        bank
    } = component.state;
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
                onClose={component.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="pages.titleUpdateBank" /></DialogTitle>
                <DialogContent>
                    <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} id="updateform" noValidate autoComplete="off">

                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="title"
                                        type="text"
                                        name="title"
                                        label={<FormattedMessage id="label.title" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        value={bank.title}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={['Title field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="name"
                                        name="name"
                                        label={<FormattedMessage id="label.bankName" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        value={bank.name}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={['Name field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        id="status"
                                        select
                                        name="status"
                                        label={<FormattedMessage id="label.status" />}
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={bank.status}
                                    >
                                        {Status.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextValidator>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="contact"
                                        name="contact"
                                        label={<FormattedMessage id="label.contact" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        value={bank.contact}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="comment"
                                        name="comment"
                                        label={<FormattedMessage id="label.comment" />}
                                        type="textarea"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        multiline={true}
                                        value={bank.comment}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        rows={3}
                                        rowsMax={4}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>

                    </ValidatorForm>

                </DialogContent>
                <DialogActions>
                    <Button onClick={component.handleClose} color="primary">
                        <FormattedMessage id="label.discard" />
                    </Button>
                    <Button type="submit" form="updateform" color="primary">
                        <FormattedMessage id="label.save" />
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )

}


export default Template;