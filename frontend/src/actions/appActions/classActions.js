import RequestHandler from '../../components/helpers/RequestHandler';

export function getClassList() {
  return RequestHandler.get('/classrooms');
}

export function getClass(classID) {
  return RequestHandler.get('/login');
}
