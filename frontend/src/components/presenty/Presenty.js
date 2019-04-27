import React, { Component } from 'react';
import { Skeleton, Row, Col, Switch } from 'antd';
import './presenty.scss';

const Student = ({ data: { name, roll, isPresent }, handleChange, index, activeIndex}) => (
  <div className={`student ${activeIndex === index ? 'active' : ''}` } >
    <div className="roll">{roll}</div>
    <div className="name">{name}</div>
    <div className="switch">
      <Switch checkedChildren="P" unCheckedChildren="A" checked={isPresent} onChange={handleChange} />
    </div>
  </div>
);

class Presenty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeIndex: 0,
      students: [
        { name: 'More Suhas Rajendra', roll: 11, isPresent: true },
        { name: 'More Supriya Suhas', roll: 12, isPresent: true },
        { name: 'More Prajakat Rajendra', roll: 13, isPresent: true },
        { name: 'More Suhas Rajendra', roll: 14, isPresent: true },
        { name: 'More Supriya Suhas', roll: 15, isPresent: true },
        { name: 'More Prajakat Rajendra', roll: 16, isPresent: true },
      ],
    };
  }

  componentDidMount() {
    const { match : { params : { division, standard }}} = this.props;
    document.addEventListener("keydown", this.handleKeyDown)
    // API
  }

  handleKeyDown = (event) => {
    const { activeIndex, students } = this.state;
    if (event.key === "ArrowDown") {
      if (activeIndex < this.state.students.length-1) {
        this.setState({
          activeIndex: activeIndex+1,
        });
      }
    }
    if (event.key === "ArrowUp") {
      if (activeIndex > 0) {
        this.setState({
          activeIndex: activeIndex-1,
        });
      }
    }
    if (event.key === "ArrowRight") {
      students[activeIndex].isPresent = true;
      this.setState({
        students,
      });
    }
    if (event.key === "ArrowLeft") {
      students[activeIndex].isPresent = false;
      this.setState({
        students,
      });
    }
  }

  getStudents = () => {
    return this.state.students.map((student, index) => {
      return (
        <Student
          data={student}
          handleChange={checked => this.handleChange(index, checked)}
          index={index}
          activeIndex={this.state.activeIndex}
        />
      );
    });
  }

  handleChange = (index, v) => {
    const { students } = this.state;
    students[index].isPresent = v;
    this.setState({
      students,
    });
  }

  getDetails = () => {
    return (
      <>
      </>
    );
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
      </div>
    );
  }
}

export default Presenty;
