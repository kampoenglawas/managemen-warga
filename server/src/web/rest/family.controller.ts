import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { FamilyDTO } from '../../service/dto/family.dto';
import { FamilyService } from '../../service/family.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/families')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('families')
export class FamilyController {
  logger = new Logger('FamilyController');

  constructor(private readonly familyService: FamilyService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FamilyDTO
  })
  async getAll(@Req() req: Request): Promise<FamilyDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.familyService.findAndCount({
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
    type: FamilyDTO
  })
  async getOne(@Param('id') id: string): Promise<FamilyDTO> {
    return await this.familyService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create family' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FamilyDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() familyDTO: FamilyDTO): Promise<FamilyDTO> {
    const created = await this.familyService.save(familyDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Family', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update family' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FamilyDTO
  })
  async put(@Req() req: Request, @Body() familyDTO: FamilyDTO): Promise<FamilyDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Family', familyDTO.id);
    return await this.familyService.update(familyDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete family' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Family', id);
    return await this.familyService.deleteById(id);
  }
}
