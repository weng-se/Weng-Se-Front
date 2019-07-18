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
import { 
    createCheckRequest 
} from '../../../../../actions/Checks';

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


class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check: {
                number: 0,
                bank: 'SG',
                amount: 0,
                customerId: '',
                remise_id: '',
                status: 'WAITING',
                issuedDate: '2019-02-25',
                comment: 'It is a long established fact that a reader',
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

    editCheck = () => {
        this.props.editCheck(this.state.check);
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (Template(this));
    }
}


Update.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        editCheck: (formData) => {}
    }
}

const mapStateToProps = (state) => {
    const {
        check,
        created,
        progress,
        error
    } = state.checks;
    return {
        check: check,
        created: created,
        progress: progress,
        error: error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
))(Update);