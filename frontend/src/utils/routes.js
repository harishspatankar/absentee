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
  studentAdd: `${dashboard}/class/:classID/students/add`,
  studentEdit: `${dashboard}/class/:classID/students/:studentID`,

  classList: `${dashboard}/class`,
  classAdd: `${dashboard}/class/add`,
  classEdit: `${dashboard}/class/:classID`,

  presenty: `${dashboard}/present/:standard/:division`,

};

export default routes;
