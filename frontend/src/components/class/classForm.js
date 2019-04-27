import React from 'react';
import { Skeleton, Row, Col, Divider } from 'antd';
import moment from 'moment';
import LocalizedStrings from 'react-localization';
import { getClassAPI, getTeachers, updateClassAPI, addClassAPI } from '../../actions/appActions/classActions';
import TimePicker from '../reusable/TimePicker';
import JSelect from '../reusable/Select';
import JInput from '../reusable/Input';
import './class.scss';
import { CLASS, strings } from './constants';
import JButton from '../reusable/JButton';
import routes from '../../utils/routes';
import KeyListener from '../helpers/KeyListner';
import { getItem } from '../helpers/localStorage';
import { showFailureNotification, showSuccessNotification } from '../reusable/Notifications';

const Strings = new LocalizedStrings(strings);


class ClassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      submitLoading: false,
      standard: '5th',
      startTime: moment(new Date()),
      endTime: moment(new Date()),
      teachers: [],
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.getTeachersList();
    if (params.classID) {
      this.setState({ loading: true });
      getClassAPI(params.classID)
        .then((data) => {
          this.setState({ loading: false });
          this.setData(data);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log(error);
        });
    }
  }

  getTeachersList = () => {
    getTeachers()
      .then((data) => {
        this.setState({
          teachers: data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  setData =({ title, standard, divison, start_time, end_time }) => {
    this.setState({
      name: title,
      startTime: moment(start_time),
      endTime: moment(end_time),
      standard,
      division: divison,
    });
  }

  updateClass = (payload) => {
    this.setState({
      submitLoading: true,
    });
    updateClassAPI(payload)
      .then((data) => {
        showSuccessNotification('Class Updated successfully.');
        this.setState({
          submitLoading: false,
        });
        this.handleCancel();
      })
      .catch((error) => {
        this.setState({
          submitLoading: false,
        });
        showFailureNotification('Something went wrong.');
      });
  }

  addClass = (payload) => {
    this.setState({
      submitLoading: true,
    });
    addClassAPI(payload)
      .then((data) => {
        showSuccessNotification('Class Added successfully.');
        this.setState({
          submitLoading: false,
        });
        this.handleCancel();
      })
      .catch((error) => {
        this.setState({
          submitLoading: false,
        });
        showFailureNotification('Something went wrong.');
      });
  }

  getHeader = () => {
    const { match: { params } } = this.props;
    if (params.classID) {
      return Strings.update;
    }
    return Strings.add;
  }

  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    });
  }

  validateForm = () => {
    const { name, standard, division } = this.state;
    if (!name || !standard || !division) {
      showFailureNotification('Invalid form submission');
      return false;
    }
    return true;
  }

  handleSubmit = () => {
    const { match: { params }} = this.props;
    const { name, classTeacher, startTime, endTime, standard, division } = this.state;
    if (!this.validateForm()) {
      return false;
    }
    const payload = { 
      title: name,
      standard,
      divison: division,
      start_time: startTime,
      end_time: endTime,
      class_teacher_id: classTeacher,
      school_id: getItem('school_id'),
    };

    if (params.classID) {
      payload.school_id = params.classID;
      this.updateClass(payload);
      return 0;
    }
    this.addClass(payload);
  }

  handleCancel = () => {
    const { history: { push }} = this.props;
    push(routes.classList);
  }

  geClassForm = ({
    standard, division, name, startTime, endTime,
    teachers, classTeacher, submitLoading,
  }) => (
    <>
      <Divider />
      <Row>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JInput
            placeholder={Strings.addDivision}
            label={Strings.name}
            value={name}
            onChange={({ target: { value } }) => this.handleChange('name', value)}
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JSelect
            label={Strings.standard}
            options={CLASS}
            value={standard}
            style={{ width: '100%' }}
            onChange={value => this.handleChange('standard', value)}
            required
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JInput
            placeholder={Strings.addDivision}
            label={Strings.division}
            value={division}
            onChange={({ target: { value } }) => this.handleChange('division', value)}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <JSelect
            label={Strings.classTeacher}
            options={teachers}
            value={classTeacher}
            style={{ width: '100%' }}
            onChange={value => this.handleChange('classTeacher', value)}
            required
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <TimePicker
            label={Strings.startTime}
            value={startTime}
            use12Hours
            format="hh:mm a"
            onChange={(time, timeToString) => this.handleChange('startTime', time)}
          />
        </Col>
        <Col lg={{ span: 7, offset: 1 }} md={{ span: 7, offset: 1 }} sm={{ span: 22 }}>
          <TimePicker
            label={Strings.endTime}
            value={endTime}
            use12Hours
            format="hh:mm a"
            onChange={(time, timeToString) => this.handleChange('endTime', time)}
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col lg={{ span: 2, offset: 9 }}>
          <JButton
            name={`${this.getHeader()}`}
            onClick={this.handleSubmit}
            loading={submitLoading}
            type="primary"
          />
        </Col>
        <Col lg={{ span: 2, offset: 1 }}>
          <JButton
            name={Strings.cancel}
            onClick={this.handleCancel}
          />
        </Col>
      </Row>
    </>
  );


  render() {
    const { loading } = this.state;
    Strings.setLanguage(getItem('language') || 'EN');
    return (
      <KeyListener onCancel={this.handleCancel}>
        <Row>
          <Col lg={{ offset: 5, span: 15 }} md={{ offset: 2, span: 20 }} sm={{ span: 22, offset: 2 }}>
            <div className="class-form">
              <div className="form-header">
                {`${this.getHeader()} ${Strings.class}`}
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
