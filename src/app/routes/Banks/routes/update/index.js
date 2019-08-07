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
    createBankRequest, 
    getBankRequest
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


class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bank: {
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


    componentDidUpdate() {
        if(this.props.id != null)
            this.props.getBank(this.props.id);
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
        this.props.updateBank(this.state.bank);
    }


    componentWillReceiveProps(nextProps) {

        // if (nextProps.bank && nextProps.updated) {
        //     if (!toast.isActive('success')) {
        //         toast.success('Successfully Updated !', {
        //             delay: 1000,
        //             autoClose: true,
        //             closeButton: true,
        //             toastId: 'success'
        //         });
        //     }
        //     setTimeout(() => {
        //         this.formReset();
        //         //this.props.history.push('/app/banks/lists');
        //     }, 100);
        // }

        // if (nextProps.error) {
        //     if (!toast.isActive('error')) {
        //         toast.error('Fix: “something went wrong” while creating account !', {
        //             delay: 1000,
        //             autoClose: true,
        //             closeButton: true,
        //             toastId: 'error'
        //         });
        //     }
        // }

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

Update.propTypes = {
    error: PropTypes.bool,
    update: PropTypes.bool,
    progress: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    const {
        bank,
        created,
        updated,
        progress,
        error
    } = state.banks;
    return {
        bank,
        created,
        updated,
        progress,
        error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ))(Update);