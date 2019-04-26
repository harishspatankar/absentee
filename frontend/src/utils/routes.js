const root = '/';
const dashboard = '/dashboard';
const routes = {
  root,
  dashboard,
  teachers: `${dashboard}/teachers`,

  studentList: `${dashboard}/students`,
  studentAdd: `${dashboard}/student/add`,
  studentEdit: `${dashboard}/student/:studentID`,

  classList: `${dashboard}/class`,
  classAdd: `${dashboard}/class/add`,
  classEdit: `${dashboard}/class/:classID`,
};

export default routes;
