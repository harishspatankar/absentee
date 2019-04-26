import RequestHandler from '../../components/helpers/RequestHandler';

export function getClassList() {
  return RequestHandler.get('/login');
}

export function getClass(classID) {
  return RequestHandler.get('/login');
}
