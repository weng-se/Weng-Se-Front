import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import higherOrderComponent from './higherOrderComponent';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BarChartIcon from '@material-ui/icons/BarChart';
import "./style.css";

const ChartTomorrow = (props) => {
    const { count, sum } = props;
    return (
        <Card className="chart-tomorrow">
            <CardContent >
                <Typography className="card-title" gutterBottom variant="h6" component="h6">
                    <FormattedMessage id="label.tomorrow"/>
                </Typography>
                <div className="icon-container">
                    <BarChartIcon className="card-icon" />
                </div>
                <div className="card-box">
                <div className="card-box1"> 
                <Typography className="card-text" variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="label.ncheck"/> <span className="card-number">{ count }</span>
                </Typography>
                </div>
                <div className="card-box2"> 
                <Typography  className="card-text" variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="label.totalAmount"/> <span className="card-number">{ sum }</span>
                </Typography>
                </div>
                </div>
            </CardContent>
        </Card>
    );
}

ChartTomorrow.propTypes = {
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired
};

export default higherOrderComponent(ChartTomorrow);