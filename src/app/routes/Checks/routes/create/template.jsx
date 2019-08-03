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
    toast,
    ToastContainer,
} from 'react-toastify';
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

const banks = [
    {
        value: '',
        label: '--------',
    },
    {
        value: 'SG',
        label: 'SG',
    },
    {
        value: 'BRED',
        label: 'BRED',
    },
    {
        value: 'BP',
        label: 'BP',
    },
    {
        value: 'BQ POST',
        label: 'BQ POST',
    },
    {
        value: 'LCL',
        label: 'LCL',
    },
    {
        value: 'CIC',
        label: 'CIC',
    },
    {
        value: 'BNP',
        label: 'BNP',
    },
    {
        value: 'HSBC',
        label: 'HSBC',
    },
    {
        value: 'CDN',
        label: 'CDN',
    },
    {
        value: 'CA',
        label: 'CA',
    },
    {
        value: 'BQ KOLB',
        label: 'BQ KOLB',
    },
    {
        value: 'CAIXA DEPOSITOS',
        label: 'CAIXA DEPOSITOS',
    },
    {
        value: 'BDC',
        label: 'BDC',
    }
];


















const Template = (component) => {
    const {
        check,
        customers,
        remises
    } = component.state;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card style={{ width: '60%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={ <FormattedMessage id="pages.createNewCheck"/> } />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.saveCheck} noValidate autoComplete="off">

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>

                                            <TextValidator
                                                id="customerId"
                                                select
                                                name="customerId"
                                                label={<FormattedMessage id="label.customer"/>}
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={""}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <option value={""}>-----</option>
                                                {customers.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.firstName + ' ' + option.lastName}
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
                                                label={<FormattedMessage id="label.bank"/>}
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.bank}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                {banks.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                        {option.label}
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
                                                label={<FormattedMessage id="label.number"/>}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.number}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['numberOfCheque field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="amount"
                                                name="amount"
                                                label={<FormattedMessage id="label.amount"/>}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.amount}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['Amount field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="standard-select-status-native"
                                                select
                                                name="remise_id"
                                                label={<FormattedMessage id="label.remiseNumber"/>} 
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={(remises[0]) ? remises[0].id : ""}
                                            >
                                                {remises.map(option => (
                                                    <option key={option.value} value={option.id}>
                                                        {option.number}
                                                    </option>
                                                ))}
                                            </TextValidator>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        {/* <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="status"
                                                select
                                                name="status"
                                                label={<FormattedMessage id="label.status"/>} 
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                helperText="Please select status"
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.status}
                                            >
                                                {status.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextValidator>
                                        </FormControl> */}
                                    </Grid>

                                    {/* date */}

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                type="date"
                                                id="issuedDate"
                                                name="issuedDate"
                                                label={<FormattedMessage id="label.issuedDate"/>}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.issuedDate}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['Issued Date field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                type="date"
                                                id="cashingDateDesired"
                                                name="cashingDateDesired"
                                                label={<FormattedMessage id="label.cashingDateDesired"/>}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.cashingDateDesired}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['Cashing Date Desired field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="comment"
                                                name="comment"
                                                label={<FormattedMessage id="label.comment"/>}
                                                type="textarea"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
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
                                    <Button type="reset" variant="contained" color="default" onClick={() => component.returnToList()}> <FormattedMessage id="label.discard"/> </Button>
                                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}>  <FormattedMessage id="label.save"/> </Button>
                                </div>

                            </ValidatorForm>

                        </div>
                    </CardContent>
                </Card>
            </div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>

    )

}


export default Template;
