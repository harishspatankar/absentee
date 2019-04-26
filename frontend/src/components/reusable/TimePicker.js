import React from 'react';
import { TimePicker } from 'antd';

const JTimePicker = ({ label, required, labelClass, ...rest }) => (
  <div className="labled-input">
    <span
      className={labelClass}
    >
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
    <TimePicker {...rest} style={{ paddingTop: 5 }} />
  </div>
);

export default JTimePicker;
