/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { getItem } from '../helpers/localStorage';
import LocalizedStrings from 'react-localization';
import { strings } from './constants.js';
const Strings = new LocalizedStrings(strings);

class ClassCard extends React.Component {
  render() {
    Strings.setLanguage(getItem('language'));
    const { data : {
      standard,
      divison,
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
            <div>{divison}</div>
          </div>
          <div className="details">
            <div className="data">
              <span className="label">{Strings.total}</span>
              <span className="data">{total_students_count}</span>
            </div>
            <div className="data">
              <span className="label">{Strings.present}</span>
              <span className="data">{total_present_count}</span>
            </div>
            <div className="data">
              <span className="label">{Strings.failed}</span>
              <span className="data">{failed_sms_count}</span>
            </div>
          </div>
        </div>
        <div className="c-action">
          <div className="present" onClick={this.props.handlePresenty} role="button">
            {Strings.presenty}
          </div>
          <div className="view" onClick={this.props.handleViewClick} role="button">
            {Strings.editDetails}
          </div>
          <div className="view" onClick={this.props.handleViewStudentList} role="button">
            {Strings.viewStudent}
          </div>
        </div>
      </div>
    );
  }
}

export default ClassCard;
