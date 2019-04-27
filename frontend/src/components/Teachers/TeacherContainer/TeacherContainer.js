import React, { PureComponent } from 'react';
import { Row } from 'antd';
import { withRouter } from 'react-router-dom';
// import connect from 'react-redux';
import Teacher from '../Teacher';
import './TeacherContainer.scss';

class TeacherContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      teachers: [
        {
          id: '1',
          name: 'ABCD EFGH',
          classes: ['10 A', '8 B', '6 C'],
          email: 'abcd@gmail.com',
        },
        {
          id: '2',
          name: 'IJKL MNOP',
          classes: ['10 A', '8 B', '6 C'],
          email: 'abcd@gmail.com',
        },
        {
          id: '3',
          name: 'QRST UVWX',
          classes: ['10 A', '8 B', '6 C'],
          email: 'abcd@gmail.com',
        },
        {
          id: '4',
          name: 'Z123 ABCD',
          classes: ['10 A', '8 B', '6 C'],
          email: 'abcd@gmail.com',
        },
      ],
    };
  }

  getTeachers = () => this.state.teachers
    .map(teacher => <Teacher key={teacher.id} teacher={teacher} {...this.props} />);

  render() {
    return (
      <Row className="teachers-wrapper">
        {this.getTeachers()}
      </Row>
    );
  }
}

export default withRouter(TeacherContainer);
