import React from 'react';
import {
    CardContent,
    CardHeader,
    FormControl,
    Card,
    Button,
    Grid
} from '@material-ui/core';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import {
    toast
} from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';


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
    const {
        bank
    } = component.state;
    return (
        <React.Fragment>
            <Dialog
                open={component.props.open}
                onClose={component.props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="form-dialog-title"><FormattedMessage id="pages.titleUpdateBank" /></DialogTitle>
                <DialogContent>
                    <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

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
                    <Button onClick={component.props.onClose} color="primary">
                        <FormattedMessage id="label.discard" />
                    </Button>
                    <Button onClick={component.props.onSave} color="primary">
                        <FormattedMessage id="label.save" />
                    </Button>
                </DialogActions>
            </Dialog>


        </React.Fragment>

    )

}


export default Template;
