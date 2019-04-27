import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
import { createStudent, updateStudent, getStudent } from '../../actions/appActions/StudentActions';

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
    const { match: { params: { classID } } } = this.props;
    const { form: { validateFields } } = this.props;
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const student = {
          ...values,
          gender: values.gender ? 'Male' : 'Female',
          classroom_id: classID,
        };
        this.addStudentAPI(student);
      }
    });
  }

  componentDidMount() {
    const { studentID, classID } = this.props.match.params;
    console.log('Class:', classID);
    if (this.isUpdating()) {
      getStudent({ studentID, classRommID: classID }).then((student) => {
        this.setInitialValues(student);
      }).catch();
    }
  }

  setInitialValues = (student) => {
    const { form } = this.props;
    form.setFieldsValue({
      first_name: student.first_name,
      middle_name: student.middle_name,
      last_name: student.last_name,
      gender: student.gender === 'Male',
      date_of_birth: moment(student.date_of_birth),
      blood_group: student.blood_group,
      roll_number: student.roll_number,
      /* address: [{
        address_type: student.address.address_type,
        line_1: student.address.line_1,
        line_2: student.address.line_2,
        city: student.address.city,
        state: student.address.state,
        pincode: student.address.pincode,
        landmark: student.address.landmark,
      }], */
    });
  }

  addStudentAPI(student) {
    const { studentID, classID } = this.props.match.params;
    createStudent(student).then((response) => {
      console.log('Response:', response);
      const { history: { push } } = this.props;
      push(`${routes.dashboard}/class/${classID}/students/${studentID}`);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  updateStudentAPI(student) {
    const { studentID, classID } = this.props.match.params;
    const payload = {
      ...student,
      studentID,
      classroom_id: classID,
    };
    updateStudent(payload).then((response) => {
      console.log('Response:', response);
      const { history: { push } } = this.props;
      push(`${routes.dashboard}/class/${classID}/students/${studentID}`);
    }).catch((error) => {
      console.error('Error:', error);
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

  isUpdating = () => {
    return this.props.match.params.studentID;
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className="form-wrapper">
        <h2>{this.isUpdating ? 'Edit' : 'Add' }Student</h2>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row gutter={6}>
            <Col className="form-component" xs={24} sm={12} md={8} lg={8}>
              <Form.Item label="First Name">
                {
                  getFieldDecorator('first_name', {
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
                  getFieldDecorator('middle_name', {
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
                  getFieldDecorator('last_name', {
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
                  getFieldDecorator('roll_number', {
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
                  getFieldDecorator('date_of_birth', {
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
                  getFieldDecorator('blood_group', {
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
            <Col xs={24} sm={12} md={4} lg={4}>
              <Form.Item label="Address Type">
                {
                  getFieldDecorator('address_attributes[0].address_type', {
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
                  getFieldDecorator('address_attributes[0].line_1', {
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
                  getFieldDecorator('address_attributes[0].line_2', {
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
                  getFieldDecorator('address_attributes[0].city', {
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
                  getFieldDecorator('address_attributes[0].state', {
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
                  getFieldDecorator('address_attributes[0].pincode', {
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
                  getFieldDecorator('address_attributes[0].landmark', {
                    rules: [],
                  })(
                    <Input />,
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row className="form-buttons-wrapper">
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
