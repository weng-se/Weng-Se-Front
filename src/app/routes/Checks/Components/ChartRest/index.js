import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import higherOrderComponent from './higherOrderComponent';

const ChartRest = (props) => {
    const { count, sum } = props;
    return (
        <Card style={{ backgroundColor: `#25CCF7` }}>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                    <FormattedMessage id="label.rest"/>
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

ChartRest.propTypes = {
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired
};

export default higherOrderComponent(ChartRest);