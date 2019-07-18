import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Update from './../update/';
import {
    MuiThemeProvider
} from '@material-ui/core/styles';
import {
    toast,
    ToastContainer
} from 'react-toastify';
import Card from '@material-ui/core/Card';

const styles = theme => ({
    datatables: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '16%',
        flexShrink: 0,
    }
});

const Template = (component) => {
    return (
        <React.Fragment>
            <div className="row animated slideInUpTiny animation-duration-3">
                <Card>
                    <MuiThemeProvider theme={component.getMuiTheme()}>
                        <MUIDataTable
                            title={"Listes des chèques"}
                            id="muiChecksDataTable"
                            data={Array.from(component.state.checks)}
                            columns={component.columns}
                            options={component.options}
                        />
                    </MuiThemeProvider>
                    {component.props.progress !== 100 &&
                        <div className="loader-view">
                            <CircularProgress />
                        </div>
                    }
                </Card>
            </div>

            <Dialog
                open={component.state.open}
                onClose={component.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Are you sure to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Are you sure you want to delete user permanently ?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={component.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={component.handleConfirm} color="primary" autoFocus>
                        Confirm
                        </Button>
                </DialogActions>
            </Dialog>


            <Dialog open={component.state.show} onClose={component.closeRemiseDialog}>
                <DialogTitle>Nouvelle remise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez saisir les détails de la remise.
                        </DialogContentText>
                    <TextField
                        name="number"
                        label="Numero de remise"
                        margin="normal"
                        fullWidth
                        value={component.state.number}
                        onChange={component.handleInputChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="bank">Banque</InputLabel>
                        <Select
                            inputProps={{
                                name: 'bank',
                            }}
                            value={component.state.bank}
                            onChange={component.handleInputChange}
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
                        label="Date de remise"
                        value={component.state.issuedDate}
                        onChange={component.handleDateChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={component.closeRemiseDialog} color="secondary">
                        Annuler
                        </Button>
                    <Button onClick={component.saveRemise} color="primary">
                        Créer
                        </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={component.state.openUpdateDialog}
                onClose={component.closeUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <Update/>
                </DialogContent>
            </Dialog>

            <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        </React.Fragment>

    )

}


export default Template;