import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { BenefitDTO } from '../../service/dto/benefit.dto';
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
    type: BenefitDTO
  })
  async getAll(@Req() req: Request): Promise<BenefitDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.benefitService.findAndCount({
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
    type: BenefitDTO
  })
  async getOne(@Param('id') id: string): Promise<BenefitDTO> {
    return await this.benefitService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create benefit' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BenefitDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() benefitDTO: BenefitDTO): Promise<BenefitDTO> {
    const created = await this.benefitService.save(benefitDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update benefit' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BenefitDTO
  })
  async put(@Req() req: Request, @Body() benefitDTO: BenefitDTO): Promise<BenefitDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Benefit', benefitDTO.id);
    return await this.benefitService.update(benefitDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete benefit' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Benefit', id);
    return await this.benefitService.deleteById(id);
  }
}
