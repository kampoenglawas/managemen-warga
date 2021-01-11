import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Civilian from '../../domain/civilian.entity';
import { CivilianService } from '../../service/civilian.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/civilians')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('civilians')
export class CivilianController {
  logger = new Logger('CivilianController');

  constructor(private readonly civilianService: CivilianService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Civilian,
  })
  async getAll(@Req() req: Request): Promise<Civilian[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.civilianService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Civilian,
  })
  async getOne(@Param('id') id: string): Promise<Civilian> {
    return await this.civilianService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create civilian' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Civilian,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() civilian: Civilian): Promise<Civilian> {
    const created = await this.civilianService.save(civilian);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Civilian', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update civilian' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Civilian,
  })
  async put(@Req() req: Request, @Body() civilian: Civilian): Promise<Civilian> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Civilian', civilian.id);
    return await this.civilianService.update(civilian);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete civilian' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Civilian> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Civilian', id);
    const toDelete = await this.civilianService.findById(id);
    return await this.civilianService.delete(toDelete);
  }
}
