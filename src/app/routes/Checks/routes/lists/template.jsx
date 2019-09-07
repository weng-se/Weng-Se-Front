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
                    <Card style={{ backgroundColor: `#FEA47F` }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.today"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.numberOfCheck"/> : { component.state.countToday }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.totalAmount"/> : { component.state.sumToday }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card style={{ backgroundColor: `#55E6C1` }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.tomorrow"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.numberOfCheck"/> : { component.state.countTomorrow }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.totalAmount"/> : { component.state.sumTomorrow }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card style={{ backgroundColor: `#EAB543` }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.currentWeek"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.numberOfCheck"/> : { component.state.countWeek }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.totalAmount"/> : { component.state.sumWeek }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-3 col-sm-6 col-12">
                    <Card style={{ backgroundColor: `#25CCF7` }}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h6">
                                <FormattedMessage id="label.rest"/>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.numberOfCheck"/> : { component.state.countRest }
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FormattedMessage id="label.totalAmount"/> : { component.state.sumRest }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-lg-12 col-sm-12 col-12">

                    <Card style={{ marginTop: `20px` }}>
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