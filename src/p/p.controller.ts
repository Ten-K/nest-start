import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';

// import * as uuid from 'uuid';

@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}

  @Post()
  create(@Body() createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  /** ParseIntPipe将id字符串类型转化为number */
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.pService.findOne(+id);
  // }
  /** 校验id是否为uuid */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.pService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
