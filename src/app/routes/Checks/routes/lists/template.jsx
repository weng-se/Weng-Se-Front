import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from '@material-ui/core/styles';
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
                            data={Array.from(component.state.data)}
                            columns={component.columns}
                            options={component.options}
                        />
                    </MuiThemeProvider>
                </Card>
                {component.props.progress !== 100 &&
                    <div className="loader-view">
                        <CircularProgress />
                    </div>
                }
            </div>
        </React.Fragment>

    )

}


export default Template;