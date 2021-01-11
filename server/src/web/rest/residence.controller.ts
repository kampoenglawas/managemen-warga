import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Residence from '../../domain/residence.entity';
import { ResidenceService } from '../../service/residence.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/residences')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('residences')
export class ResidenceController {
  logger = new Logger('ResidenceController');

  constructor(private readonly residenceService: ResidenceService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Residence
  })
  async getAll(@Req() req: Request): Promise<Residence[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.residenceService.findAndCount({
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
    type: Residence
  })
  async getOne(@Param('id') id: string): Promise<Residence> {
    return await this.residenceService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create residence' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Residence
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() residence: Residence): Promise<Residence> {
    const created = await this.residenceService.save(residence);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Residence', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update residence' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Residence
  })
  async put(@Req() req: Request, @Body() residence: Residence): Promise<Residence> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Residence', residence.id);
    return await this.residenceService.update(residence);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete residence' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Residence> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Residence', id);
    const toDelete = await this.residenceService.findById(id);
    return await this.residenceService.delete(toDelete);
  }
}
