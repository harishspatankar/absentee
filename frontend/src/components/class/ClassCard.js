/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import JButton from '../reusable/JButton';
import { Divider } from 'antd';

class ClassCard extends React.Component {
  render() {
    const { data : {
      standard,
      division,
      id
    } } = this.props;

    return (
      <div className="class-card">
        <div className="c-data">
          <div className="std">
            <div>{standard}<sup>th</sup></div>
          </div>
          <div className="div">
            <div>{division}</div>
          </div>
          <div className="details">
            <div className="data">
              <span className="label">Total</span>
              <span className="data">100</span>
            </div>
            <div className="data">
              <span className="label">Attend</span>
              <span className="data">98</span>
            </div>
            <div className="data">
              <span className="label failed">Faild</span>
              <span className="data failed">2</span>
            </div>
          </div>
        </div>
        <div className="c-action">
          <div className="present" onClick={this.props.handlePresenty} role="button">
            Mark Attendance
          </div>
          <div className="view" onClick={this.props.handleViewClick} role="button">
            Edit
          </div>
          <div className="view" onClick={this.props.handleViewClick} role="button">
            View
          </div>
        </div>
      </div>
    );
  }
}

export default ClassCard;
