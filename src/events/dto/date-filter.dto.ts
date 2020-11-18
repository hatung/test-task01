import { IsOptional, IsDate, Validate } from 'class-validator';
import { IsBeforeConstraint } from '../../common/custom-validators';
import { Type } from 'class-transformer';

export class DateFilterDto {
  @IsOptional()
  @IsDate()
  @Validate(IsBeforeConstraint, ['end_date'])
  @Type(() => Date)
  start_date: Date;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date: Date;
}
