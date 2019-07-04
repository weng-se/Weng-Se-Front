import React, { Component } from 'react';
import ProfileHeader from '../../../components/profile/ProfileHeader/';
import Biography from '../../../components/profile/Biography/';

class Profile extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render() {
        return(
            <div className="app-wrapper">
                <ProfileHeader/>
                <Biography/>
            </div>
        )
    }


}

export default Profile;


