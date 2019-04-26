import React from 'react';
import { Skeleton, Row, Col, Divider } from 'antd';
import moment from 'moment';
import TimePicker from '../reusable/TimePicker';
import JSelect from '../reusable/Select';
import JInput from '../reusable/Input';
import './class.scss';
import { CLASS } from './constants';
import JButton from '../reusable/JButton';
import routes from '../../utils/routes';
import KeyListener from '../helpers/KeyListner';

class ClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      standard: '5th',
      startTime: moment("7:30", "HH:MM"),
      endTime: moment("12:10", "HH:MM a"),
      teachers: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    if (params.classID) {
      // API CALL
    }
  }

  getHeader = () => {
    const { match: { params } } = this.props;
    if (params.classID) {
      return 'Update';
    }
    return 'Add';
  }

  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  handleCancel = () => {
    const { history: { push }} = this.props;
    push(routes.classList);
  }

  geClassForm = ({
    standard, division, name, startTime, endTime,
    teachers, classTeacher,
  }) => (
    <>
      <Divider />
      <Row>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JInput
            placeholder="Add Division"
            label="Name"
            value={name}
            onChange={({ target: { value } }) => this.handleChange('name', value)}
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JSelect
            label="Standard"
            options={CLASS}
            value={standard}
            style={{ width: '100%' }}
            onChange={value => this.handleChange('standard', value)}
            required
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JInput
            placeholder="Add Division"
            label="Division"
            value={division}
            onChange={({ target: { value } }) => this.handleChange('division', value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JSelect
            label="Class Teacher"
            options={teachers}
            value={classTeacher}
            style={{ width: '100%' }}
            onChange={value => this.handleChange('classTeacher', value)}
            required
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <TimePicker
            use12Hours
            label="Start Time"
            defaultValue={moment()}
            format="hh:mm a"
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <TimePicker
            use12Hours
            label="End Time"
            defaultValue={moment()}
            format="hh:mm a"
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col lg={{ span: 2, offset: 9 }}>
          <JButton
            name={`${this.getHeader()}`}
            onClick={this.handleSubmit}
            type="primary"
          />
        </Col>
        <Col lg={{ span: 2, offset: 1 }}>
          <JButton
            name="Cancel"
            onClick={this.handleCancel}
          />
        </Col>
      </Row>
    </>
  );


  render() {
    const { loading } = this.state;
    return (
      <KeyListener onCancel={this.handleCancel}>
        <Row>
          <Col lg={{ offset: 5, span: 15 }} md={{ offset: 2, span: 20 }} sm={{ span: 22, offset: 2 }}>
            <div className="class-form">
              <div className="form-header">
                {`${this.getHeader()} Class`}
              </div>
              {loading && <Skeleton active paragraph={3} />}
              {!loading && this.geClassForm(this.state)}
            </div>
          </Col>
        </Row>
      </KeyListener>
    );
  }
}

export default ClassForm;
