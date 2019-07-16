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


const status = [
    {
        value: 'DISCHARGER',
        label: 'DISCHARGER',
    },
    {
        value: 'WAITING',
        label: 'WAITING',
    },
    {
        value: 'DONE',
        label: 'DONE',
    }
];

const banks = [
    {
        value: 'SG',
        label: 'SG',
    },
    {
        value: 'BNP',
        label: 'BNP',
    },
    {
        value: 'LCL',
        label: 'LCL',
    },
    {
        value: 'HSBC',
        label: 'HSBC',
    },
    {
        value: 'LBP',
        label: 'LBP',
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
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={'Create a new cheks:'} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.saveCheck} noValidate autoComplete="off">

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>

                                            <TextValidator
                                                id="customerId"
                                                select
                                                name="customerId"
                                                label="customerId"
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={(customers[0]) ? customers[0].id : ""}
                                            >
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
                                                label="Bank"
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.bank}
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
                                                label="Number Cheque"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.number}
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
                                                label="Amount"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.amount}
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
                                                label="Remise Number"
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
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
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="status"
                                                select
                                                name="status"
                                                label="Status"
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
                                        </FormControl>
                                    </Grid>

                                    {/* date */}

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                type="date"
                                                id="issuedDate"
                                                name="issuedDate"
                                                label="Issued Date"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.issuedDate}
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
                                                label="Cashing Date Desired"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={check.cashingDateDesired}
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
                                                label="Comment"
                                                type="textarea"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                multiline={true}
                                                value={check.comment}
                                                rows={3}
                                                rowsMax={4}
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <div style={{ float: 'right', marginBottom: '20px' }}>
                                    <Button type="reset" variant="contained" color="default" onClick={() => component.reset()}> DISCARD </Button>
                                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}> SAVE </Button>
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
