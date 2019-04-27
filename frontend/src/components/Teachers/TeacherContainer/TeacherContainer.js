import React, { PureComponent } from 'react';
import { Row } from 'antd';
import { connect } from 'react-redux';
import Teacher from '../Teacher';
import TeacherModel from '../../../models/AppModel/TeacherModel';
import './TeacherContainer.scss';
import { getTeachers } from '../../../actions/appActions/TeacherActions';
import JButton from '../../reusable/JButton';
import routes from '../../../utils/routes';
import KeyListener from '../../helpers/KeyListner';

class TeacherContainer extends PureComponent {

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

  handleAddTeacher = () => {
    const { history: { push }} = this.props;
    push(routes.addTeachers);
  }

  getTeachers = () => this.props.teachers
    .map(teacher => <Teacher key={teacher.id} teacher={teacher} {...this.props} />);

  render() {
    return (
      <KeyListener onNew={this.handleAddTeacher}>
        <div className="add-class">
          <JButton
            name="Add New Teacher"
            icon="plus"
            onClick={this.handleAddTeacher}
          />
        </div>
        <Row className="teachers-wrapper">
          {this.getTeachers()}
        </Row>
      </KeyListener>
    );
  }
}


function mapStateToProps() {
  return {
    teachers: TeacherModel.list()[0] ? TeacherModel.list().map(item => item[1].props) : [],
  };
}

export default connect(mapStateToProps)(TeacherContainer);
