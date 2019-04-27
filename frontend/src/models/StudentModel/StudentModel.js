import BaseModel from '../BaseModel';

export default class StudentModel extends BaseModel {
  static resource = 'student-model';
  constructor(properties) {
    super(properties);
  }
}
