import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage } from 'react-intl';



class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issuedDate: new Date()
        }
    }

    handleRequestClose = () => {
        this.props.handleCloseModal()
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
      }

      handleDateChange = date => {
        this.setState({ issuedDate: date._d });
      };

      saveRemise = () => {
        this.props.saveRemise(this.state)
      }

    render() {
        return (
            <div>
                <Dialog open={true} onClose={this.handleRequestClose}>
                    <DialogTitle><FormattedMessage id="label.createNewRemise"/></DialogTitle>
                    <DialogContent>
                        <TextField
                        name="number"
                        label="Numero de remise"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={this.state.number}
                        onChange={this.handleInputChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <Select
                                inputProps={{
                                    name: 'bank',
                                }}
                                value={this.state.bank}
                                variant="outlined"
                                onChange={this.handleInputChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'SG'}>SG</MenuItem>
                                <MenuItem value={'BNP'}>BNP</MenuItem>
                                <MenuItem value={'LCL'}>LCL</MenuItem>
                                <MenuItem value={'HSBC'}>HSBC</MenuItem>
                                <MenuItem value={'LBP'}>LBP</MenuItem>
                            </Select>
                        </FormControl>
                        <DatePicker
                        id="remiseDate"
                        variant="outlined"
                        label="Date de remise"
                        value={this.state.issuedDate}
                        onChange={this.handleDateChange}
                        fullWidth
                        margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="secondary">
                            Annuler
                        </Button>
                        <Button onClick={this.saveRemise} color="primary">
                            Créer
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default FormDialog;