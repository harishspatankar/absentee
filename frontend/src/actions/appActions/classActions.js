import RequestHandler from '../../components/helpers/RequestHandler';

export function getClassList() {
  return RequestHandler.get('/classrooms');
}

export function getClassAPI(classID) {
  return RequestHandler.get(`/classrooms/${classID}`);
}

export function getTeachers() {
  return RequestHandler.get('/teachers');
}

export function updateClassAPI(payload) {
  return RequestHandler.post('/classrooms', payload);
}

export function addClassAPI(payload) {
  return RequestHandler.post('/classrooms', payload);
}

export function getStudents(classID) {
  return RequestHandler.get(`/classrooms/${classID}/students`);
}

export function markAttendeance(studentID) {
  return RequestHandler.get(`/classrooms/${classID}/students`);
}
