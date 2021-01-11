import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { RTDTO } from '../../service/dto/rt.dto';
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
    type: RTDTO
  })
  async getAll(@Req() req: Request): Promise<RTDTO[]> {
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
    type: RTDTO
  })
  async getOne(@Param('id') id: string): Promise<RTDTO> {
    return await this.rTService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create rT' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: RTDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() rTDTO: RTDTO): Promise<RTDTO> {
    const created = await this.rTService.save(rTDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RT', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update rT' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: RTDTO
  })
  async put(@Req() req: Request, @Body() rTDTO: RTDTO): Promise<RTDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'RT', rTDTO.id);
    return await this.rTService.update(rTDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete rT' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'RT', id);
    return await this.rTService.deleteById(id);
  }
}
