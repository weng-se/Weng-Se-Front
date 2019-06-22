import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Card,
    Table
} from 'reactstrap';
import {
    REQUEST_FETCH_USERS
} from '../../../../../actions/Users';
import './style.css';


class ListUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            })
        }
    }

    getUser(e) {
        let uid = e.target.parentNode.getAttribute('data-uid');
    }

    render() {
        return (
            <React.Fragment>
                <div className="app-wrapper">
                    <div className="row animated slideInUpTiny animation-duration-3">
                    <Card  style={{ width: '100%' }}>
                        <Table striped hover size="sm">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo URL</th>
                                <th>display Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Disabled</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.data && this.state.data.map((user, i) => {
                                return(
                                    <tr key={user.id} data-uid={user.id}  onClick={this.getUser}>
                                        <td scope="row">{i + 1}</td>
                                        <td><img src={user.photoURL && user.photoURL !== '' ? user.photoURL : 'https://via.placeholder.com/45x45' } alt="" /></td>
                                        <td>{user.displayName && user.displayName !== '' ? user.displayName  : '--'}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber && user.phoneNumber !== '' ? user.phoneNumber :  '--' }</td>
                                        <td><input type="checkbox" id="disable" {...user.disabled === true ? 'checked' : ''} /></td>
                                    </tr>
                                )
                            }) }
                            </tbody>
                        </Table>
                    </Card>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}


ListUser.propTypes = {

};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch({
            type: REQUEST_FETCH_USERS
        }),
        getUser: () => dispatch({
            type: 'REQUEST_GET_USER'
        })
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.users.users,
        progress: state.users.progress
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUser);