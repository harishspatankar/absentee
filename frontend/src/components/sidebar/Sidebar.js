/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Layout, Menu, Icon, Divider, Dropdown, Avatar,
} from 'antd';
import NAV_MENU from './Constants';
import './Sidebar.scss';
import routes from '../../utils/routes';
import { setItem, getItem } from '../helpers/localStorage';

const { Sider } = Layout;
class Sidebar extends Component {
    constructor(props) {
        super(props);
        const { open } = props;
        this.state = {
            open,
            activeMenu: routes.targetGroupList,
        };
        props.history.push(routes.targetGroupList);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
        });
    }

  handleMenuChange = ({ key }) => {
      if (key.includes('log-out')) {
          setItem('token', '');
          this.props.history.push(routes.root);
          return 0;
      }
      this.setState({
          activeMenu: key,
      });
      this.props.history.push(key);
  }

  getMenu = () => {
      const profile = getItem('profile');
      return NAV_MENU.map(({ path, name, icon, permission }) => {
        if (true) {
        return (
            <Menu.Item key={`${path}`}>
            <Icon type={icon} />
            <span>{name}</span>
            </Menu.Item>
            );
        }
      });
  }

  

  getAppAndUserName = () => {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Update profile</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Setting</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Logout</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="user-profile">
        <div className="sidebar-logo"> Absentee </div>
        <div className="avatar"><Avatar shape="square" icon="user"/></div>
        <div className="user-name">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              Suhas More <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }

  render() {
    const { open, activeMenu } = this.state;
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        {this.getAppAndUserName()}
        <Divider />
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[activeMenu]}
            onClick={this.handleMenuChange}
        >
          {this.getMenu()}
        </Menu>
      </Sider>
      );
  }
}
export default withRouter(Sidebar);
