import RequestHandler from '../../components/helpers/RequestHandler';

export function getTeachers(payload) {
  return RequestHandler.get('/teachers/', payload);
}

export function getTeacher(id) {
  return RequestHandler.get(`/teachers/${id}`);
}

export function updateTeacherClass(payload) {
  return RequestHandler.put(`/teachers/${ payload.id}`, payload);
}

export function createTeacher(payload) {
  return RequestHandler.post('/users/', payload);
}
