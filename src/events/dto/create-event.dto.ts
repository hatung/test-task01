import { IsNotEmpty, IsDate, Length, Validate } from 'class-validator';
import { IsBeforeConstraint } from '../../common/custom-validators';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
  description: string;
  location: string;
  @IsNotEmpty()
  @IsDate()
  @Validate(IsBeforeConstraint, ['end_date'])
  @Type(() => Date)
  start_date: Date;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
