import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PovertyCivilianDTO } from '../../service/dto/poverty-civilian.dto';
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
    type: PovertyCivilianDTO
  })
  async getAll(@Req() req: Request): Promise<PovertyCivilianDTO[]> {
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
    type: PovertyCivilianDTO
  })
  async getOne(@Param('id') id: string): Promise<PovertyCivilianDTO> {
    return await this.povertyCivilianService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create povertyCivilian' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PovertyCivilianDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() povertyCivilianDTO: PovertyCivilianDTO): Promise<PovertyCivilianDTO> {
    const created = await this.povertyCivilianService.save(povertyCivilianDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PovertyCivilian', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update povertyCivilian' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PovertyCivilianDTO
  })
  async put(@Req() req: Request, @Body() povertyCivilianDTO: PovertyCivilianDTO): Promise<PovertyCivilianDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PovertyCivilian', povertyCivilianDTO.id);
    return await this.povertyCivilianService.update(povertyCivilianDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete povertyCivilian' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PovertyCivilian', id);
    return await this.povertyCivilianService.deleteById(id);
  }
}
