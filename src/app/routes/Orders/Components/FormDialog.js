import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';


class FormDialog extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleUpdateData = () => {
        this.props.handleUpdateData();
    };

    createOrder = () => {
        fetch('http://localhost:4000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
          }).then( r => {
            this.handleRequestClose();
            this.handleUpdateData();
          })
          
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        console.log(value)
        console.log(event)
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <div>
                <Button variant="raised" className="bg-primary text-white" onClick={this.handleClickOpen}><i className="zmdi zmdi-plus zmdi-hc-lg" /></Button>
                <Dialog open={this.state.open} onClose={this.handleRequestClose}>
                    <DialogTitle>Nouvelle commande</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pour créer une nouvelle commande, entrer les détails de la commande.
                        </DialogContentText>
                        <TextField
                            margin="normal"
                            name="client"
                            label="Client"
                            value={this.state.client}
                            onChange={this.handleInputChange}
                            fullWidth
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="etiq_imprime">Etiquette imprimé</InputLabel>
                            <Select
                                inputProps={{
                                name: 'etiqImprime',
                                }}
                                value={this.state.etiqImprime}
                                onChange={this.handleInputChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                        name="palNbr"
                        label="Nombre de palettes"
                        type="number"
                        margin="normal"
                        fullWidth
                        value={this.state.palNbr}
                        onChange={this.handleInputChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="prepa">Préparation</InputLabel>
                            <Select
                                inputProps={{
                                name: 'prepa',
                                }}
                                value={this.state.prepa}
                                onChange={this.handleInputChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'L'}>L</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                        name="transporter"
                        label="Transporteur"
                        margin="normal"
                        fullWidth
                        value={this.state.transporter}
                        onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="secondary">
                            Annuler
                        </Button>
                        <Button onClick={this.createOrder} color="primary">
                            Créer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FormDialog;