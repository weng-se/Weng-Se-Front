import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
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
        <Tooltip title={<FormattedMessage id="label.createNewUser"/>}>
          <NavLink to="create" style={{ textDecoration: "none" }}>
            <Button size="small" variant="contained" className={classes.button} onClick={this.handleClick}>
              <FormattedMessage id="label.createNewUser"/>
            </Button>
          </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "Toolbar" })(Toolbar);