import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {userSignOut} from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      username: localStorage.getItem('user_username')
    };
  }

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={require("assets/images/avatar-setong.jpeg")}
          className="user-avatar "
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}> {this.state.username} <i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>
        <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}
        >
          <MenuItem>
              <NavLink to="/app/profile">
                <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
                <IntlMessages id="popup.profile"/>
              </NavLink>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.setting"/>
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
            this.props.userSignOut()
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>
            <IntlMessages id="popup.logout"/>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale} = settings;
  return {locale}
};
export default connect(mapStateToProps, {userSignOut})(UserInfo);


