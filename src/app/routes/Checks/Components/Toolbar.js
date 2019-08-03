import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class Toolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={<FormattedMessage id="pages.createCheck"/>}>
          <NavLink to="create">
            <IconButton onClick={this.handleClick}></IconButton>
            <FormattedMessage id="pages.createCheck"/>
          </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(
  defaultToolbarStyles, 
  { name: "Toolbar" }
  )(Toolbar);