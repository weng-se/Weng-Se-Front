import React from 'react';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import {
    CardContent,
    CardHeader,
    FormControl,
    Card,
    Button,
    TextField
} from '@material-ui/core';
import {
    toast,
    ToastContainer,
} from 'react-toastify';

const civilities = [
    {
        value: 'MEN',
        label: 'HOMME',
    },
    {
        value: 'WOMEN',
        label: 'FEMME',
    }
];



const Template = (component) => {
    const {
        supplier
    } = component.state;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">

                <div className="align-items-center justify-content-between">
                    <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

                        <Grid container spacing={3}>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        id="firstName"
                                        name="firstName"
                                        label={<FormattedMessage id="label.firstName" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.firstName}
                                        validators={['required']}
                                        errorMessages={['firstName field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        id="lastName"
                                        name="lastName"
                                        label={<FormattedMessage id="label.lastName" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.lastName}
                                        validators={['required']}
                                        errorMessages={['lastName field is required']}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        id="type"
                                        name="type"
                                        label={<FormattedMessage id="label.type" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.type}
                                        validators={['required']}
                                        errorMessages={['Type field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        id="civility"
                                        select
                                        name="civility"
                                        label={<FormattedMessage id="label.civility" />}
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        margin="dense"
                                        variant="outlined"
                                        value={supplier.civility}
                                    >
                                        {civilities.map(option => (
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
                                        id="email"
                                        name="email"
                                        label={<FormattedMessage id="label.email" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['Email field is required', 'email is not valid']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        id="dateBirth"
                                        name="dateBirth"
                                        label={<FormattedMessage id="label.birthDate" />}
                                        type="date"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.dateBirth}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        type="department"
                                        name="department"
                                        id="department"
                                        label={<FormattedMessage id="label.department" />}
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.department}
                                        validators={['required']}
                                        errorMessages={['Department field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="address Line"
                                        onChange={component.handleChange}
                                        name="addressLine1"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.addressLine1}
                                        validators={['required']}
                                        errorMessages={['Address field is required']}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="address Line"
                                        onChange={component.handleChange}
                                        name="addressLine2"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.addressLine2}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="address Line"
                                        onChange={component.handleChange}
                                        name="addressLine3"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.addressLine3}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="address Line"
                                        onChange={component.handleChange}
                                        name="addressLine4"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.addressLine4}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="address Line"
                                        onChange={component.handleChange}
                                        name="addressLine5"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.addressLine5}

                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        label={<FormattedMessage id="label.country" />}
                                        onChange={component.handleChange}
                                        name="countryCode"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.countryCode}
                                        validators={['required']}
                                        errorMessages={['Country field is required']}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }}>
                                    <TextValidator
                                        label={<FormattedMessage id="label.city" />}
                                        onChange={component.handleChange}
                                        name="city"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.city}
                                        validators={['required']}
                                        errorMessages={['City field is required']}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.website" />}
                                        onChange={component.handleChange}
                                        name="websiteURL"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.websiteURL}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.skype" />}
                                        onChange={component.handleChange}
                                        name="skype"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.skype}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.phone" />}
                                        onChange={component.handleChange}
                                        name="phone"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.phone}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.mobile" />}
                                        onChange={component.handleChange}
                                        name="mobile"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.mobile}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={4}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.fax" />}
                                        onChange={component.handleChange}
                                        name="fax"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.fax}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.bank" />}
                                        onChange={component.handleChange}
                                        name="bank"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.bank}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.iban" />}
                                        onChange={component.handleChange}
                                        name="iban"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.iban}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.bic" />}
                                        onChange={component.handleChange}
                                        name="bic"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.bic}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.siren" />}
                                        onChange={component.handleChange}
                                        name="siren"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.siren}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.siret" />}
                                        onChange={component.handleChange}
                                        name="siret"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.siret}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label="TVA Export"
                                        onChange={component.handleChange}
                                        name="tvaExport"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.siret}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.tva" />}
                                        onChange={component.handleChange}
                                        name="tva"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.tva}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.tvaCode" />}
                                        onChange={component.handleChange}
                                        name="tvaCode"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.tvaCode}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.family" />}
                                        onChange={component.handleChange}
                                        name="family"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.family}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.paymentMethod" />}
                                        onChange={component.handleChange}
                                        name="paymentMethod"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.paymentMethod}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.title" />}
                                        onChange={component.handleChange}
                                        name="title"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.title}
                                        validators={['required']}
                                        errorMessages={['Title field is required']}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl style={{ width: '100%', padding: '5px' }} >
                                    <TextValidator
                                        label={<FormattedMessage id="label.status" />}
                                        onChange={component.handleChange}
                                        name="status"
                                        margin="dense"
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={supplier.status}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>


                        <div style={{ float: 'right', marginBottom: '20px' }}>
                            <Button type="button" variant="contained" color="default" onClick={() => component.backtolist()}> <FormattedMessage id="label.discard" /> </Button>
                            <Button type="submit" variant="contained" color="primary" onClick={() => component.editSupplier()} style={{ marginLeft: '5px' }}> <FormattedMessage id="label.save" /> </Button>
                        </div>

                    </ValidatorForm>

                </div>
            </div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>
    )
}


export default Template;


