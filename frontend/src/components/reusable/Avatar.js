import React from 'react';
import { Avatar } from 'antd';
import propTypes from 'prop-types';

const JAvatar = ({ icon, letter, ...props }) => (
  <Avatar icon={icon} {...props}>
    {letter}
  </Avatar>
);
JAvatar.propTypes = {
  icon: propTypes.string,
  letter: propTypes.string,
};
JAvatar.defaultProps = {
  icon: null,
  letter: 'U',
};

export default Avatar;
