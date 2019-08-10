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
        customer
    } = component.state;
    return (
        <React.Fragment>
            <ValidatorForm style={{ width: '100%' }} onSubmit={component.editCheck} noValidate autoComplete="off">


                <Grid container spacing={3}>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                id="firstName"
                                name="firstName"
                                label={<FormattedMessage id="label.firstName"/>}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.firstName}
                                validators={['required']}
                                errorMessages={['Nom est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                id="lastName"
                                name="lastName"
                                label={<FormattedMessage id="label.lastName"/>}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.lastName}
                                validators={['required']}
                                errorMessages={['Prenom est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                id="type"
                                name="type"
                                label={<FormattedMessage id="label.type"/>}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.type}
                                validators={['required']}
                                errorMessages={['Type est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                id="civility"
                                select
                                name="civility"
                                label={<FormattedMessage id="label.civility"/>}
                                onChange={component.handleChange}
                                SelectProps={{ native: true }}
                                margin="dense"
                                variant="outlined"
                                value={customer.civility}>
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
                                label={<FormattedMessage id="label.email"/>}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Email est obligatoire', 'email est non valide']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                id="dateBirth"
                                name="dateBirth"
                                label={<FormattedMessage id="label.birthDate"/>}
                                type="date"
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.dateBirth}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                type="department"
                                name="department"
                                id="department"
                                label={<FormattedMessage id="label.department"/>}
                                onChange={component.handleChange}
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.department}
                                validators={['required']}
                                errorMessages={['Department est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.address"/>}
                                onChange={component.handleChange}
                                name="address"
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.address}
                                validators={['required']}
                                errorMessages={['Adresse est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                label={<FormattedMessage id="label.country"/>}
                                onChange={component.handleChange}
                                name="country"
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.country}
                                validators={['required']}
                                errorMessages={['Pays est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }}>
                            <TextValidator
                                label={<FormattedMessage id="label.city"/>}
                                onChange={component.handleChange}
                                name="city"
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.city}
                                validators={['required']}
                                errorMessages={['Ville est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.website"/>}
                                onChange={component.handleChange}
                                name="websiteURL"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.websiteURL}
                                required="true"
                                validators={['required']}
                                errorMessages={['Site web est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.skype"/>}
                                onChange={component.handleChange}
                                name="skype"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.skype}
                                required="true"
                                validators={['required']}
                                errorMessages={['Skype est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.phone"/>}
                                onChange={component.handleChange}
                                name="phone"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.phone}
                                required="true"
                                validators={['required']}
                                errorMessages={['Téléphone est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.mobile"/>}
                                onChange={component.handleChange}
                                name="mobile"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.mobile}
                                required="true"
                                validators={['required']}
                                errorMessages={['Mobile est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.fax"/>}
                                onChange={component.handleChange}
                                name="fax"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.fax}
                                required="true"
                                validators={['required']}
                                errorMessages={['Fax est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.bank"/>}
                                onChange={component.handleChange}
                                name="bank"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.bank}
                                required="true"
                                validators={['required']}
                                errorMessages={['Bank est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.iban"/>}
                                onChange={component.handleChange}
                                name="iban"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.iban}
                                required="true"
                                validators={['required']}
                                errorMessages={['Iban est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.bic"/>}
                                onChange={component.handleChange}
                                name="bic"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.bic}
                                required="true"
                                validators={['required']}
                                errorMessages={['Bic est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.siren"/>}
                                onChange={component.handleChange}
                                name="siren"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.siren}
                                required="true"
                                validators={['required']}
                                errorMessages={['Siren est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.siret"/>}
                                onChange={component.handleChange}
                                name="siret"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.siret}
                                required="true"
                                validators={['required']}
                                errorMessages={['Siret est obligatoire']}
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
                                value={customer.siret}
                                required="true"
                                validators={['required']}
                                errorMessages={['Tva Export est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.tva"/>}
                                onChange={component.handleChange}
                                name="tva"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.tva}
                                required="true"
                                validators={['required']}
                                errorMessages={['TVA est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={3}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.tvaCode"/>}
                                onChange={component.handleChange}
                                name="tvaCode"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.tvaCode}
                                required="true"
                                validators={['required']}
                                errorMessages={['Code TVA est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.family"/>}
                                onChange={component.handleChange}
                                name="family"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.family}
                                required="true"
                                validators={['required']}
                                errorMessages={['Famille est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.paymentMethod"/>}
                                onChange={component.handleChange}
                                name="paymentMethod"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.paymentMethod}
                                required="true"
                                validators={['required']}
                                errorMessages={['Methode de paiment est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.title"/>}
                                onChange={component.handleChange}
                                name="title"
                                margin="dense"
                                variant="outlined"
                                required="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.title}
                                validators={['required']}
                                errorMessages={['Title est obligatoire']}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%', padding: '5px' }} >
                            <TextValidator
                                label={<FormattedMessage id="label.status"/>}
                                onChange={component.handleChange}
                                name="status"
                                margin="dense"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={customer.status}
                                required="true"
                                validators={['required']}
                                errorMessages={['Titre est obligatoire']}
                            />
                        </FormControl>
                    </Grid>

                </Grid>


                <div style={{ float: 'right', marginBottom: '20px' }}>
                    <Button type="reset" variant="contained" color="default"> <FormattedMessage id="label.discard"/> </Button>
                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}> <FormattedMessage id="label.save"/> </Button>
                </div>

            </ValidatorForm>
        </React.Fragment>

    )

}


export default Template;
