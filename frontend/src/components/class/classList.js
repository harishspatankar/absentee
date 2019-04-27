import React from 'react';
import { Empty, Row, Col } from 'antd';
import { connect } from 'react-redux';
import LocalizedStrings from 'react-localization';

import { getClassList } from '../../actions/appActions/classActions';
import ClassModel from '../../models/AppModel/ClassModel';
import { strings } from './constants';

import './class.scss';
import ClassCard from './ClassCard';
import routes from '../../utils/routes';
import KeyListener from '../helpers/KeyListner';
import JButton from '../reusable/JButton';

const Strings = new LocalizedStrings({ strings });
class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClassLoading: false,
    };
  }

  componentDidMount() {
    this.getClassListAPI();
  }

  getClassListAPI = () => {
    getClassList()
      .then((classes) => {
        ClassModel.saveAll(classes.map(classss => new ClassModel(classss)));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTakePresentyClick = ({ id }) => {
    this.pushRoute(`${routes.dashboard}/attendance/${id}`);
  }

  pushRoute = (route) => {
    const { history: { push } } = this.props;
    push(route);
  }

  handleViewClassClick = ({ id }) => {
    this.pushRoute(`${routes.classList}/${id}`);
  }

  handleViewStudentList = (id) => {
    const { history: { push } } = this.props;
    push(`${routes.classList}/${id}/students`);
  }

  getClassCard = (payload) => {
    return payload.map(data => (
      <Col lg={{ span: 7, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} key={data.id}>
        <ClassCard
          data={data}
          handleViewClick={() => this.handleViewClassClick(data)}
          handlePresenty={() => this.handleTakePresentyClick(data)}
          handleViewStudentList={() => this.handleViewStudentList(data.id)}
        />
      </Col>
    ));
  }

  getClassList = () => {
    const { classes } = this.props;
    if (!classes || classes.length === 0) {
      return (
        <Empty description={Strings.noClassFound} />
      );
    }
    return (
      <Row>
        {this.getClassCard(classes)}
      </Row>
    );
  }

  handleAddClick = () => {
    const { history: { push }} = this.props;
    push(routes.classAdd);
  }

  render() {
    return (
      <KeyListener onNew={this.handleAddClick}>
        <div className="add-class">
          <JButton
            name="Add New Class"
            icon="plus"
            onClick={this.handleAddClick}
          />
        </div>
        <div className="class-list-container">
          {this.getClassList()}
        </div>
      </KeyListener>
    );
  }
}

function mapStateToProps() {
  return {
    classes: ClassModel.list()[0] ? ClassModel.list().map(item => item[1].props) : []
  };
}

export default connect(mapStateToProps)(ClassList);
