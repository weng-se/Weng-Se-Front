import React from 'react';
import {
    FormControl,
    Button
} from '@material-ui/core';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    ToastContainer,
    toast
} from 'react-toastify';

const roles = [
    {
        value: 'ROLE_ADMIN',
        label: 'ADMINISTRATEUR',
    },
    {
        value: 'ROLE_SUPERVISOR',
        label: 'SUPERVISOR',
    },
    {
        value: 'ROLE_GESTIONNAIRE',
        label: 'GESTIONNAIRE',
    }
];


const Template = (component) => {

    return (
        <React.Fragment>
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">
                    <div className="align-items-center justify-content-between" style={{ width: '100%' }}>
                        <ValidatorForm style={{ width: '100%' }} noValidate autoComplete="off">
                            <div>
                                <FormControl style={{ width: '100%' }}>
                                    <TextValidator
                                        id="username"
                                        label="Username"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        name="username"
                                        value={component.state.username}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={['Username field is required']}
                                    />
                                </FormControl>
                            </div>

                            <div>
                                <FormControl style={{ width: '100%' }} >
                                    <TextValidator
                                        id="email"
                                        label="Email"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        name="email"
                                        value={component.state.email}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={['Email field is required']}
                                    />
                                </FormControl>
                            </div>

                            <div>
                                <FormControl style={{ width: '100%' }} >
                                    <TextValidator
                                        id="phone"
                                        label="Phone"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        name="phoneNumber"
                                        value={component.state.phoneNumber}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        validators={['required']}
                                        errorMessages={['Phone field is required']}
                                    />
                                </FormControl>
                            </div>

                            <div>
                                <FormControl style={{ width: '100%' }}>
                                    <TextValidator
                                        id="standard-select-currency-native"
                                        select
                                        label="Roles"
                                        onChange={component.handleChange}
                                        SelectProps={{ native: true }}
                                        helperText="Please select role"
                                        margin="dense"
                                        variant="outlined"
                                        required="true"
                                        value={component.state.role}
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
                            </div>

                            <div>
                                <FormControl style={{ width: '100%' }} >
                                    <TextValidator
                                        type="textarea"
                                        id="note"
                                        label="Note"
                                        onChange={component.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        multiline={true}
                                        rows={3}
                                        rowsMax={4}
                                        name="note"
                                        value={component.state.note}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </div>

                            <div style={{ float: 'right', marginBottom: '20px' }}>
                                <Button type="reset" variant="contained" color="default" onClick={() => {component.discard()}}> DISCARD </Button>
                                <Button type="submit" variant="contained" color="primary" onClick={() => {component.updateUser(component.state) }} style={{ marginLeft: '5px' }}> SAVE </Button>
                            </div>

                        </ValidatorForm>
                    </div>
                </div>
            </div>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>
    )

}


export default Template;