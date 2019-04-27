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

  getColumns = () => [
    {
      title: 'Roll No.',
      dataIndex: 'rollNo',
      key: 'rollNo',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Present/Absent',
      dataIndex: 'isPresent',
      key: 'isPresent',
      render: isPresent => <Switch disabled unCheckedChildren="Absent" checkedChildren="Present" checked={isPresent} />,
    },
  ]

  handleDateChange = (value) => {
    this.setState({ selectedDate: value });
  }

  getTableTitle = () => {
    const { selectedDate } = this.state;
    return (
      <Row>
        <Col xs={24} sm={12} md={12}>
          <strong>Class:</strong>
            &nbsp;
          <span>Class Name</span>
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
    push(`${routes.studentAdd}`);
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
      push(`${routes.student}${record.id || record.rollNo}`);
    },
  })

  render() {
    const { students, selectedDate } = this.state;
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
