import React from "react";
import Button from "@material-ui/core/Button";
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
        <Tooltip title={<FormattedMessage id="label.createNewCustomer"/>}>
          <NavLink to="create" style={{ textDecoration: "none" }}>  
            <Button size="small" variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
                <FormattedMessage id="label.createNewCustomer"/>
            </Button>
            </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "Toolbar" })(Toolbar);