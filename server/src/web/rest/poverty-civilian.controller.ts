import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PovertyCivilian from '../../domain/poverty-civilian.entity';
import { PovertyCivilianService } from '../../service/poverty-civilian.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/poverty-civilians')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('poverty-civilians')
export class PovertyCivilianController {
  logger = new Logger('PovertyCivilianController');

  constructor(private readonly povertyCivilianService: PovertyCivilianService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PovertyCivilian
  })
  async getAll(@Req() req: Request): Promise<PovertyCivilian[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.povertyCivilianService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PovertyCivilian
  })
  async getOne(@Param('id') id: string): Promise<PovertyCivilian> {
    return await this.povertyCivilianService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create povertyCivilian' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PovertyCivilian
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() povertyCivilian: PovertyCivilian): Promise<PovertyCivilian> {
    const created = await this.povertyCivilianService.save(povertyCivilian);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PovertyCivilian', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update povertyCivilian' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PovertyCivilian
  })
  async put(@Req() req: Request, @Body() povertyCivilian: PovertyCivilian): Promise<PovertyCivilian> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PovertyCivilian', povertyCivilian.id);
    return await this.povertyCivilianService.update(povertyCivilian);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete povertyCivilian' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PovertyCivilian> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PovertyCivilian', id);
    const toDelete = await this.povertyCivilianService.findById(id);
    return await this.povertyCivilianService.delete(toDelete);
  }
}
