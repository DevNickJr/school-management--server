import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';
import { IAuthPayload } from 'src/shared/interfaces/schema.interface';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subject: SubjectsService) {}

  @Post()
  create(
    @CurrentUser() user: IAuthPayload,
    @Body() createSubjectDto: CreateSubjectDto,
  ) {
    return this.subject.create({ createSubjectDto, user });
  }

  @Get()
  findAllPaginate(@CurrentUser() user: IAuthPayload) {
    return this.subject.findAllPaginate({ user });
  }

  @Get('all')
  findAll(@CurrentUser() user: IAuthPayload) {
    return this.subject.findAll({ user });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subject.findOne(id);
  }

  @Get('/class/:classId')
  findClassSubjects(@Param('classId') classId: string) {
    return this.subject.findClassSubjects(classId);
  }

  @Get('/teacher/:teacherId')
  findTeacherSubjects(@Param('teacherId') teacherId: string) {
    return this.subject.findTeacherSubjects(teacherId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateSubjectDto) {
    return this.subject.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subject.remove(id);
  }
}
