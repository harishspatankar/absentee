import RequestHandler from '../../components/helpers/RequestHandler';

export function loginAPI(payload) {
  console.log(payload)
  return RequestHandler.login('/users/sign_in', payload);
}

export function getClass(classID) {
  return RequestHandler.get('/login');
}
