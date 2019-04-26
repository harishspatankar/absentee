import routes from '../../utils/routes';

const NAV_MENU = [
  {
    name: 'Teachers',
    path: routes.teachers,
    icon: 'file-search',
    permission: ['2', '4', '8'],
  },
  {
    name: 'Menu 2',
    path: routes.dashboard,
    icon: 'fund',
    permission: ['2', '4', '8'],
  },
];

export default NAV_MENU;
