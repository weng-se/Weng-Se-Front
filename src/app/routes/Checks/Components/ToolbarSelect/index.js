import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage } from "react-intl";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import compose from 'recompose/compose';
import {
    connect
} from 'react-redux';
import {
    withStyles
} from '@material-ui/core/styles';
import { createRemiseRequest } from "../../../../../actions/Checks";
import {
    Grid
} from '@material-ui/core';
import {
    ValidatorForm,
    TextValidator
} from 'react-material-ui-form-validator';

const styles = {
  iconButton: {
  },
};

class ToolbarSelect extends React.Component {
 

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            remise: {
                bankId: "",
                number: "",
                issuedDate: "",
                numberCheck: 0,
                amount: 0,
                status: "En attente",
            },
            ids: [],
            banks: []
        }
    }

    handleOpenModal = () => {
        this.setState({ openModal: true });
    }
    
    handleCloseModal = () => {
        this.setState({ openModal: false });
    }

    handleChange = (e) => {
        this.setState({
            remise: {
                ...this.state.remise,
                [e.target.name]: e.target.value
            }
        })
    }

    createRemise = () => {
        this.props.createRemise(this.state.remise);
    }

    componentDidMount() {
        this.getBanks();
    }

    componentWillMount() {
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


    getBanks = () => {
        fetch('http://localhost:4000/api/banks?filter[where][wengseAccount]=true')
            .then((response) => response.json())
            .then((banks) => this.setState({
                banks
            }))
            .catch((error) => console.error(error));
    } 


    componentWillReceiveProps(nextProps) {
        if(nextProps.remise) {
            window.location.reload();
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Tooltip title={<FormattedMessage id="label.createRemise"/> }>
                    <Button size="small" variant="contained" color="primary" onClick={this.handleOpenModal}>
                        <FormattedMessage id="label.createRemise"/> 
                    </Button>
                </Tooltip>

                <Dialog open={this.state.openModal} onClose={this.handleCloseModal}>
                    <DialogTitle>
                        <FormattedMessage id="label.createNewRemise"/>
                    </DialogTitle>
                    <DialogContent>

                        <ValidatorForm style={{ width: '100%' }} onSubmit={this.createRemise} id="formRemise" noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl style={{ width: '100%', padding: '5px' }} >
                                        <TextValidator
                                            id="number"
                                            type="text"
                                            name="number"
                                            label={<FormattedMessage id="label.remiseNumber" />}
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
                                            name="bankId"
                                            label={<FormattedMessage id="label.bank" />}
                                            onChange={this.handleChange}
                                            SelectProps={{ native: true }}
                                            margin="dense"
                                            variant="outlined"
                                            required="true"
                                            value={this.state.remise.bank}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        >
                                        <option value={""}></option>
                                        {this.state.banks.map(option => (
                                            <option key={option.id} value={option.id}>
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
                        <Button onClick={this.handleCloseModal} color="secondary">
                            <FormattedMessage id="label.discard" />
                        </Button>
                        <Button type="submit" color="primary" form="formRemise">
                            <FormattedMessage id="label.save" />
                        </Button>
                    </DialogActions>
                </Dialog>


            </React.Fragment>
        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        createRemise : (formData) => dispatch(createRemiseRequest(formData))
    }
}

const mapStateToProps = (state) => {
    const {
        remise
    } = state;
    return {
        remise
    }
}
  

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(ToolbarSelect);