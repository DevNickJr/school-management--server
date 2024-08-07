import { IsString } from 'class-validator';
import { ISubject } from 'src/shared/interfaces/schema.interface';

export class CreateSubjectDto implements Omit<ISubject, 'school'> {
  @IsString()
  title: string;
}
