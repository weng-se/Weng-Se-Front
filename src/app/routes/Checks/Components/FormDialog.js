import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import {
    toast, ToastContainer
} from 'react-toastify';
import {
    Grid
} from '@material-ui/core';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';
import { FormattedMessage } from 'react-intl'; 
import axios from 'axios';


class FormDialog extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            remise: {
                bank: null,
                number: null,
                issuedDate: null,
                numberCheck: 0,
                amount: 0,
                status: "En attente"
            },
            banks: [],
            data: []
        }
    }

    componentWillMount(props) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) dd = '0'+dd
        if(mm<10) mm = '0'+mm
        
        today = yyyy + '-' + mm + '-' + dd;
        
        this.setState({
            remise: {
                ...this.state.remise,
                issuedDate : today
            }
        });
    }

    componentDidMount() {
        this.getBanks();
    }

    getBanks = () => {
        fetch('http://localhost:4000/api/banks?filter[where][wengseAccount]=true')
            .then((response) => response.json())
            .then((banks) => this.setState({
                banks
            }))
            .catch((error) => console.error(error));
    } 

    handleChange = (e) => {
        this.setState({
            remise: {
                ...this.state.remise,
                [e.target.name]: e.target.value
            }
        });
    }

    closeModal = () => {
        this.props.close();
    }

    reset = () => {
        this.setState({
            remise: {
                ...this.state.remise,
                bank: '',
                number: '',
                issuedDate: '',
                numberCheck: 0,
                amount: 0,
                status: "En attente"
            }
          
        });
    }

    componentWillReceiveProps(nextProps) {
        
        if(this.state.remise.numberCheck != nextProps.count) {
            this.setState({ 
                remise: {
                    ...this.state.remise,
                    numberCheck : nextProps.count 
                }
            })
        }

        console.log("nextProps.cehck", nextProps.checks)

    }
    

    createSmartDiscount = () => {
        axios.post("http://localhost:4000/api/remises", this.state.remise)
        .then((res) => {
            if(res.status === 200 && res.statusText === "OK") {
                if (!toast.isActive('smartDiscountSuccess')) {
                    toast.success('Successfully Created !', {
                        delay: 1000,
                        autoClose: true,
                        closeButton: true,
                        toastId: 'smartDiscountSuccess'
                    });
                }
                this.reset();
                this.setState({ data: res.data });
                setTimeout(() => this.closeModal(), 500);
            } 
        })
        .catch((res) => { 
            console.log(res) 
        })
    }


    render() {
        return (
            <React.Fragment>

                <Dialog open={this.props.open} onClose={this.props.close}>
                    <DialogTitle>
                        <FormattedMessage id="label.createNewRemise"/>
                    </DialogTitle>
                    <DialogContent>

                        <ValidatorForm style={{ width: '100%' }} onSubmit={this.createSmartDiscount} id="formRemise" noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100%', padding: '5px' }} >
                                        <TextValidator
                                            id="number"
                                            type="text"
                                            name="number"
                                            label={<FormattedMessage id="label.checkNumber" />}
                                            onChange={this.handleChange}
                                            margin="dense"
                                            variant="outlined"
                                            required="true"
                                            value={this.state.remise.number}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            validators={['required']}
                                            errorMessages={[<FormattedMessage id="label.msgCheckNumberRequired"/>]}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100%', padding: '5px' }}>
                                        <TextValidator
                                            id="bank"
                                            select
                                            name="bank"
                                            label={<FormattedMessage id="label.bank" />}
                                            onChange={this.handleChange}
                                            SelectProps={{ native: true }}
                                            margin="dense"
                                            variant="outlined"
                                            value={this.state.remise.bank}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        >
                                        <option value={""}></option>
                                        {this.state.banks.map(option => (
                                            <option key={option.id} value={option.name}>
                                                {option.title}
                                            </option>
                                        ))}
                                        </TextValidator>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100%', padding: '5px' }} >
                                        <TextValidator
                                            type="date"
                                            id="issuedDate"
                                            name="issuedDate"
                                            label={<FormattedMessage id="label.date" />}
                                            onChange={this.handleChange}
                                            margin="dense"
                                            variant="outlined"
                                            value={this.state.remise.issuedDate}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>           
                        </ValidatorForm>
    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close} color="secondary">
                            <FormattedMessage id="label.discard" />
                        </Button>
                        <Button type="submit" color="primary" form="formRemise">
                            <FormattedMessage id="label.save" />
                        </Button>
                    </DialogActions>
                </Dialog>

                <ToastContainer position={toast.POSITION.TOP_RIGHT} />

            </React.Fragment>
        );
    }
}

export default FormDialog;