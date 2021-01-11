import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ResidenceDTO } from '../../service/dto/residence.dto';
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
    type: ResidenceDTO
  })
  async getAll(@Req() req: Request): Promise<ResidenceDTO[]> {
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
    type: ResidenceDTO
  })
  async getOne(@Param('id') id: string): Promise<ResidenceDTO> {
    return await this.residenceService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create residence' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ResidenceDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() residenceDTO: ResidenceDTO): Promise<ResidenceDTO> {
    const created = await this.residenceService.save(residenceDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Residence', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update residence' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ResidenceDTO
  })
  async put(@Req() req: Request, @Body() residenceDTO: ResidenceDTO): Promise<ResidenceDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Residence', residenceDTO.id);
    return await this.residenceService.update(residenceDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete residence' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Residence', id);
    return await this.residenceService.deleteById(id);
  }
}
