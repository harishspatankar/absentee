import RequestHandler from '../../components/helpers/RequestHandler';

export function getStudents(classRommID) {
  return RequestHandler.get(`/classrooms/${classRommID}/students`);
}

export function getStudent(payload) {
  return RequestHandler.get(`/classrooms/${payload.classRommID}/students/${payload.studentID}`);
}

export function createStudent(payload) {
  return RequestHandler.post(`/classrooms/${payload.classroom_id}/students`, payload);
}

export function updateStudent(payload) {
  return RequestHandler.put(`/classrooms/${payload.classroom_id}/students/${payload.studentID}`, payload);
}
