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
} from 'antd';
import './StudentForm.scss';
import { DATE_FORMAT } from '../../utils/constant';

const Option = Select.Option;

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

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className="form-wrapper">
        <h2>Add Student</h2>
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
          <Row gutter={4}>
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
                      <Option value="A">A+ve</Option>
                      <Option value="A">A-ve</Option>
                      <Option value="B">B+ve</Option>
                      <Option value="B">B-ve</Option>
                      <Option value="AB">AB+ve</Option>
                      <Option value="AB">AB-ve</Option>
                      <Option value="O">O+ve</Option>
                      <Option value="O">O-ve</Option>
                    </Select>,
                  )
                }
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
