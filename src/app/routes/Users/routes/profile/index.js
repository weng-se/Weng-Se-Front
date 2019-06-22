import React from 'react';
import { connect } from 'react-redux';
import Template from './template';
import firebase from 'firebase';
import './style.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            displayName: '',
            photoURL: '',
            phoneNumber: ''
        }
    }

    componentDidMount() {

        var user = firebase.auth().currentUser;
        if (user) {
            user.providerData.forEach(profile => {
                console.log('profile', profile);
                this.setState({
                    email: profile.email,
                    displayName: profile.displayName,
                    photoURL: profile.photoURL,
                    phoneNumber: profile.phoneNumber
                })
            });
        }
    }

    updateProfile = () => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {
        return (Template(this));
    }

}

Profile.propTypes = {

};

const mapDispatchToProps = dispatch => {
    return {

    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);