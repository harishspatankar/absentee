import React from 'react';
import { Empty } from 'antd';
import ClassModel from '../../models/AppModel/ClassModel';
import './class.scss';

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClassLoading: false,
    };
  }

  componentDidMount() {
    // API call
  }

  getClassList = () => {
    const { classes } = this.props;
    if (!classes || classes.length) {
      return (
        <Empty description="No classes found"/>
      );
    }
  }

  render() {
    return (
      <div className="class-list-container">
        {this.getClassList()}
      </div>
    );
  }
}
export default ClassList;