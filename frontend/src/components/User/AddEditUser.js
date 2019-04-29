import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Switch, Select, Button, Row, Col,
} from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import AddHeader from './AddHeader';
import TeacherModel from '../../models/AppModel/TeacherModel';
import { getTeacher } from '../../actions/appActions/TeacherActions';
import routes from '../../utils/routes';
import KeyListener from '../helpers/KeyListner';

const { Option } = Select;

class AddEditUserForm extends React.PureComponent {
  state={
    roleOptions: ['Teacher', 'Principal', 'Clerk'],
    currentUser: {},
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id) {
      getTeacher(id).then((user) => {
        this.setState({ currentUser: user });
        this.setInitialValues(user);
      }).catch((userError) => {
        console.error('\nGet User Error:', userError);
      });
    }
  }

  setInitialValues = (teacher) => {
    const { form } = this.props;
    form.setFieldsValue({
      email: teacher.email,
      gender: teacher.gender,
      mobile: teacher.mobile,
      qualification: teacher.qualification,
      name: teacher.name,
      role: teacher.role.title,
      /* address: [{
        address_type: teacher.address.address_type,
        line_1: teacher.address_type.line_1,
        line_2: teacher.address_type.line_2,
        city: teacher.address_type.city,
        state: teacher.address_type.state,
        pincode: teacher.address_type.pincode,
        landmark: teacher.address_type.landmark,
      }], */
    });
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
    const { currentUser } = this.state;
    return (
      <KeyListener onCancel={this.handleCancel}>
        <div className="form-wrapper">
          <AddHeader />
          <Form layout="horizontal" onSubmit={this.handleSubmit} autoComplete="off">
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
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="Address Type">
                  {
                    getFieldDecorator('address[0].address_type', {
                      rules: [{
                        required: true, message: 'Address type is required',
                      }],
                    })(
                      <Select>
                        <Option value="Permanent">Permanent</Option>
                        <Option value="Current">Current</Option>
                      </Select>,
                    )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="Line 1">
                  {
                    getFieldDecorator('address[0].line_1', {
                      rules: [{
                        required: true, message: 'Line 1 address is required',
                      }],
                    })(
                      <Input />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="Line 2">
                  {
                    getFieldDecorator('address[0].line_2', {
                      rules: [],
                    })(
                      <Input />,
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="City">
                  {
                    getFieldDecorator('address[0].city', {
                      rules: [{
                        required: true, message: 'City is required',
                      }],
                    })(
                      <Input />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="State">
                  {
                    getFieldDecorator('address[0].state', {
                      rules: [{
                        required: true, message: 'State is required',
                      }],
                    })(
                      <Input />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="Pin Code">
                  {
                    getFieldDecorator('address[0].pincode', {
                      rules: [{
                        required: true, message: 'Pin code is required',
                      }],
                    })(
                      <Input />,
                    )
                  }
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={4} lg={4}>
                <Form.Item label="Landmark">
                  {
                    getFieldDecorator('address[0].landmark', {
                      rules: [],
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
                      <Switch checked={currentUser.gender} checkedChildren="Male" unCheckedChildren="Female" />,
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
      </KeyListener>
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
