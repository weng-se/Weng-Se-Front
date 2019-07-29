import React from 'react';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    toast,
    ToastContainer,
} from 'react-toastify';
import { TextField } from '@material-ui/core';


const Template = (component) => {

    return (
        <React.Fragment>
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">

                    <Card style={{ width: '80%' }}>
                        <CardContent>
                            <Typography variant="h3">Select a CSV or Excel file to import.</Typography>
                            <hr/>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Excel files are recommended as fields formatting is automatic.
                            </Typography>
                            
                            <fieldset>
                                <form>
                                    <TextField
                                        autoComplete="email"
                                        margin="normal"
                                        variant="outlined" 
                                        label="file"
                                        type="file" 
                                        name="file" 
                                        id="file" 
                                        onChange={component.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        accept=".csv,.xlsx" />
                                </form>
                            </fieldset>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => component.handleClick()}>
                                IMPORT
                            </Button>
                            <Button size="small" color="primary">
                                DISCARD
                            </Button>
                        </CardActions>
                    </Card>

                </div>
            </div>
            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>
    )

}


export default Template;