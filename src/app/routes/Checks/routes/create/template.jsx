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
        value: 'SUBMIT',
        label: 'SUBMIT',
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
        value: 'CIH',
        label: 'CIH BANK',
    },
    {
        value: 'BMCE',
        label: 'BMCE BANK',
    },
    {
        value: 'ATTIJARI',
        label: 'ATTIJARI BANK',
    },
    {
        value: 'BMCI',
        label: 'BMCI BANK',
    },
    {
        value: 'POPULAR',
        label: 'POPULAIRE BANK',
    }
];


const Template = (component) => {
    const {
        customer,
        numberOfCheque,
        bank,
        comment,
        amount,
        remiseNumber,
        issuedDate,
        cashingDateDesired,
        customers
    } = component.state;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card style={{ width: '60%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={'Create a new cheks:'} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>

                                            <TextValidator
                                                id="customer"
                                                select
                                                name="customer"
                                                label="Customer"
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
                                                value={bank}
                                            >
                                                {banks.map(option => (
                                                    <option key={option.value} value={option.value}>
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
                                                name="numberOfCheque"
                                                label="Number Of Cheque"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={numberOfCheque}
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
                                                value={amount}
                                                validators={['required']}
                                                errorMessages={['Amount field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="remiseNumber"
                                                name="remiseNumber"
                                                label="Remise Number"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={remiseNumber}
                                                validators={['required']}
                                                errorMessages={['Remise Number field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="standard-select-status-native"
                                                select
                                                name="status"
                                                label="Status"
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                helperText="Please select status"
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={status}
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
                                                value={issuedDate}
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
                                                value={cashingDateDesired}
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
                                                value={comment}
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
