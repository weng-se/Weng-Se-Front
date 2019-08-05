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
import { FormattedMessage } from 'react-intl';


const status = [
    {
        value: '',
        label: '',
    },
    {
        value: 'VALID',
        label: 'Valide',
    },
    {
        value: 'INVALID',
        label: 'Invalide',
    }
];


const Template = (component) => {
    const {
        bank,
    } = component.state;
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card style={{ width: '50%', margin: 'auto' }}>
                    <CardContent>
                        <CardHeader titleTypographyProps={{ align: 'left' }} title={<FormattedMessage id="pages.createNewBank" />} />
                        <div className="align-items-center justify-content-between">
                            <ValidatorForm style={{ width: '100%' }} onSubmit={component.handleSubmit} noValidate autoComplete="off">

                                <Grid container spacing={3}>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="title"
                                                type="text"
                                                name="title"
                                                label={<FormattedMessage id="label.title" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={bank.title}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['Title field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }} >
                                            <TextValidator
                                                id="name"
                                                name="name"
                                                label={<FormattedMessage id="label.bankName" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={bank.name}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                validators={['required']}
                                                errorMessages={['Name field is required']}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%', padding: '5px' }}>
                                            <TextValidator
                                                id="status"
                                                select
                                                name="status"
                                                label={<FormattedMessage id="label.status" />}
                                                onChange={component.handleChange}
                                                SelectProps={{ native: true }}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={bank.status}
                                            >
                                                {status.map(option => (
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
                                                id="contact"
                                                name="contact"
                                                label={<FormattedMessage id="label.contact" />}
                                                onChange={component.handleChange}
                                                margin="dense"
                                                variant="outlined"
                                                required="true"
                                                value={bank.contact}
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
                                                value={bank.comment}
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
                                    <Button type="button" variant="contained" color="default" onClick={() => component.backtolist()}>
                                        <FormattedMessage id="label.discard" />
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '5px' }}>
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
