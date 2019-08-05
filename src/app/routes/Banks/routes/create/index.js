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
    createBankRequest
} from '../../../../../actions/Banks';

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
            bank: 
            {
              status: "",
              title: "",
              name: "",
              contact: "",
              createdBy: "",
              editedBy: "",
              comment: ""
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            bank: {
                ...this.state.bank,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = () => {
        this.props.createBank(this.state.bank);
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.bank && nextProps.created) {
            if (!toast.isActive('success')) {
                toast.success('Successfully Created !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'success'
                });
            }
            setTimeout(() => {
                this.formReset();
                this.props.history.push('/app/banks/lists');
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

    formReset = () => {
        this.setState({
            bank: {
                ...this.state.bank,
                status: "",
                title: "",
                name: "",
                contact: "",
                createdBy: "",
                editedBY: "",
                comment: "",
            }
        })
    }


    backtolist = () => {
        this.formReset();
        this.props.history.push('/app/banks/lists');
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
        createBank: (formData) => dispatch(createBankRequest(formData)),
    }
}

const mapStateToProps = (state) => {
    const {
        bank,
        created,
        progress,
        error
    } = state.banks;
    return {
        bank,
        created,
        progress,
        error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(Create);