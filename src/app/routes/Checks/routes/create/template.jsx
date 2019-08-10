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
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';

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
        banks
    } = component.state;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card style={{ width: '60%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={<FormattedMessage id="pages.createNewCheck" />} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.saveCheck} noValidate autoComplete="off">



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
                                                required="true"
                                                value={check.customerId}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.msgClientRequired"/>]}
                                            >
                                                <option value={""}></option>
                                                {Array.from(customers).map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </TextValidator>


                                        </FormControl>


                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="standard-select-status-native"
                                                select
                                                name="bank"
                                                label={<FormattedMessage id="label.bank" />}
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.bank}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.msgBankRequired"/>]}
                                            >
                                                <option value=""></option>
                                                {banks.map(option => (
                                                    <option key={option.id} value={option.name}>
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
                                                type="date"
                                                id="issuedDate"
                                                name="issuedDate"
                                                label={<FormattedMessage id="label.issuedDate" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.msgIssuedDateRequired"/>]}
                                                value={check.issuedDate}
                                                InputProps={{ inputProps: { max: today } }}
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
                                                required="true"
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.msgCashingDateDesiredRequired" />]}
                                                InputProps={{ inputProps: { max: today } }}
                                                value={check.cashingDateDesired}
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



                                <div style={{ float: 'right', marginBottom: '20px' }}>
                                    <Button type="button" variant="contained" color="default" onClick={() => component.discard()}>
                                        <FormattedMessage id="label.discard" />
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" onClick={() => component.setBool(false)} style={{ marginLeft: '5px' }}>
                                        <FormattedMessage id="label.save" />
                                    </Button>
                                </div>

                            </ValidatorForm>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>

    )

}


export default Template;
