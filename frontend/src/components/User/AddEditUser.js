import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Switch, Select, Button, Row, Col,
} from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import AddHeader from './AddHeader';

const { Option } = Select;

class AddEditUserForm extends React.PureComponent {
  state={
    roleOptions: ['Teacher', 'Principal', 'Clerk'],
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  getRoleOptions = () => {
    const { roleOptions } = this.state;
    return roleOptions.map(option => <Option key={option} value={option}>{option}</Option>);
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className="form-wrapper">
        <Row>
          <Col><AddHeader /></Col>
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Form.Item label="Name">
              {
                getFieldDecorator('name', {
                  rules: [{
                    required: true, message: 'Name is required',
                  }],
                })(
                  <Input />,
                )
              }
            </Form.Item>
            <Form.Item label="Email">
              {
                getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }],
                })(
                  <Input />,
                )
              }
            </Form.Item>
            <Form.Item label="Address">
              {
                getFieldDecorator('address', {
                  rules: [{
                    required: true, message: 'Address is required',
                  }],
                })(
                  <Input />,
                )
              }
            </Form.Item>
            <Form.Item label="Mobile">
              {
                getFieldDecorator('mobile', {
                  rules: [{
                    required: true, message: 'Mobile number is required',
                  }],
                })(
                  <ReactPhoneInput
                    defaultCountry="in"
                    enableSearchField
                  />,
                )
              }
            </Form.Item>
            <Form.Item label="Gender">
              {
                getFieldDecorator('gender', {
                  rules: [{
                    required: true, message: 'Gender is required',
                  }],
                })(
                  <Switch checkedChildren="Male" unCheckedChildren="Female" />,
                )
              }
            </Form.Item>
            <Form.Item label="Qualification">
              {
                getFieldDecorator('qualification', {
                  rules: [],
                })(
                  <Input />,
                )
              }
            </Form.Item>
            <Form.Item label="Role">
              {
                getFieldDecorator('role', {
                  rules: [{
                    required: true, message: 'Role is required',
                  }],
                })(
                  <Select placeholder="Select Role">
                    {this.getRoleOptions()}
                  </Select>,
                )
              }
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}

AddEditUserForm.defaultProps = {
  form: {},
};

AddEditUserForm.propTypes = {
  form: PropTypes.shape({ getFieldDecorator: PropTypes.func }),
};

const WrappedAddForm = Form.create({ name: 'Add' })(AddEditUserForm);
export default WrappedAddForm;
