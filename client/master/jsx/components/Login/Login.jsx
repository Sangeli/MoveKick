import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import util from './../../../util/util';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    onInputChange(e, state) {
        this.setState({ [state]: e.target.value })
    }

    handleSubmitLogin(e) {
        e.preventDefault();
        const { email, password } = this.state;
        const { setAuthorization } = this.props;

        util.signinMover(email, password).then(res => {
            // redirect to dashboard
            setAuthorization(true);
        }).catch( err => {
            console.log('error NEED TO DISPLAY MESSAGE TO USER', err);
        })

        this.setState({ email: '', password: ''})
    }

    render() {
        const { email, password } = this.state;
        const { changeView } = this.props;
        return (
            <div className="block-center mt-xl wd-xl">
                { /* START panel */ }
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <h1>MoveKick</h1>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                        <form role="form" data-parsley-validate="" noValidate className="mb-lg">
                            <div className="form-group has-feedback">
                                <input 
                                    id="exampleInputEmail1" 
                                    type="email" placeholder="Enter email" 
                                    autoComplete="off" 
                                    required="required" 
                                    className="form-control"
                                    value={ email }
                                    onChange={(e) => this.onInputChange(e, 'email')}/>
                                <span className="fa fa-envelope form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input 
                                    id="exampleInputPassword1" 
                                    type="password" 
                                    placeholder="Password" 
                                    required="required" 
                                    className="form-control" 
                                    value={ password }
                                    onChange={ (e) => this.onInputChange(e, 'password') }/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            <div className="clearfix">
                                <div className="checkbox c-checkbox pull-left mt0">
                                    <label>
                                        <input type="checkbox" value="" name="remember" />
                                        <em className="fa fa-check"></em>Remember Me</label>
                                </div>
                                <div className="pull-right"><a href="/recover" className="text-muted">Forgot your password?</a>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-block btn-primary mt-lg"
                                onClick={ (e) => this.handleSubmitLogin(e) }>Login</button>
                        </form>
                        <p className="pt-lg text-center">Need to Signup?</p>
                        <a onClick={ () => changeView('signup') } className="btn btn-block btn-default">Register Now</a>
                    </div>
                </div>
                { /* END panel */ }
            </div>
            );
    }

}

export default Login;
