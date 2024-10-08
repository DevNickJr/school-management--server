import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { GenderEnum, ITeacher } from 'src/shared/interfaces/schema.interface';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher implements ITeacher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'School' })
  school: string | Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, enum: GenderEnum })
  gender?: GenderEnum;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subject' }] })
  subjects: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
TeacherSchema.plugin(mongoosePaginate);

TeacherSchema.index({ school: 1 });
