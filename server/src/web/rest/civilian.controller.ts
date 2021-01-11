import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { CivilianDTO } from '../../service/dto/civilian.dto';
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
    type: CivilianDTO
  })
  async getAll(@Req() req: Request): Promise<CivilianDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.civilianService.findAndCount({
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
    type: CivilianDTO
  })
  async getOne(@Param('id') id: string): Promise<CivilianDTO> {
    return await this.civilianService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create civilian' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CivilianDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() civilianDTO: CivilianDTO): Promise<CivilianDTO> {
    const created = await this.civilianService.save(civilianDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Civilian', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update civilian' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CivilianDTO
  })
  async put(@Req() req: Request, @Body() civilianDTO: CivilianDTO): Promise<CivilianDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Civilian', civilianDTO.id);
    return await this.civilianService.update(civilianDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete civilian' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Civilian', id);
    return await this.civilianService.deleteById(id);
  }
}
