import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

const styles = {
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
          <NavLink to="create" style={{ color: '#666', textDecoration: "none" }}>
            <Button size="small" variant="contained" color="primary" className={classes.button}>
              <FormattedMessage id="label.createSupplier"/>
            </Button>
          </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(
  styles, 
  { name: "Toolbar" }
  )(Toolbar);