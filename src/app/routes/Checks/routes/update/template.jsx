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
import { makeStyles } from '@material-ui/core/styles';
import {
    toast
} from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const status = [
    {
        value: 'VALIDATED',
        label: 'Encaissé',
    },
    {
        value: 'WAITING',
        label: 'En attente',
    },
    {
        value: 'REJECTED',
        label: 'Rejeter',
    },
    {
        value: 'TOCHANGE',
        label: 'A changer',
    }
];


const Template = (component) => {
    const {
        check,
        customers,
        remises,
        banks,
    } = component.state;
    return (
        <React.Fragment>
            <ValidatorForm style={{ width: '100%' }} onSubmit={component.editCheck} id="updateCheckFrom" noValidate autoComplete="off">

                    <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>

                                    <TextValidator
                                        id="customerId"
                                        select
                                        name="customerId"
                                        label={<FormattedMessage id="label.customer" />}
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        required="true"
                                        value={check.customerId}
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgClientRequired"/>]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        <option value={""}></option>
                                        {customers.map(option => (
                                            <option key={option.id} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </TextValidator>

                                </FormControl>

                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="bank"
                                        select
                                        name="bankId"
                                        label={<FormattedMessage id="label.bank" />}
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        required="true"
                                        value={check.bankId}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgBankRequired"/>]}
                                    >
                                        {banks.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.title}
                                            </option>
                                        ))}
                                    </TextValidator>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="number"
                                        type="number"
                                        name="number"
                                        label={<FormattedMessage id="label.checkNumber" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        required="true"
                                        value={check.number}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgCheckNumberRequired"/>]}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        label={<FormattedMessage id="label.amount" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        value={check.amount}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgAmountRequired"/>]}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="status"
                                        select
                                        name="status"
                                        label={<FormattedMessage id="label.status" />}
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        value={check.status}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {status.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextValidator>
                                </FormControl>
                            </Grid>

                            {/* date */}

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        type="date"
                                        id="issuedDate"
                                        name="issuedDate"
                                        label={<FormattedMessage id="label.issuedDate" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        value={check.issuedDate}
                                        required="true"
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgIssuedDateRequired"/>]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        type="date"
                                        id="cashingDateDesired"
                                        name="cashingDateDesired"
                                        label={<FormattedMessage id="label.cashingDateDesired" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={(localStorage.getItem("user_role") == "ROLE_ADMIN") ? false : true}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={check.cashingDateDesired}
                                        required="true"
                                        validators={['required']}
                                        errorMessages={[<FormattedMessage id="label.msgCashingDateDesiredRequired"/>]}
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
                                        value={check.comment}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        rows={3}
                                        rowsMax={4}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>

                {/* <div style={{ float: 'right', marginBottom: '20px' }}>
                    <Button type="button" variant="contained" color="default" onClick={component.discard}> <FormattedMessage id="label.discard"/> </Button>
                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}> <FormattedMessage id="label.save"/> </Button>
                </div> */}

            </ValidatorForm>
        </React.Fragment>

    )

}


export default Template;
