import { Request } from 'express';
import { Types } from 'mongoose';

export interface Base {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum EducationalStage {
  Nursery = 'Nursery',
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export enum AccountTypeEnum {
  school = 'School',
  teacher = 'Teacher',
  manager = 'Manager',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface IAuthPayload {
  sub: string | Types.ObjectId;
  role: string;
  email: string;
  school: string;
}

export interface IAuthRequest extends Request {
  user: IAuthPayload;
}

export interface IUser extends Base {
  name: string;
  email: string;
  password: string;
  role?: AccountTypeEnum;
  account?: string | Types.ObjectId | ITeacher | ISchool;
}

export interface ISchool extends Base {
  name: string;
  inceptionDate?: string;
  location?: string;
  owner?: string | Types.ObjectId;
}

export interface IClass extends Base {
  school: string | Types.ObjectId;
  title: string;
  stage: EducationalStage;
  level: number;
}

export interface ITeacher extends Base {
  school: string | Types.ObjectId;
  name: string;
  gender?: GenderEnum;
  email: string;
  password: string;
}

export interface IStudent extends Base {
  school: string | Types.ObjectId;
  name: string;
  age: number;
  gender: GenderEnum;
  class: Types.ObjectId;
  previousClasses?: Types.ObjectId[];
  email?: string;
  password?: string;
}

export interface ISubject extends Base {
  title: string;
  school: string | Types.ObjectId;
}

export interface IClassSubject extends Base {
  subject: string;
  class: string;
  teacher: string;
}
