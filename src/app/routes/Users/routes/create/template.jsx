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

const roles = [
    {
        value: 'ROLE_GESTIONNAIRE',
        label: 'GESTIONNAIRE',
    },
    {
        value: 'ROLE_SUPERVISOR',
        label: 'SUPERVISOR',
    },
    {
        value: 'ROLE_ADMIN',
        label: 'ADMINISTRATEUR',
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
                <Card style={{ width: '60%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={'Create a new user account:'} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>
                                            <TextValidator
                                                id="username"
                                                name="username"
                                                label="Username"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Username"
                                                required="true"
                                                value={username}
                                                validators={['required']}
                                                errorMessages={['Username field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="email"
                                                name="email"
                                                label="Email"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Email"
                                                required="true"
                                                value={email}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['Email field is required', 'email is not valid']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                label="Phone"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Phone"
                                                required="true"
                                                value={phoneNumber}
                                                validators={['required']}
                                                errorMessages={['Phone number field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                type="password"
                                                name="password"
                                                id="password"
                                                label="Password"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Password"
                                                required="true"
                                                value={password}
                                                validators={['required']}
                                                errorMessages={['Password field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                label="Repeat password"
                                                onChange={component.handleChange}
                                                name="repeatPassword"
                                                type="password"
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Password"
                                                required="true"
                                                validators={['isPasswordMatch', 'required']}
                                                errorMessages={['password mismatch', 'this field is required']}
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
                                                label="Roles"
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                helperText="Please select role"
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={role}
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
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextField
                                                type="textarea"
                                                id="note"
                                                name="note"
                                                label="Note"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Note"
                                                multiline={true}
                                                rows={3}
                                                rowsMax={4}
                                                value={note}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel control={
                                            <Switch
                                                checked={disabled}
                                                onChange={component.handleSwicth}
                                                value="checkedB"
                                                color="primary"
                                                name="disabled"
                                                id="disabled"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        } label="Status (Disabled)" />
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
