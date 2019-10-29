import React from 'react';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { FormattedMessage } from 'react-intl';

const roles = [
    {
        value: 'ROLE_SALESMANAGER',
        label: 'Responsable vente'
        //label: <FormattedMessage id="label.salesmanager"/>,
    },
    {
        value: 'ROLE_ADMIN',
        label: 'Administrateur'
        //label: <FormattedMessage id="label.administrator"/>,
    },
    {
        value: 'ROLE_STOCKMANAGER',
        label: 'Responsable stock'
        //label: <FormattedMessage id="label.stockmanager"/>,
    }

];

const Template = (component) => {
    const {
        username,
        email,
        phoneNumber,
        password,
        repeatPassword,
        disabled,
        role,
        note
    } = component.state;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card style={{ width: '55%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={<FormattedMessage id="pages.createNewUser"/>} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>
                                            <TextValidator
                                                id="username"
                                                name="username"
                                                label={<FormattedMessage id="label.username" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={username}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.usernameRequired"/>]}
                                            />
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
                                                value={email}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required', 'isEmail']}
                                                errorMessages={[<FormattedMessage id="label.emailRequired"/>, <FormattedMessage id="label.emailnotValide"/>]}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                label={<FormattedMessage id="label.phone" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={phoneNumber}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.phoneRequired"/>]}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                type="password"
                                                name="password"
                                                id="password"
                                                label={<FormattedMessage id="label.password" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={password}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={[<FormattedMessage id="label.passwordRequired"/>]}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                label={<FormattedMessage id="label.repeatPassword" />}
                                                onChange={component.handleChange}
                                                name="repeatPassword"
                                                type="password"
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['isPasswordMatch', 'required']}
                                                errorMessages={[<FormattedMessage id="label.passwordmismatch"/>, <FormattedMessage id="label.passwordRequired"/>]}
                                                value={repeatPassword}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>
                                            <TextValidator
                                                id="standard-select-currency-native"
                                                select
                                                name="role"
                                                label={<FormattedMessage id="label.role"/>}
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={role}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                {roles.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextValidator>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel style={{ marginTop: '10px', marginLeft: '10px' }} control={
                                            <Switch
                                                checked={disabled}
                                                onChange={component.handleSwicth}
                                                value="checkedB"
                                                color="primary"
                                                name="disabled"
                                                id="disabled"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        } label={<FormattedMessage id="label.status" />} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextField
                                                type="textarea"
                                                id="note"
                                                name="note"
                                                label={<FormattedMessage id="label.note" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                multiline={true}
                                                rows={3}
                                                rowsMax={4}
                                                value={note}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>

                                <div style={{ float: 'right', marginBottom: '20px' }}>
                                    <Button type="button" variant="contained" color="default" onClick={() => component.backtolist()}> <FormattedMessage id="label.discard" /> </Button>
                                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}> <FormattedMessage id="label.save" /> </Button>
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
