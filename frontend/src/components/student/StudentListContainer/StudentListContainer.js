import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Table,
  Switch,
  DatePicker,
  Divider,
  Row,
  Col,
  Button,
} from 'antd';
import StudentModel from '../../../models/StudentModel/StudentModel';
import routes from '../../../utils/routes';
import './StudentListContainer.scss';
import { getStudents } from '../../../actions/appActions/StudentActions';

class StudentListContainer extends PureComponent {
  state={
    students: [
      {
        key: 1,
        rollNo: 1,
        firstName: 'ABC',
        middleName: 'ABC',
        lastName: 'ABC',
        isPresent: true,
      },
      {
        key: 2,
        rollNo: 2,
        firstName: 'DEF',
        middleName: 'DEF',
        lastName: 'DEF',
        isPresent: true,
      },
      {
        key: 3,
        rollNo: 3,
        firstName: 'GHI',
        middleName: 'GHI',
        lastName: 'GHI',
        isPresent: false,
      },
      {
        key: 4,
        rollNo: 4,
        firstName: 'JKL',
        middleName: 'JKL',
        lastName: 'JKL',
        isPresent: true,
      },
    ],
    selectedDate: moment(),
  }

  componentDidMount() {
    const { match: { params: { classID } } } = this.props;
    this.getStudentsAPI(classID);
  }

  getStudentsAPI = (classRoomID) => {
    getStudents(classRoomID).then((teachers) => {
      StudentModel.saveAll(teachers.map(student => new StudentModel(student)));
    }).catch((getStudentsError) => {
      console.error(getStudentsError);
    });
  }

  getColumns = () => [
    {
      title: 'Roll No.',
      dataIndex: 'roll_number',
      key: 'roll_number',
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middle_name',
      key: 'middle_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Present/Absent',
      dataIndex: 'isPresent',
      key: 'isPresent',
      render: isPresent => <Switch disabled unCheckedChildren="Absent" checkedChildren="Present" checked={isPresent} />,
    },
  ]

  /* getStandardAndDivision() {
    const { students } = this.props;
    if (students && students.length) {
      return students[0].
    }
  } */

  handleDateChange = (value) => {
    this.setState({ selectedDate: value });
  }

  getTableTitle = () => {
    const { selectedDate } = this.state;
    return (
      <Row>
        <Col xs={24} sm={12} md={12}>
          <strong>Class:</strong>
          {/* <span>{this.getStandardAndDivision()}</span> */}
        </Col>
        <Col xs={24} sm={12} md={12}>
          <strong>Division:</strong>
            &nbsp;
          <span>Division</span>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <strong>Attendance For:</strong>
            &nbsp;
          <span>{moment(selectedDate).format('DD-MM-YYYY')}</span>
        </Col>
      </Row>
    );
  }

  handleAddStudentClick = () => {
    const { history: { push } } = this.props;
    const { match: { params: { classID } } } = this.props;
    const classroom_id = classID;
    push(`${routes.dashboard}/class/${classroom_id}/students/add`);
  }

  getAddStudentIcon = () => (
    <Button
      icon="user-add"
      onClick={this.handleAddStudentClick}
    >
      Add Student
    </Button>
  );

  handleRowClick = (record, rowIndex) => ({
    onClick: (event) => {
      event.stopPropagation();
      console.log('Event:', event, '\nRecord:', record, '\nRow Index:', rowIndex);
      const { history: { push } } = this.props;
      const { match: { params: { classID } } } = this.props;
      push(`${routes.student}${record.id || record.rollNo}`);
      push(`${routes.dashboard}/class/${classID}/students/${record.id}`);
    },
  })

  render() {
    const { selectedDate } = this.state;
    const { students } = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <DatePicker format="DD-MM-YYYY" value={selectedDate} onChange={this.handleDateChange} />
          </Col>
          <Col md={12}>
            {this.getAddStudentIcon()}
          </Col>
        </Row>
        <Divider />
        <Table
          bordered
          className="student-list-table"
          columns={this.getColumns()}
          dataSource={students}
          title={this.getTableTitle}
          onRow={this.handleRowClick}
        />
      </div>
    );
  }
}
function mapStateToProps() {
  return {
    students: StudentModel.list()[0] ? StudentModel.list().map(item => item[1].props) : [],
  };
}

StudentListContainer.defaultProps = {
  history: {},
};

StudentListContainer.propTypes = {
  history: PropTypes.shape({ params: PropTypes.string }),
};

export default connect(mapStateToProps)(StudentListContainer);
