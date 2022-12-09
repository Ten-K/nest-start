import { ApiProperty } from '@nestjs/swagger';
export class CreateGuardDto {
  @ApiProperty({ example: '李梅' })
  name: string;
  @ApiProperty({ example: 18 })
  age: number;
}
