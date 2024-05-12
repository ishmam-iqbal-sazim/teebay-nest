import { IsDate, IsOptional } from 'class-validator';

export class CreateBuyTransactionDto {
  @IsDate()
  @IsOptional()
  rentalStart?: Date;

  @IsDate()
  @IsOptional()
  rentalEnd?: Date;
}
