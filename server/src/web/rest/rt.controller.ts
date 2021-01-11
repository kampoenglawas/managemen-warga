import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import RT from '../../domain/rt.entity';
import { RTService } from '../../service/rt.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/rts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('rts')
export class RTController {
  logger = new Logger('RTController');

  constructor(private readonly rTService: RTService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: RT
  })
  async getAll(@Req() req: Request): Promise<RT[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.rTService.findAndCount({
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
    type: RT
  })
  async getOne(@Param('id') id: string): Promise<RT> {
    return await this.rTService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create rT' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RT
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() rT: RT): Promise<RT> {
    const created = await this.rTService.save(rT);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RT', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update rT' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RT
  })
  async put(@Req() req: Request, @Body() rT: RT): Promise<RT> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RT', rT.id);
    return await this.rTService.update(rT);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete rT' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<RT> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'RT', id);
    const toDelete = await this.rTService.findById(id);
    return await this.rTService.delete(toDelete);
  }
}
