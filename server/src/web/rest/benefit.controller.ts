import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Benefit from '../../domain/benefit.entity';
import { BenefitService } from '../../service/benefit.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/benefits')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('benefits')
export class BenefitController {
  logger = new Logger('BenefitController');

  constructor(private readonly benefitService: BenefitService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Benefit,
  })
  async getAll(@Req() req: Request): Promise<Benefit[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.benefitService.findAndCount({
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
    type: Benefit,
  })
  async getOne(@Param('id') id: string): Promise<Benefit> {
    return await this.benefitService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create benefit' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Benefit,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() benefit: Benefit): Promise<Benefit> {
    const created = await this.benefitService.save(benefit);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update benefit' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Benefit,
  })
  async put(@Req() req: Request, @Body() benefit: Benefit): Promise<Benefit> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', benefit.id);
    return await this.benefitService.update(benefit);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete benefit' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Benefit> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Benefit', id);
    const toDelete = await this.benefitService.findById(id);
    return await this.benefitService.delete(toDelete);
  }
}
