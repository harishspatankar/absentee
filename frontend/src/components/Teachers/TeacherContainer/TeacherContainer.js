import React, { PureComponent } from 'react';
import { Row } from 'antd';
import { connect } from 'react-redux';
import Teacher from '../Teacher';
import TeacherModel from '../../../models/AppModel/TeacherModel';
import './TeacherContainer.scss';
import { getTeachers } from '../../../actions/appActions/TeacherActions';

class TeacherContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getTeachersAPI();
  }

  getTeachersAPI = () => {
    getTeachers().then((teachers) => {
      TeacherModel.saveAll(teachers.map(teacher => new TeacherModel(teacher)));
    }).catch((getTeachersError) => {
      console.error(getTeachersError);
    });
  }

  getTeachers = () => this.props.teachers
    .map(teacher => <Teacher key={teacher.id} teacher={teacher} {...this.props} />);

  render() {
    return (
      <Row className="teachers-wrapper">
        {this.getTeachers()}
      </Row>
    );
  }
}


function mapStateToProps() {
  return {
    teachers: TeacherModel.list()[0] ? TeacherModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(TeacherContainer);
