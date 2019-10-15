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
import { CardContent, Typography } from '@material-ui/core';
import ChartToday from './../../Components/ChartToday/';
import ChartTomorrow from './../../Components/ChartTomorrow/';
import ChartWeek from './../../Components/ChartWeek/';
import ChartRest from './../../Components/ChartRest/'

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

            <div className="row animated slideInUpTiny animation-duration-3" style={{ marginTop: `10px` }}>

                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartToday/>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartTomorrow/>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartWeek/>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <ChartRest/>
                </div>

                <div className="col-lg-12 col-sm-12 col-12">

                    <Card style={{ marginTop: `10px` }}>
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


            </div>

            <div id="page-landing">

            </div>


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