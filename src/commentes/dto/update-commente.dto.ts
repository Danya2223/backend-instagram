import { PartialType } from '@nestjs/mapped-types';
import { CreateCommenteDto } from './create-commente.dto';

export class UpdateCommenteDto extends PartialType(CreateCommenteDto) {}
