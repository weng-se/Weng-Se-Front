import React from 'react';
import { 
    ValidatorForm, 
    TextValidator 
} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
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

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
// }));

const Template = (component) => {

    return (
        <React.Fragment>
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">
                    <Card style={{ width: '70%', margin: 'auto' }}>
                        <CardContent>
                            <CardHeader titleTypographyProps={{ align: 'left' }} title={'Create a new user account:'} />
                            <div className="align-items-center justify-content-between">
                                <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">
                                   
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding:'5px' }}>
                                            <TextValidator
                                                id="username"
                                                name="username"
                                                label="Username"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Username"
                                                required="true"
                                                value={component.state.username}
                                                validators={['required']}
                                                errorMessages={['Username field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding:'5px' }} >
                                            <TextValidator
                                                id="email"
                                                name="email"
                                                label="Email"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Email"
                                                required="true"
                                                value={component.state.email}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['Email field is required', 'email is not valid']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding:'5px' }} >
                                            <TextValidator
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                label="Phone"
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                placeholder="Phone"
                                                required="true"
                                                value={component.state.phoneNumber}
                                                validators={['required']}
                                                errorMessages={['Phone number field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding:'5px' }} >
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
                                                value={component.state.password}
                                                validators={['required']}
                                                errorMessages={['Password field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding:'5px' }} >
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
                                                value={component.state.repeatPassword}
                                                />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl style={{ width: '100%', padding:'5px' }}>
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
                                                value={component.state.roles}
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
                                        <FormControl style={{ width: '100%', padding:'5px' }} >
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
                                                value={component.state.note}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary">  SAVE
                                        </Button>
                                    &nbsp;
                                        <Button
                                        type="reset"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => component.reset()}>  DISCARD
                                        </Button>

                                </ValidatorForm>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>
    )

}


export default Template;