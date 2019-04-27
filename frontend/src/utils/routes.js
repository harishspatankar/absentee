const root = '/';
const dashboard = '/dashboard';
const routes = {
  root,
  dashboard,
  teachers: `${dashboard}/teachers`,
  addTeachers: `${dashboard}/teachers/add`,
  editTeacher: `${dashboard}/teachers/:id/edit`,

  student: `${dashboard}/student/`,
  studentList: `${dashboard}/class/:classID/students`,
  studentAdd: `${dashboard}/student/add`,
  studentEdit: `${dashboard}/student/:studentID`,

  classList: `${dashboard}/class`,
  classAdd: `${dashboard}/class/add`,
  classEdit: `${dashboard}/class/:classID`,

  presenty: `${dashboard}/attendance/:classID`,

};

export default routes;
