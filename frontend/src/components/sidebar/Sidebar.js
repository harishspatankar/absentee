/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout, Menu, Icon, Divider, Dropdown, Avatar, Switch,
} from 'antd';
import LocalizedStrings from 'react-localization';
import NAV_MENU from './Constants';
import './Sidebar.scss';
import routes from '../../utils/routes';
import { setItem, getItem } from '../helpers/localStorage';

const strigs = new LocalizedStrings({
  EN: {
    appName: 'Absentee',
  },
  MR: {
    appName: 'हजेरीपट',
  },
});

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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = ({ key, altKey }) => {
    if(key.toUpperCase() === "E" && altKey) {
      this.setLanguage(true);
    }
    if (key.toUpperCase() === "M" && altKey) {
      this.setLanguage(false);
    }
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

  setLanguage = (checked) => {
    const language = checked ? 'EN' : 'MR';
    this.setState({
      language,
    });
    setItem('language', language);
    this.props.history.push(window.location);
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
        <div className="sidebar-logo">{strigs.appName}</div>
        <div className="avatar"><Avatar shape="square" icon="user"/></div>
        <div className="user-name">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
              Suhas More <Icon type="down" />
            </a>
          </Dropdown>
        </div>
        <div className="language">
          <Switch unCheckedChildren="MR" checkedChildren="EN" checked={this.state.language === 'EN'} onChange={this.setLanguage} />
        </div>
      </div>
    );
  }

  render() {
    const { open, activeMenu, language } = this.state;
    strigs.setLanguage(getItem('language'));
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
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
