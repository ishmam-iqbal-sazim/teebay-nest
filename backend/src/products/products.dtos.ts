import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  ECategories,
  EProductAvailable,
  ERentDuration,
} from '@/common/enums/products.enums';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  description!: string;

  @IsNumber()
  @Min(0)
  purchasePrice!: 213;

  @IsNumber()
  @Min(0)
  rentPrice!: 123;

  @IsEnum(ERentDuration)
  rentDuration!: ERentDuration;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(0, { each: true })
  categories!: ECategories[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  purchasePrice?: 213;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rentPrice?: 123;

  @IsOptional()
  @IsEnum(ERentDuration)
  rentDuration?: ERentDuration;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(0, { each: true })
  categories?: ECategories[];
}

export class UpdateProductDtoWithAvailable extends UpdateProductDto {
  @IsOptional()
  available?: EProductAvailable;
}
