import React, { Component } from 'react';
import { Skeleton, Row, Col, Switch, Empty } from 'antd';
import { getStudents, markAttendanceAPI } from '../../actions/appActions/classActions';
import JButton from '../reusable/JButton';
import './presenty.scss';
import routes from '../../utils/routes';
import { showSuccessNotification } from '../reusable/Notifications';

const Student = ({ data: { first_name, last_name, middle_name, roll_number, is_present }, handleChange, index, activeIndex}) => (
  <div className="student">
    <div className="roll">{roll_number}</div>
    <div className="name">{`${last_name} ${first_name} ${middle_name}`}</div>
    <div className="switch">
      <Switch checkedChildren="P" unCheckedChildren="A" checked={is_present} onChange={handleChange} />
    </div>
  </div>
);

class Presenty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeIndex: 0,
      students: [],
    };
  }

  componentDidMount() {
    const { match : { params : { classID }}} = this.props;
    document.addEventListener("keydown", this.handleKeyDown);
    // API
    this.setState({
      loading: true,
    });
    getStudents(classID)
      .then((data) => {
        console.log(data);
        this.setState({
          students: data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  markAttendance  = (studeID, status) => {
    markAttendanceAPI(studeID, status)
    .then((data) => {
      showSuccessNotification('Updated successfully.');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // handleKeyDown = (event) => {
  //   const { activeIndex, students } = this.state;
  //   console.log(event, activeIndex);

  //   if (event.key === "Escape") {
  //     this.setState({
  //       activeIndex: -1
  //     });
  //   }
  //   if (event.key === "C" && event.altKey) {
  //     this.handleCancel();
  //   }
  //   if (event.key === "ArrowDown") {
  //     if (activeIndex < this.state.students.length-1) {
  //       this.setState({
  //         activeIndex: activeIndex+1,
  //       });
  //     }
  //   }
  //   if (event.key === "ArrowUp") {
  //     if (activeIndex > 0) {
  //       this.setState({
  //         activeIndex: activeIndex-1,
  //       });
  //     }
  //   }
  //   if (event.key.toUpperCase() === "P" && activeIndex >=0) {
  //     students[activeIndex].isPresent = true;
  //     this.setState({
  //       students,
  //     });
  //   }
  //   if (event.key.toUpperCase() === "A" && activeIndex >=0 ) {
  //     students[activeIndex].isPresent = false;
  //     this.setState({
  //       students,
  //     });
  //   }
  // }

  getStudents = () => {
    if ( !this.state.students || this.state.students.length ===0) {
      return <Empty description="No students in this class" />
    }
    return this.state.students.map((student, index) => {
      return (
        <Student
          data={student}
          handleChange={checked => this.handleChange(index, checked, student.id)}
          index={index}
          // activeIndex={this.state.activeIndex}
          key={student+index}
        />
      );
    });
  }

  handleChange = (index, value, studeID) => {
    const { students } = this.state;
    const { match : { params }} = this.props;
    console.log(studeID);
    students[index].is_present = value;
    this.setState({
      students,
    });
    this.markAttendance(studeID, value);
  }

  getDetails = () => {
    return (
      <>
      </>
    );
  }

  handleCancel = () => {
    this.props.history.push(routes.classList);
  }

  handleMarkDone = () => {
    
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="presenty-container">
        {loading && <Skeleton active paragraph="3" />}
        {!loading && (
          <>
            {this.getDetails()}
            <div className="student-list">
              <Row>
                <Col lg={{ span: 15, offset: 5 }} sm={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1}}>
                  {this.getStudents()}
                </Col>
              </Row>
            </div>
          </>
        )}
        <div className="aa">
          <JButton
            name="Cancel"
            onClick={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}

export default Presenty;
