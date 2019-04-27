/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactPhoneInput from 'react-phone-input-2';

function changeState({ number, country }, setState, setNumberInProps = () => {}) {
  
  setNumberInProps({ number, country });
  setState(number);
}
const MobileNumber = ({label, labelClass, required, getNumber }) => {
  const [value, setState] = useState();
  return (
    <div className="labeled-input">
      <span
        className={labelClass} 
      >
        {label}
        {required && <span style={{ color: 'red' }}> &nbsp;*</span>}
      </span>
      <ReactPhoneInput
        defaultCountry="in"
        enableSearchField
        value={value}
        onChange={(number, country) => changeState({ number, country }, setState, getNumber)}
      />
    </div>
  );
};

export default MobileNumber;
