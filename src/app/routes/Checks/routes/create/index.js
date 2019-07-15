import React from 'react';
import { 
    toast 
} from 'react-toastify';
import {
    connect
} from 'react-redux';
import {
    withStyles
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Template from './template';

const styles = {
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            numberOfCheque: null,
            bank: null,
            comment: null,
            amount: null,
            remiseNumber: null,
            issuedDate: new Date('now'),
            cashingDateDesired: new Date('now'),
            selectedDate: null, 
            setSelectedDate: null,
            customers: []
        }
    }

    handleDateChange = (setSelectedDate) => {
        this.setState({ setSelectedDate })
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/costumers')
            .then((response) => response.json())
            .then((customers) => this.setState({ customers }))
            .catch((error) => console.error(error));
            
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (Template(this));
    }
}


Create.propTypes = {
    
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps, 
        mapDispatchToProps
))(Create);
