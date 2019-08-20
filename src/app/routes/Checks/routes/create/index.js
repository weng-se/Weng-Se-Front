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
                issuedDate: new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2),
                comment: '',
                cashingDateDesired: ''
            },
            bool: false,
            selectedDate: null,
            setSelectedDate: null,
            searchText: '',
            customers: [],
            remises: [],
            banks: []
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
        this.getBanks();
    }

    getCustomers = () => {
        fetch('http://localhost:4000/api/customers')
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


    getBanks = () => {
        fetch('http://localhost:4000/api/banks')
            .then((response) => response.json())
            .then((banks) => this.setState({
                banks
            }))
            .catch((error) => console.error(error));
    }

    saveCheck = () => {
        this.props.createCheck(this.state.check, this.state.bool);
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

    setBool = (val) => {
        this.setState({
            bool: val
        })
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
                customerId: '',
                status: 'WAITING',
                issuedDate: new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2),
                cashingDateDesired: ''
            },
            selectedDate: null,
            setSelectedDate: null,
        })
    }

    discard = () => {
        this.reset();
        setTimeout(() => {
            this.props.history.push('/app/checks/lists');
        }, 100);
    }

    render() {
        return (Template(this));
    }


}

Create.propTypes = {
    error: PropTypes.bool,
    created: PropTypes.bool,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        createCheck: (formData, bool) => dispatch(createCheckRequest(formData, bool)),
    }
}

const mapStateToProps = (state) => {
    const {
        check,
        created,
        progress,
        error,
        other
    } = state.checks;
    return {
        check: check,
        created: created,
        progress: progress,
        error: error,
        other: other
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(Create);