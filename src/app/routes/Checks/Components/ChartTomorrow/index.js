import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import higherOrderComponent from './higherOrderComponent';

const ChartTomorrow = (props) => {
    const { count, sum } = props;
    return (
        <Card style={{ backgroundColor: `#55E6C1` }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                    <FormattedMessage id="label.tomorrow"/>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="label.numberOfCheck"/> : { count }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <FormattedMessage id="label.totalAmount"/> : { sum }
                </Typography>
            </CardContent>
        </Card>
    );
}

ChartTomorrow.propTypes = {
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired
};

export default higherOrderComponent(ChartTomorrow);