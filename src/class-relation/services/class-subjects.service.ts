import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { ClassSubject } from '../schemas/class.subject.schema';
import { CreateClassSubjectDto } from '../dto/creates.dto';

@Injectable()
export class ClassSubjectsService {
  constructor(
    @InjectModel(ClassSubject.name)
    private classSubjectsModel: PaginateModel<ClassSubject>,
  ) {}

  async assignSubject(
    createClassSubjectDto: CreateClassSubjectDto,
  ): Promise<ClassSubject> {
    const assignment = new this.classSubjectsModel(createClassSubjectDto);
    return assignment.save();
  }

  async findAllForClass(classId: string) {
    return await this.classSubjectsModel.paginate(
      {
        class: classId,
      },
      { populate: 'subject teacher' },
    );
  }

  async removeAssignment(classId: string, subjectId: string): Promise<void> {
    const result = await this.classSubjectsModel
      .deleteOne({ class: classId, subject: subjectId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Assignment not found');
    }
  }
}
