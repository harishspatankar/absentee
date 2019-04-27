import BaseModel from '../BaseModel';

export default class TeacherModel extends BaseModel {
  static resource = 'teacher-model';
  constructor(properties) {
    super(properties);
  }
}
