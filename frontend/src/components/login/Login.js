/* eslint-disable camelcase */
/* eslint-disable key-spacing */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form,
} from 'antd';
import 'react-phone-input-2/dist/style.css'

import './Login.scss';
import JInput from '../reusable/Input';
import { loginAPI } from '../../actions/appActions/LoginAction';
import MobileNumber from '../reusable/PhoneInput';
import Button from '../reusable/JButton';
import { showFailureNotification, showWarningNotification } from '../reusable/Notifications';
import { getMobileNumber } from '../../utils/commonFunctions';
import routes from '../../utils/routes';
import { setItem, clearStorage } from '../helpers/localStorage';

const initialState = {
  loadingLogin: false,
  loginError: '',
  number: '',
  dialCode: '',
  password: '',
};

class WrappedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  login = (payload) => {
    this.setState({ loadingLogin: true });
    loginAPI(payload)
      .then((data) => {
        this.setState({ loadingLogin: false });
        const { user: { api_key, auth_token, mobile_number, email, name, resource_type, resource_id, roles, school } } = data;
        clearStorage();
        setItem('api_key', api_key);
        setItem('auth_token', auth_token);
        setItem('mobile_number', mobile_number);
        setItem('email', email);
        setItem('name', name);
        setItem('resource_type', resource_type);

        setItem('roles', roles);
        setItem('school_id', school.id);
        setItem('school_name', school.name);
        setItem('resource_id', resource_id)
        
        setItem('language', 'EN');
        this.props.history.push(routes.dashboard);
      })
      .catch((error) => {
        this.setState({ loadingLogin: false });
        showFailureNotification('Something went wromg while signing in.');
        console.log(error);
      });
  }

  handleLoginSubmit = () => {
    const { dialCode, country, number, password } = this.state;
    console.log(dialCode, country, number, password );
    if (!dialCode || !number || !password) {
      showWarningNotification("Invalid form submmision.");
      return 0;
    }
    const payload = {
      user: {
        mobile_number: number,
        password,
      },
    };
    this.login(payload);
  }

  handlePasswordChange = ({ target: { value }}) => {
    this.setState({
      password: value,
    });
  }

  setPhoneNumber = ({ number, country: { dialCode } }) => {
    this.setState({
      dialCode: `+${dialCode}`,
      number: getMobileNumber(number, dialCode),
      loginError: '',
    });
  }

  getLoginForm = () => (
    <>
      <MobileNumber
        label="Mobile Number"
        getNumber={this.setPhoneNumber}
      />
      <JInput
        type="password"
        label="Password"
        value={this.state.password}
        onChange={this.handlePasswordChange}
      />
      {this.state.loginError && <span className="error">{this.state.loginError}</span>}
      <Button
        type="primary"
        size="small"
        loading={this.state.loadingLogin}
        onClick={this.handleLoginSubmit}
        name="Login"
        style={{
          marginTop: '8%',
          height: 30,
          width: '100%',
        }}
      />
    </>
  );

  render() {
    const { verifyOTP } = this.state;
    return (
      <div className="login-container">
        {!verifyOTP && this.getLoginForm()}
      </div>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(WrappedLogin);
export default withRouter(Login);
