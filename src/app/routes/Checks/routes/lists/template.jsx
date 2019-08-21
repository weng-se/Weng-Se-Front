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
import OutlinedInput from '@material-ui/core/OutlinedInput';
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
import { FormattedMessage } from 'react-intl';
import FormDialog from '../../Components/FormDialog';
import { CardContent, Typography } from '@material-ui/core';

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

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.today"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Nombre de chèque : { component.state.countToday }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.tomorrow"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Nombre de chèque : { component.state.countTomorrow }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.currentWeek"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Nombre de chèque : { component.state.countWeek }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.rest"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Nombre de chèque : { component.state.count }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <br/><br/><br/><br/><br/><br/>

                <Card>
                    <MuiThemeProvider theme={component.getMuiTheme()}>
                        <MUIDataTable
                            key={"fr"}
                            title={<FormattedMessage id="pages.listChecks" />}
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

            <div id="page-landing">

            </div>

            {/* <FormDialog open={component.state.show}/> */}

            {/* <Dialog open={component.state.show} onClose={component.closeRemiseDialog}>
                <DialogTitle>
                    <FormattedMessage id="label.createNewRemise" />
                </DialogTitle>

                <DialogContent>
                    <TextField
                        name="number"
                        label="Numero de remise"
                        margin="normal"
                        fullWidth
                        value={component.state.number}
                        onChange={component.handleChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="bank">Banque</InputLabel>
                        <Select
                            inputProps={{
                                name: 'bank',
                            }}
                            value={component.state.bank}
                            onChange={component.handleChange}
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
                        onChange={component.handleChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={component.closeRemiseDialog} color="primary">
                        <FormattedMessage id="label.discard" />
                    </Button>
                    <Button onClick={component.addRemise()} color="primary">
                        <FormattedMessage id="label.save" />
                    </Button>
                </DialogActions>
            </Dialog> */}


            <Dialog
                open={component.state.openUpdateDialog}
                onClose={component.closeUpdateDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-slide-title">{<FormattedMessage id="pages.updateCheckTitle" />}</DialogTitle>
                <DialogContent>
                    <Update />
                </DialogContent>
                <DialogActions>
                    <Button onClick={component.closeUpdateDialog} color="primary">
                        <FormattedMessage id="label.discard" />
                    </Button>
                    <Button type="submit" onClick={() => component.addRemise()} form="updateCheckFrom" color="primary">
                        <FormattedMessage id="label.save" />
                    </Button>
                </DialogActions>
            </Dialog>


        </React.Fragment>

    )

}


export default Template;