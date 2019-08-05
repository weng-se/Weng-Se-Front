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
            <Button size="small" variant="contained" className={classes.button}>
              <NavLink to="create" style={{ color: '#666' }}>
                <FormattedMessage id="pages.createCheck"/>
              </NavLink>
            </Button>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(
  styles, 
  { name: "Toolbar" }
  )(Toolbar);