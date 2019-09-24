import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import higherOrderComponent from './higherOrderComponent';


class ChartToday extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sum: 0,
            count: 0
        }
    }

    render() {
        const { count, sum } = this.state;
        return (
            <Card style={{ backgroundColor: `#FEA47F` }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        <FormattedMessage id="label.today"/>
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

}


ChartToday.propTypes = {
    count: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired
};


export default higherOrderComponent(ChartToday);