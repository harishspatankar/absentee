import BaseModel from '../BaseModel';

export default class ClassModel extends BaseModel {
  static resource = 'class-model';
  constructor(properties) {
    super(properties);
  }
}
