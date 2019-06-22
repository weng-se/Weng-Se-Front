import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const Template = (component) => {

    return (
        <Fragment>
            <div className="app-wrapper">
                <div className="row animated slideInUpTiny animation-duration-3">

                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 ">
                                <form className="form-horizontal">
                                    <fieldset>
                                        <legend>User profile form requirement</legend>

                                        <div className="form-group">
                                            <label className="col-md-4 control-label" htmlFor="Name (Full name)">Name (Full name)</label>
                                            <div className="col-md-4">
                                                <div className="input-group">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-user">
                                                        </i>
                                                    </div>
                                                    <input id="Name (Full name)" name="Name (Full name)" type="text" placeholder="Name (Full name)" className="form-control input-md" value={component.state.displayName} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label className="col-md-4 control-label" htmlFor="Upload photo">Upload photo</label>
                                            <div className="col-md-4">
                                                <input id="Upload photo" name="Upload photo" className="input-file" type="file" />
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label className="col-md-4 control-label" htmlFor="Email">Email</label>
                                            <div className="col-md-4">
                                                <div className="input-group">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-birthday-cake"></i>
                                                    </div>
                                                    <input id="Email" name="Date Of Birth" type="text" placeholder="Email" className="form-control input-md" />
                                                </div>
                                            </div>
                                        </div>



                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Fragment>
    )

}


export default Template;