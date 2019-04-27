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
      id,
      total_students_count,
      total_present_count,
      failed_sms_count
    } } = this.props;

    return (
      <div className="class-card">
        <div className="c-data">
          <div className="std">
            <div>{standard}</div>
          </div>
          <div className="div">
            <div>{division}</div>
          </div>
          <div className="details">
            <div className="data">
              <span className="label">Total</span>
              <span className="data">{total_students_count}</span>
            </div>
            <div className="data">
              <span className="label">Present</span>
              <span className="data">{total_present_count}</span>
            </div>
            <div className="data">
              <span className="label failed">Faild</span>
              <span className="data failed">{failed_sms_count}</span>
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
