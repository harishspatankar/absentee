import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Switch, Select, Button, Row, Col,
} from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import AddHeader from './AddHeader';
import routes from '../../utils/routes';

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

  handleCancel = () => {
    const { history: { push } } = this.props;
    push(`${routes.dashboard}`);
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className="form-wrapper">
        <AddHeader />
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row gutter={6}>
            <Col xs={24} sm={12} md={8} lg={8}>
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
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
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
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
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
            </Col>
          </Row>
          <Row gutter={6}>
            <Col xs={24} sm={12} md={2} lg={2}>
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
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
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
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item label="Qualification">
                {
                  getFieldDecorator('qualification', {
                    rules: [],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
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
            </Col>
          </Row>
          <Row gutter={6} className='form-buttons-wrapper'>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item>
                <Button onClick={this.handleCancel}>Cancel</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
