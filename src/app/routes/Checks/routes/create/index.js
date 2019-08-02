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


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            check: {
                number: '',
                bank: '',
                amount: '',
                customerId: '',
                remise_id: '',
                status: 'WAITING',
                issuedDate: new Date("now"),
                comment: '',
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
        this.setState({
            check: {
                ...this.state.check,
                [e.target.name]: e.target.value
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
            .then((customers) => this.setState({
                customers
            }))
            .catch((error) => console.error(error));
    }

    getRemises = () => {
        fetch('http://localhost:4000/api/remises')
            .then((response) => response.json())
            .then((remises) => this.setState({
                remises
            }))
            .catch((error) => console.error(error));
    }

    saveCheck = () => {
        this.props.createCheck(this.state.check);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.check && nextProps.created) {
            if (!toast.isActive('success')) {
                toast.success('Successfully Created !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'success'
                });
            }
            this.reset();
            setTimeout(() => {
                this.props.history.push('/app/checks/lists');
            }, 100);
        }

        if (nextProps.error) {
            if (!toast.isActive('error')) {
                toast.error('Fix: “something went wrong” while creating account !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'error'
                });
            }
        }

    }

    reset = () => {
        this.setState({
            check: {
                ...this.state.check,
                customer: '',
                numberOfCheque: '',
                number: '',
                bank: '',
                comment: '',
                amount: '',
                remiseNumber: '',
                status: 'WAITING',
                issuedDate: new Date('now'),
                cashingDateDesired: new Date('now')
            },
            selectedDate: null,
            setSelectedDate: null,
        })
    }

    render() {
        return (Template(this));
    }
}


Create.propTypes = {
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        createCheck: (formData) => dispatch(createCheckRequest(formData)),
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
    ))(Create);