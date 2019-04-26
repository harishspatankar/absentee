import React from 'react';
import PropTypes from 'prop-types';
import {
  Col, Collapse, Icon, Tooltip,
} from 'antd';
import Avatar from '../reusable/Avatar';
import './Teacher.scss';

const { Panel } = Collapse;

const getPanelHeader = teacher => (
  <div>
    <Avatar
      size="large"
      icon="user"
      letter={teacher.name.charAt(0).toUpperCase()}
    />
    <span style={{ marginLeft: '10px' }}>{teacher.name}</span>
  </div>
);

const getEditIcon = (teacherId, history) => (
  <Tooltip title="Edit Teacher">
    <Icon type="edit" onClick={() => history.push(`/teachers/${teacherId}}`)} />
  </Tooltip>
);

const Teachers = (props) => {
  const { teacher } = props;
  return (
    <Col className="teacher-card" xs={24} sm={18} md={14} lg={6} xl={6} xxl={4}>
      <Collapse>
        <Panel
          key={teacher.id}
          header={getPanelHeader(teacher)}
          extra={getEditIcon(teacher.id, props.history)}
        >
          <div>
            <strong>Gender:</strong>
            <span>{teacher.gender}</span>
            <br />
            <strong>Email:</strong>
            <span>{teacher.email}</span>
            <br />
            <strong>Assigned Classes:</strong>
            <span>{teacher.assignedClasses}</span>
            <br />
          </div>
        </Panel>
      </Collapse>
    </Col>
  );
};

Teachers.defaultProps = {
  teacher: { name: '' },
};

Teachers.propTypes = {
  teacher: PropTypes.shape({ name: PropTypes.string }),
};
export default Teachers;
