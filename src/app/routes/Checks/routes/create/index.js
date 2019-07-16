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
            check: {
                number: 0,
                bank: 'SG',
                amount: 0,
                customerId: '',
                remiseId: '',
                status: 'WAITING',
                issuedDate: '2019-02-25',
                comment: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
                cashingDateDesired: '2019-02-25',
            },
            selectedDate: null,
            setSelectedDate: null,
            customers: [],
            remises: []
        }
    }

    handleDateChange = (setSelectedDate) => {
        this.setState({
            setSelectedDate
        })
    }

    handleChange = (e) => {
        this.setState({ check: 
            { 
                ...this.state.check, 
                [e.target.name] : e.target.value 
            } 
        })
    }

    componentDidMount() {
        this.getCustomers();
        this.getRemises();
    }

    getCustomers = () => {
        fetch('http://localhost:4000/api/costumers')
            .then((response) => response.json())
            .then((customers) => this.setState({ customers }))
            .catch((error) => console.error(error));
    }

    getRemises = () => {
        fetch('http://localhost:4000/api/remises')
            .then((response) => response.json())
            .then((remises) => this.setState({ remises }))
            .catch((error) => console.error(error));
    }

    saveCheck = () => {
        fetch('http://localhost:4000/api/checks', {
            method: 'post',
            body: JSON.stringify(this.state.check)
        })
        .then((response) => console.log(response.json()) )
        .then((data) => console.log('Created Gist:', data))
        .catch((error) => console.error(error))
    }

    componentWillReceiveProps(nextProps) {

    }

    reset = () => {
        this.setState({
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
        })
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
    return {
        
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
))(Create);