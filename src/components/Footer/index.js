import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {
    return (
      <footer className="app-footer">
        <span className="d-inline-block">Copyright Weng Se &copy; 2019</span>
        <Button
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="label.idea"/></Button>
      </footer>
    );
  }
;

export default Footer;
