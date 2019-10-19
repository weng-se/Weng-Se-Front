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
    checkEditRequest
} from '../../../../../actions/Checks';
import { FormattedMessage } from 'react-intl';

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
                id: '',
                number: '',
                bank: '',
                amount: '',
                customerId: '',
                remiseId: '',
                status: '',
                issuedDate: '',
                comment: '',
                cashingDateDesired: '',
            },
            selectedDate: null,
            setSelectedDate: null,
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

    editCheck = () => {
        this.props.updateCheck(this.state.check);
    }

    formatTime(dates) {
        var dt = new Date();
        return dt.toISOString(dates).split('T')[0];
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.check) {
            this.setState({
                check: {
                    ...this.state.check,
                    id: nextProps.check.id,
                    number: nextProps.check.number,
                    bank: nextProps.check.bank,
                    amount: nextProps.check.amount,
                    customerId: nextProps.check.customerId,
                    remise_id: nextProps.check.remise_id,
                    status: nextProps.check.status,
                    issuedDate: this.formatTime(nextProps.check.issuedDate),
                    comment: nextProps.check.comment,
                    cashingDateDesired: this.formatTime(nextProps.check.cashingDateDesired)
                }
            })

        }


        if (nextProps.error && nextProps.check === undefined) {
            if (!toast.isActive('editToastError')) {
                toast.error('Fix: “something went wrong” while updating account !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastError'
                });
            }
        }

        if (nextProps.updated && nextProps.check !== undefined) {
            if (!toast.isActive('editToastSuccess')) {
                toast.success(<FormattedMessage id="label.checkUpdatedSuccessfully"/>, {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastSuccess'
                });
            }

            setTimeout(() => {
                window.location.assign('/app/checks/lists');
            }, 200)
            
        }

    }


    render() {
        return (Template(this));
    }
}


Update.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCheck: (formData) => dispatch(checkEditRequest(formData)),
    }
}

const mapStateToProps = (state) => {
    const {
        check,
        progress,
        updated,
        error
    } = state.checks;
    return {
        check: check,
        progress: progress,
        updated: updated,
        error: error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
))(Update);