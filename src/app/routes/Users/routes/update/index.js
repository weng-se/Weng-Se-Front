import React from 'react';
import {
    connect
} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { userEditRequest } from '../../../../../actions/Users';
import Template from './template';
import './style.css';


class Update extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            phoneNumber: '',
            username: '',
            role: '',
            note: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.data) {
            this.setState({
                id: nextProps.data.id,
                email: nextProps.data.email,
                phoneNumber: nextProps.data.phoneNumber,
                username: nextProps.data.username,
                role: nextProps.data.role,
                note: nextProps.data.note,
            })
        }

        if (nextProps.error) {
            if (!toast.isActive('toastError')) {
                toast.error('Fix: “something went wrong” while updating account !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'toastError'
                });
            }
        }
        
        if(nextProps.data.count) {
            if (!toast.isActive('toastSuccess')) {
                toast.success('User has been successfully updated !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'toastSuccess'
                });
            }
            setTimeout(() => { 
                window.location.reload();
            }, 2000);
        }
        
    }

    updateUser = () => {
        this.props.editUser(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        return (Template(this));
    }

}

Update.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (formData) => dispatch(userEditRequest(formData))
    }
}

const mapStateToProps = (state) => {
    const { 
        user ,
        error,
        count,
        progress
    } = state.users
    return {
        data: user,
        error: error,
        count: count,
        progress: progress
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Update);