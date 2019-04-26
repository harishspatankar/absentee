import routes from '../../utils/routes';

const NAV_MENU = [
    {
        name: 'Teachers',
        path: routes.teachers,
        icon: 'file-search',
        permission: ['2', '4', '8'],
    },
    {
        name: 'Classes',
        path: routes.classList,
        icon: 'fund',
        permission: ['2', '4', '8'],
    },
];

export default NAV_MENU;
