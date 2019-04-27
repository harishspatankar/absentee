import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Row,
  Col,
  Input,
  Switch,
  DatePicker,
  Select,
  Button,
} from 'antd';
import './StudentForm.scss';
import { DATE_FORMAT } from '../../utils/constant';
import routes from '../../utils/routes';

const Option = Select.Option;
const address = {
  LINE_1: 'line_1',
  LINE_2: 'line_2',
  CITY: 'city',
  STATE: 'state',
  PINCODE: 'pin_code',
  ADDRESS_TYPE: 'address_type',
  LANDMARK: 'landmark',
};

class StudentForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  getRulesForAddress = (addressKey) => {
    switch (addressKey) {
    case address.LINE_1:
    case address.CITY:
    case address.STATE:
    case address.PINCODE:
    case address.ADDRESS_TYPE:
      return [{
        required: true, message: `${addressKey} is required`,
      }];
    default:
      return [];
    }
  }

  handleCancel = () => {
    const { history: { push } } = this.props;
    push(`${routes.dashboard}`);
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className="form-wrapper">
        <h2>Add/Edit Student</h2>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row gutter={6}>
            <Col className="form-component" xs={24} sm={12} md={8} lg={8}>
              <Form.Item label="First Name">
                {
                  getFieldDecorator('firstName', {
                    rules: [{
                      required: true, message: 'First name is required',
                    }],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item label="Middle Name">
                {
                  getFieldDecorator('middleName', {
                    rules: [{
                      required: true, message: 'Middle name is required',
                    }],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item label="Last Name">
                {
                  getFieldDecorator('lastName', {
                    rules: [{
                      required: true, message: 'Last name is required',
                    }],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <Col xs={8} sm={8} md={2} lg={2}>
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
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Roll Number">
                {
                  getFieldDecorator('rollNo', {
                    rules: [{
                      required: true, message: 'Roll Number is required',
                    }],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4}>
              <Form.Item label="Date of Birth">
                {
                  getFieldDecorator('dob', {
                    rules: [{
                      required: true, message: 'Date of birth is required',
                    }],
                  })(
                    <DatePicker format={DATE_FORMAT} />,
                  )
                }
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4}>
              <Form.Item label="Blood Group">
                {
                  getFieldDecorator('bg', {
                    rules: [],
                  })(
                    <Select placeholder="Select blood group">
                      <Option value="A+ve">A+ve</Option>
                      <Option value="A-ve">A-ve</Option>
                      <Option value="B+ve">B+ve</Option>
                      <Option value="B-ve">B-ve</Option>
                      <Option value="AB+ve">AB+ve</Option>
                      <Option value="AB-ve">AB-ve</Option>
                      <Option value="O+ve">O+ve</Option>
                      <Option value="O-ve">O-ve</Option>
                    </Select>,
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={6}>
            <strong style={{ marginLeft: '5px' }}>Address:</strong>
            <br />
            {
              Object.keys(address).map(key => (
                <Col xs={24} sm={12} md={4} lg={4}>
                  <Form.Item label={`${address[key]}`}>
                    {
                      getFieldDecorator(`${address[key]}`, {
                        rules: this.getRulesForAddress(address[key]),
                      })(
                        address[key] === 'address_type'
                          ? (
                            <Select>
                              <Option value="Permanent">Permanent</Option>
                              <Option value="Current">Current</Option>
                            </Select>
                          )
                          : <Input />,
                      )
                    }
                  </Form.Item>
                </Col>
              ))
            }
          </Row>
          <Row className='form-buttons-wrapper'>
            <Col xs={24} sm={12} md={4} lg={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4}>
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
const WrappedAddStudentForm = Form.create({ name: 'addStudent' })(StudentForm);

StudentForm.defaultProps = {
  form: {},
};

StudentForm.propTypes = {
  form: PropTypes.shape({ getFieldDecorator: PropTypes.func }),
};

export default WrappedAddStudentForm;
